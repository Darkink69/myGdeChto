import { observer } from "mobx-react-lite";
import store from "../store/store";
import CardEvent from "./CardEvent";
import { useEffect, useState } from "react";

const AllEvents = observer(() => {
  const toleranceLat = 0.01;
  const toleranceLong = 0.005;
  const underlineTabStyle =
    " underline decoration-4 underline-offset-8 decoration-sky-500";
  const [events, setEvents] = useState<any>(null);
  const [shownEvents, setshownEvents] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState(0);

  const jsonFetch = () => {
    fetch(
      `https://raw.githubusercontent.com/Darkink69/design_work/main/all_events_now_${
        store.cities[store.currentCity]
      }.json`
    )
      .then((response) => response.json())
      .then((data) => setEvents(data.results))
      .catch((error) => console.error(error));
  };

  const sortEvents = () => {
    let removedEvents =
      JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];

    let shownEvents: { objectId: string | Number | null }[] = [];
    events?.map(
      (item: { attributes: any; objectId: string | Number | null }) => {
        if (
          !removedEvents.includes(item.objectId) &&
          new Date().getTime() - 86400000 <
            new Date(item.attributes.date_to).getTime()
        ) {
          shownEvents.push(item);
        }
      }
    );
    setshownEvents(shownEvents);
    setCurrentTab(0);
  };

  const sortFavorites = () => {
    let shownEvents: { objectId: string | Number | null }[] = [];
    events?.map((item: { objectId: string | Number | null }) => {
      if (store.favoriteEvents.includes(item.objectId)) {
        // console.log(item);
        shownEvents.push(item);
      }
    });
    setshownEvents(shownEvents);
    setCurrentTab(2);
  };

  const shuffleEvents = () => {
    setEvents(shownEvents.sort(() => Math.random() - 0.5));
  };

  const sortSoonEvents = () => {
    let soonEvents: { objectId: string | Number | null }[] = [];
    const now = new Date().getDate();
    shownEvents.map((item: any) => {
      const day = new Date(item.attributes.date_to).getDate();
      if (day === now) {
        soonEvents.push(item);
      }
    });

    shownEvents.map((item: any) => {
      const day = new Date(item.attributes.date_to).getDate();
      if (day === now + 1) {
        soonEvents.push(item);
      }
    });

    setshownEvents(soonEvents);
    setCurrentTab(1);
  };

  useEffect(() => {
    jsonFetch();
    store.checkEvents();
    store.setAllEvents(shownEvents?.length);
    document.title = `ЧёКаво. ${store.titleCities[store.currentCity]}`;
  }, [store.currentCity]);

  useEffect(() => {
    sortEvents();
    store.setAllEvents(shownEvents?.length);
  }, [events, store.allEvents, store.removedEvents, store.dataFilter]);

  useEffect(() => {
    console.log(store.dataFilter);
    let dateEvents: { objectId: string | Number | null }[] = [];
    events?.map(
      (item: { attributes: any; objectId: string | Number | null }) => {
        if (store.dataFilter === new Date(item.attributes.date_to).getDate()) {
          dateEvents.push(item);
        }
      }
    );
    setshownEvents(dateEvents);
  }, [store.dataFilter]);

  useEffect(() => {
    console.log(store.eventLat);
    console.log(store.eventLong);
    let coordEvents: { objectId: string | Number | null }[] = [];
    shownEvents?.map(
      (item: { attributes: any; objectId: string | Number | null }) => {
        if (
          Math.abs(store.eventLat - item.attributes.geom_lat) < toleranceLat &&
          Math.abs(store.eventLong - item.attributes.geom_long) < toleranceLong
        ) {
          coordEvents.push(item);
        }
      }
    );
    setshownEvents(coordEvents);
  }, [store.eventLat, store.eventLong]);

  return (
    <>
      <div className="flex items-center pt-32 relative">
        <h1
          className={
            currentTab == 0
              ? underlineTabStyle +
                " pr-2 cursor-pointer text-slate-600 font-bold "
              : " pr-2 cursor-pointer text-slate-600 font-bold"
          }
          onClick={() => sortEvents()}
        >
          Все события
        </h1>
        <span
          className="p-2 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-white bg-slate-400 cursor-pointer"
          onClick={() => sortEvents()}
        >
          {store.allEvents}
        </span>
        <p
          className={
            currentTab == 1
              ? underlineTabStyle +
                " pl-8 pr-8 font-bold text-sky-400 cursor-pointer"
              : " pl-8 pr-8 font-bold text-sky-400 cursor-pointer"
          }
          onClick={() => sortSoonEvents()}
        >
          Скоро!
        </p>

        <p
          className="pr-8 font-bold text-sky-400 cursor-pointer"
          onClick={() => shuffleEvents()}
        >
          Перемешать
        </p>

        <p
          className={
            currentTab == 2
              ? underlineTabStyle +
                " pr-2 font-bold text-slate-600 cursor-pointer"
              : " pr-2 font-bold text-slate-600 cursor-pointer"
          }
          onClick={() => sortFavorites()}
        >
          Избранные
        </p>

        {store.favoriteEvents.length && (
          <span
            className="p-2 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-white bg-sky-400 cursor-pointer"
            onClick={() => sortFavorites()}
          >
            {store.favoriteEvents.length}
          </span>
        )}
        <p className="pl-4 pr-4 font-bold text-slate-600">На карте</p>

        <p className="pr-4 font-bold text-slate-600">Прошедшие</p>
        <button className="bg-teal-600 hover:bg-sky-700 font-bold text-white h-10 w-48 rounded-md absolute right-0">
          Добавить событие
        </button>
      </div>

      <div className="grid items-start sm:grid-cols-3 grid-cols-1 2xl:grid-cols-4 gap-4 pt-8">
        {shownEvents &&
          shownEvents.map((item: { objectId: number }) => {
            return <CardEvent data={item} key={item.objectId} />;
          })}
      </div>
    </>
  );
});

export default AllEvents;
