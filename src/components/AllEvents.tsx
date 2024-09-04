import { observer } from "mobx-react-lite";
import store from "../store/store";
import CardEvent from "./CardEvent";
import AllMap from "./YMaps";
import AddEvent from "./AddEvent";
import { useEffect, useState } from "react";
import { Input } from "antd";

const { Search } = Input;

const AllEvents = observer(() => {
  const toleranceLat = 0.01;
  const toleranceLong = 0.005;

  const underlineTabStyle =
    " underline decoration-4 underline-offset-8 decoration-sky-500";

  const styleFilter =
    " cursor-pointer hover:scale-95 pr-4 pl-4 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-gray-200 border-2";
  const [events, setEvents] = useState<any>(null);
  const [shownEvents, setshownEvents] = useState<any>(null);
  // const [map, setMap] = useState(true);
  const [resetFilters, setResetFilters] = useState(false);
  const [filters, setFilters] = useState(false);
  const [typesFilters, setTypesFilters] = useState([0]);
  // const [styleFilter, setStyleFilter] = useState(
  //   " cursor-pointer hover:scale-95 pr-4 pl-4 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-gray-200 border-2"
  // );

  const jsonFetch = () => {
    fetch(
      `https://gde-chto.ru/elitegis/rest/services/${
        store.cities[store.currentCity]
      }/sights/MapServer/exts/CompositeSoe/Search?f=json&layerIds=201%2C102&definitionQueries=%7B%22102%22%3A%22type!%3D30%22%7D&geometryToDistance=%7B%22type%22%3A%22point%22%2C%22x%22%3A9248980.746105952%2C%22y%22%3A7336891.762952331%2C%22spatialReference%22%3A%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D%7D&orderByDisplayNames=false&returnGeometries=&outCoordinateSystems=%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D&compareType=contains&onlyInCaption=false&singleText=%D0%B0&returnFields=%5B%22*%22%5D&returnLabelPoints=&returnExtents=*&returnScore=true&ignoreCase=true&language=ru`
    )
      .then((response) => response.json())
      .then((data) => setEvents(data.results))
      // .then(() => getImg())
      .catch((error) => console.error(error));
  };

  const sortEvents = () => {
    let removedEvents =
      JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];

    let shownEvents: { objectId: string | Number | null }[] = [];
    events?.map((item: { objectId: Number | null }) => {
      if (!removedEvents.includes(item.objectId)) {
        shownEvents.push(item);
      }
    });
    // console.log(events);
    setshownEvents(shownEvents);
    // store.setAllEvents(shownEvents?.length);
    setFilters(false);
    setTypesFilters([0]);
    setResetFilters(false);
    store.setСurrentTab(0);
  };

  // const getImg = (layerId: Number | null, objectId: Number | null) => {
  //   // let img: any;
  //   // events.forEach((item: any) => console.log(item));
  //   // events?.map((item: { layerId: number; objectId: number }) => {
  //   // console.log(item.objectId);
  //   fetch(
  //     `https://gde-chto.ru/elitegis/rest/services/${
  //       store.cities[store.currentCity]
  //     }/sights/MapServer/exts/CompositeSoe/GetAttachments?layer=${layerId}&objectId=${objectId}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data.attachmentInfos[0].id, "IMG!!!");
  //       return data.attachmentInfos[0].id;
  //     })
  //     .catch((error) => console.error(error));
  //   // });
  // };

  const sortFavorites = () => {
    let shownEvents: { objectId: string | Number | null }[] = [];
    events?.map((item: { objectId: string | Number | null }) => {
      if (store.favoriteEvents.includes(item.objectId)) {
        shownEvents.push(item);
      }
    });
    setshownEvents(shownEvents);
    store.setСurrentTab(2);
    setResetFilters(true);
  };

  const filterEvents = () => {
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
    // setMap(false);
    setFilters(true);
    store.setСurrentTab(3);
    setResetFilters(true);
    console.log("filtered!");
  };

  const useFilterEvents = (typeEvent: number) => {
    let currentFilters = [];
    currentFilters.push(...typesFilters);
    if (!currentFilters.includes(typeEvent)) {
      currentFilters.push(typeEvent);
      // setStyleFilter("hidden");
      setTypesFilters(currentFilters);
    } else {
      const delArray = currentFilters.filter((number) => number !== typeEvent);
      setTypesFilters(delArray);
    }

    // console.log("use!", typeEvent);
    // console.log(typesFilters);
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
    // setMap(false);
    store.setСurrentTab(1);
    setFilters(false);
    setResetFilters(true);
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

    setshownEvents(searchedEvents);
    store.setСurrentTab(99);
    setResetFilters(true);
  };

  // const useMap = () => {
  //   map ? setMap(false) : setMap(true);
  // };

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
    // setMap(false);
    // console.log(shownEvents[0]);
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
    // setMap(false);
    // setMap(true);
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

  useEffect(() => {
    let typeEvents: { attributes: any; objectId: string | Number | null }[] =
      [];
    events?.map(
      (item: { attributes: any; objectId: string | Number | null }) => {
        if (!typesFilters.includes(item.attributes.type)) {
          typeEvents.push(item);
        }
      }
    );
    setshownEvents(typeEvents);
  }, [typesFilters]);

  // useEffect(() => {
  //   shownEvents(false);
  // }, []);

  return (
    <>
      {store.mapView && <AllMap />}
      {store.addEventView && <AddEvent />}

      {store.cardsEventsView && (
        <div>
          <div
            className={
              store.mapView
                ? "pt-4 md:pt-8 flex gap-2 gap-x-6 flex-wrap items-center md:justify-normal justify-center"
                : "pt-32 flex gap-2 gap-x-6 flex-wrap items-center md:justify-normal justify-center"
            }
          >
            <h1
              className={
                store.currentTab == 0
                  ? underlineTabStyle +
                    " cursor-pointer text-slate-600 font-bold "
                  : " cursor-pointer text-slate-600 font-bold"
              }
              onClick={() => sortEvents()}
            >
              Все мероприятия
            </h1>
            <span
              className="-left-4 p-2 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-white bg-slate-400 cursor-pointer"
              onClick={() => sortEvents()}
            >
              {store.allEvents}
            </span>
            <p
              className={
                store.currentTab == 1
                  ? underlineTabStyle +
                    " font-bold text-slate-600 cursor-pointer"
                  : " font-bold text-slate-600 cursor-pointer"
              }
              onClick={() => sortSoonEvents()}
            >
              Скоро!
            </p>

            <div>
              <p
                className={
                  store.currentTab == 3
                    ? underlineTabStyle +
                      " font-bold text-slate-600 cursor-pointer"
                    : " font-bold text-slate-600 cursor-pointer"
                }
                onClick={() => filterEvents()}
              >
                Что ищем?
              </p>
            </div>

            <p
              className="font-bold text-slate-600 cursor-pointer"
              onClick={() => shuffleEvents()}
            >
              Перемешать
            </p>

            <p
              className={
                store.currentTab == 2
                  ? underlineTabStyle +
                    " font-bold text-slate-600 cursor-pointer"
                  : " font-bold text-slate-600 cursor-pointer"
              }
              onClick={() => sortFavorites()}
            >
              Избранные
            </p>

            {store.favoriteEvents.length && (
              <span
                className="-left-5 p-2 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-white bg-sky-400 cursor-pointer"
                onClick={() => sortFavorites()}
              >
                {store.favoriteEvents.length}
              </span>
            )}

            <Search
              className=""
              placeholder="Поиск мероприятий"
              onSearch={onSearch}
              style={{ width: 250 }}
              // allowClear={true}
            />

            {/* <p className="pr-4 font-bold text-slate-600">Прошедшие</p> */}

            <p
              className="font-bold text-sky-400 cursor-pointer"
              onClick={() => store.setMapView(store.mapView ? false : true)}
            >
              {store.mapView ? "Скрыть карту" : "Показать карту"}
            </p>
          </div>

          {filters ? (
            // <div className="pt-4 grid grid-rows-2 grid-cols-6 2xl:grid-flow-col 2xl:grid-rows-1 auto-cols-max gap-2">
            <div className="pt-4 flex gap-1 flex-wrap">
              <p
                onClick={() => useFilterEvents(1)}
                className={
                  typesFilters.includes(1)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#7777F7] bg-[#7777F7]"
                }
              >
                Музыка
              </p>
              <p
                onClick={() => useFilterEvents(2)}
                className={
                  typesFilters.includes(2)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#507077] bg-[#507077]"
                }
              >
                Выставки
              </p>
              <p
                onClick={() => useFilterEvents(3)}
                className={
                  typesFilters.includes(3)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#B74890] bg-[#B74890]"
                }
              >
                Праздники
              </p>
              <p
                onClick={() => useFilterEvents(4)}
                className={
                  typesFilters.includes(4)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#8CC63F] bg-[#8CC63F]"
                }
              >
                Дети
              </p>
              <p
                onClick={() => useFilterEvents(5)}
                className={
                  typesFilters.includes(5)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#FC5454] bg-[#FC5454]"
                }
              >
                Спорт
              </p>
              <p
                onClick={() => useFilterEvents(6)}
                className={
                  typesFilters.includes(6)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#80CCFF] bg-[#80CCFF]"
                }
              >
                Курсы
              </p>
              <p
                onClick={() => useFilterEvents(7)}
                className={
                  typesFilters.includes(7)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#58AAAB] bg-[#58AAAB]"
                }
              >
                Танцы
              </p>
              <p
                onClick={() => useFilterEvents(8)}
                className={
                  typesFilters.includes(8)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#FBB03B] bg-[#FBB03B]"
                }
              >
                Еда
              </p>
              <p
                onClick={() => useFilterEvents(9)}
                className={
                  typesFilters.includes(9)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#FF6B57] bg-[#FF6B57]"
                }
              >
                Игры
              </p>
              <p
                onClick={() => useFilterEvents(10)}
                className={
                  typesFilters.includes(10)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#7D6793] bg-[#7D6793]"
                }
              >
                Ярмарки
              </p>
              <p
                onClick={() => useFilterEvents(12)}
                className={
                  typesFilters.includes(12)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#2ECC71] bg-[#2ECC71]"
                }
              >
                Экскурсии
              </p>
              <p
                onClick={() => useFilterEvents(13)}
                className={
                  typesFilters.includes(13)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#157764] bg-[#157764]"
                }
              >
                Театр Кино
              </p>
              <p
                onClick={() => useFilterEvents(14)}
                className={
                  typesFilters.includes(14)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#FF978F] bg-[#FF978F]"
                }
              >
                Тренировки
              </p>
              <p
                onClick={() => useFilterEvents(15)}
                className={
                  typesFilters.includes(15)
                    ? styleFilter + "border-gray-300 border-2"
                    : styleFilter + "border-[#F458F9] bg-[#F458F9]"
                }
              >
                Вечеринки
              </p>
              {resetFilters && (
                <div onClick={() => sortEvents()}>
                  <p className="pl-4 pr-4 pt-1 pb-1 rounded-full inline-block relative border-2 border-red-600 font-bold text-xs text-red-600 hover:bg-red-600 hover:text-white cursor-pointer">
                    Сбросить
                  </p>
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          <div className="grid items-start sm:grid-cols-3 grid-cols-1 2xl:grid-cols-4 gap-4 pt-8">
            {shownEvents &&
              shownEvents.map((item: { layerId: any; objectId: number }) => {
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
            <svg width="50" height="50" viewBox="0 0 70 70" fill="none">
              <circle cx="35" cy="35" r="35" fill="white" />
              <path
                d="M52.5 45L35 25L17.5 45"
                stroke="#ADADAD"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
});

export default AllEvents;
