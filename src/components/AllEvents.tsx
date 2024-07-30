import { observer } from "mobx-react-lite";
import store from "../store/store";
import CardEvent from "./CardEvent";
import { useEffect, useState } from "react";

const AllEvents = observer(() => {
  const [events, setEvents] = useState<any>(null);
  const [shownEvents, setshownEvents] = useState<any>(null);

  const jsonFetch = () => {
    fetch(
      "https://raw.githubusercontent.com/Darkink69/design_work/main/all_events_now.json"
    )
      .then((response) => response.json())
      .then((data) => setEvents(data.results))
      .catch((error) => console.error(error));
  };

  const sortEvents = () => {
    let removedEvents =
      JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];

    let shownEvents: { objectId: string | Number | null }[] = [];
    events?.map((item: { objectId: string | Number | null }) => {
      if (!removedEvents.includes(item.objectId)) {
        // console.log(item);
        shownEvents.push(item);
      }
    });
    setshownEvents(shownEvents);
  };

  const sortFavorites = () => {
    // console.log("ИЗбранные!!");
    // let favoriteEvents =
    //   JSON.parse(localStorage.getItem("favoriteEvents") || "[]") || [];
    // console.log(store.favoriteEvents);

    let shownEvents: { objectId: string | Number | null }[] = [];
    events?.map((item: { objectId: string | Number | null }) => {
      if (store.favoriteEvents.includes(item.objectId)) {
        // console.log(item);
        shownEvents.push(item);
      }
    });
    setshownEvents(shownEvents);
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
  };

  useEffect(() => {
    jsonFetch();
    store.checkEvents();
    store.setAllEvents(shownEvents?.length);
  }, []);

  useEffect(() => {
    sortEvents();
    // store.allEvents = shownEvents?.length;
    store.setAllEvents(shownEvents?.length);
  }, [events, store.allEvents, store.removedEvents, store.dataFilter]);

  return (
    <>
      <div className="flex items-center pt-32 relative">
        <h1
          className="pr-2 font-bold underline text-slate-600 cursor-pointer"
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
          className="pl-8 pr-8 font-bold text-sky-400 cursor-pointer"
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
          className="pr-2 font-bold text-slate-600 cursor-pointer"
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
        <p className="pl-4 pr-4 font-bold text-slate-600 cursor-pointer">
          На карте
        </p>

        <p className="pr-4 font-bold text-slate-600 cursor-pointer">
          Прошедшие
        </p>
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
