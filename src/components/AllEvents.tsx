import { observer } from "mobx-react-lite";
import store from "../store/store";
import CardEvent from "./CardEvent";
import AllMap from "./YMaps";
import { useEffect, useState } from "react";
import { Input } from "antd";

const { Search } = Input;

const AllEvents = observer(() => {
  const toleranceLat = 0.01;
  const toleranceLong = 0.005;
  const distanceToMe = 2500;

  const underlineTabStyle =
    " underline decoration-4 underline-offset-8 decoration-sky-500";
  const [events, setEvents] = useState<any>(null);
  const [shownEvents, setshownEvents] = useState<any>(null);
  const [map, setMap] = useState(true);

  const jsonFetch = () => {
    // fetch(
    //   `https://raw.githubusercontent.com/Darkink69/design_work/main/all_events_now_${
    //     store.cities[store.currentCity]
    //   }.json`
    // )
    fetch(
      `https://gde-chto.ru/elitegis/rest/services/${
        store.cities[store.currentCity]
      }/sights/MapServer/exts/CompositeSoe/Search?f=json&layerIds=201%2C102&definitionQueries=%7B%22102%22%3A%22type!%3D30%22%7D&geometryToDistance=%7B%22type%22%3A%22point%22%2C%22x%22%3A9248980.746105952%2C%22y%22%3A7336891.762952331%2C%22spatialReference%22%3A%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D%7D&orderByDisplayNames=false&returnGeometries=&outCoordinateSystems=%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D&compareType=contains&onlyInCaption=false&singleText=%D0%B0&returnFields=%5B%22*%22%5D&returnLabelPoints=&returnExtents=*&returnScore=true&ignoreCase=true&language=ru`
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
    // store.setAllEvents(shownEvents?.length);
    store.setСurrentTab(0);
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
    store.setСurrentTab(2);
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
    setMap(false);
    store.setСurrentTab(1);
  };

  const sortNextMeEvents = () => {
    let nextToMeEvents: { objectId: string | Number | null }[] = [];
    shownEvents.map((item: any) => {
      if (item.distanceInMeters < distanceToMe) {
        nextToMeEvents.push(item);
      }
    });

    setshownEvents(nextToMeEvents);
    setMap(false);
    store.setСurrentTab(3);
  };

  const onSearch = (value: string, _e: any) => {
    console.log(value);
    // const wordsSearch = store.requestSearch.toLowerCase().split(" ");
    const wordsSearch = value.toLowerCase().split(" ");
    console.log(wordsSearch);
    let searchedEvents: { objectId: string | Number | null }[] = [];
    events?.map((item: any) => {
      if (item.attributes.description !== null) {
        const wordsDes = item.attributes.description.toLowerCase().split(" ");

        const filteredArray = wordsSearch.filter((val) =>
          wordsDes.includes(val)
        );

        if (filteredArray.length !== 0) {
          searchedEvents.push(item);
        }
      }
    });
    // if (value.length === 0) {
    //   console.log(value.length, "!!");
    //   setTrackData(station.jsonData);
    //   setShowTracks(50);
    //   setIsLoaded(true);
    // }
    // const resultSearch = [];
    // const wordsSearch = value.toLowerCase().split(" ");
    // // console.log(wordsSearch);
    // trackData.map((item) => {
    //   const wordsTrack = item.title.toLowerCase().split(" ");
    //   const filteredArray = wordsSearch.filter((val) =>
    //     wordsTrack.includes(val)
    //   );
    //   if (filteredArray.length !== 0) {
    //     console.log(item.title);
    //     resultSearch.push(item);
    //   }
    // });
    // setTrackData(resultSearch);
    // setShowTracks(resultSearch.length);
    setshownEvents(searchedEvents);
    store.setСurrentTab(99);
  };

  const useMap = () => {
    map ? setMap(false) : setMap(true);
  };

  useEffect(() => {
    jsonFetch();
    sortEvents();
    store.checkEvents();
    document.title = `ГдеЧто. ${store.titleCities[store.currentCity]}`;
  }, [store.currentCity]);

  useEffect(() => {
    sortEvents();
    store.setAllEvents(events?.length);
  }, [events, store.allEvents, store.removedEvents, store.dataFilter]);

  useEffect(() => {
    // console.log(store.dataFilter);
    let dateEvents: { objectId: string | Number | null }[] = [];
    events?.map(
      (item: { attributes: any; objectId: string | Number | null }) => {
        if (store.dataFilter === new Date(item.attributes.date_to).getDate()) {
          dateEvents.push(item);
        }
      }
    );
    setshownEvents(dateEvents);
    setMap(false);
  }, [store.dataFilter]);

  useEffect(() => {
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
    setMap(false);
    setMap(true);
    console.log(store.x);
  }, [store.x, store.y]);

  useEffect(() => {
    console.log(store.currentType);
    let typeEvents: { objectId: string | Number | null }[] = [];
    shownEvents?.map(
      (item: { attributes: any; objectId: string | Number | null }) => {
        if (item.attributes.type === store.currentType) {
          typeEvents.push(item);
        }
      }
    );
    setshownEvents(typeEvents);
  }, [store.currentType]);

  return (
    <>
      {map && <AllMap />}

      <div
        className={
          map
            ? "pt-8 flex items-center relative"
            : "pt-32 md:flex md:items-center relative"
        }
      >
        <h1
          className={
            store.currentTab == 0
              ? underlineTabStyle +
                " pr-2 cursor-pointer text-slate-600 font-bold "
              : " pr-2 cursor-pointer text-slate-600 font-bold"
          }
          onClick={() => sortEvents()}
        >
          Все мероприятия
        </h1>
        <span
          className="p-2 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-white bg-slate-400 cursor-pointer"
          onClick={() => sortEvents()}
        >
          {store.allEvents}
        </span>
        <p
          className={
            store.currentTab == 1
              ? underlineTabStyle +
                " pl-8 pr-8 font-bold text-slate-600 cursor-pointer"
              : " pl-8 pr-8 font-bold text-slate-600 cursor-pointer"
          }
          onClick={() => sortSoonEvents()}
        >
          Скоро!
        </p>

        <p
          className={
            store.currentTab == 3
              ? underlineTabStyle +
                " pr-8 font-bold text-slate-600 cursor-pointer"
              : " pr-8 font-bold text-slate-600 cursor-pointer"
          }
          onClick={() => sortNextMeEvents()}
        >
          Рядом со мной
        </p>

        <p
          className="pr-8 font-bold text-slate-600 cursor-pointer"
          onClick={() => shuffleEvents()}
        >
          Перемешать
        </p>

        <p
          className={
            store.currentTab == 2
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

        <Search
          className="pl-8"
          placeholder="Поиск событий"
          onSearch={onSearch}
          style={{ width: 200 }}
          // allowClear={true}
        />

        {/* <p className="pr-4 font-bold text-slate-600">Рекомендации</p>
        <p className="pr-4 font-bold text-slate-600">Прошедшие</p> */}

        {/* <button className="transition ease-in-out delay-100 bg-teal-600 hover:bg-sky-700 font-bold text-white h-10 w-48 rounded-md absolute right-0">
          Добавить событие
        </button> */}
        <p
          className="pl-4 pr-4 font-bold text-sky-400 cursor-pointer absolute right-0"
          onClick={() => useMap()}
        >
          {map ? "Скрыть карту" : "Показать карту"}
        </p>
      </div>

      <div className="grid items-start sm:grid-cols-3 grid-cols-1 2xl:grid-cols-4 gap-4 pt-8">
        {shownEvents &&
          shownEvents.map((item: { objectId: number }) => {
            return <CardEvent data={item} key={item.objectId} />;
          })}
      </div>
      <div
        className="fixed bottom-0 left-0 p-4 z-10 cursor-pointer hover:animate-bounce"
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <circle cx="35" cy="35" r="35" fill="white" />
          <path
            d="M52.5 45L35 25L17.5 45"
            stroke="#ADADAD"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
});

export default AllEvents;
