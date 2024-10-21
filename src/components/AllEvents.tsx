import { observer } from "mobx-react-lite";
import store from "../store/store";
import CardEvent from "./CardEvent2";
import AllMap from "./YMaps";
import AddEvent from "./AddEvent";
import { useEffect, useRef, useState } from "react";
import { Input } from "antd";
// import { Flex, Spin } from "antd";
// import ArrowUp from "./SVG_components/ArrowUp";
// import ArrowDown from "./SVG_components/ArrowDown";
import PageUp from "./SVG_components/PageUp";
import FilterIcon from "./SVG_components/Filter";
import EmptyCard from "./SVG_components/EmptyCard";
import SortByDate from "./SVG_components/SortByDate";
import ShuffleByDate from "./SVG_components/SortByDateShuffle";
// import Day from "./DayFilter";
import Type from "./TypeFilter";
import Spinner from "./Spinner";
// import BackGrnd from "./SVG_components/BackGrnd";
// import MoreInfo from "./SVG_components/MoreInfo";
const { Search } = Input;

const AllEvents = observer(() => {
  const [data, setData] = useState<any>(null);
  const [allEvents, setAllEvents] = useState<any>(null);
  // const [allAds, setAllAds] = useState<any>(null);
  const [shownCards, setShownCards] = useState<any>(null);

  const [resetFilters, setResetFilters] = useState(false);
  const [filters, setFilters] = useState(false);
  // const [typesFilters, setTypesFilters] = useState([0]);
  // const [typesFilters, setTypesFilters] = useState([0]);
  const [isLoaded, setIsloaded] = useState(false);
  const allEv = useRef<any>(null);

  const jsonFetch = () => {
    console.log("FETCH!");
    fetch(
      `https://gde-chto.ru/elitegis/rest/services/${
        store.cities[store.currentCity]
      }/sights/MapServer/${store.layerIds}/query?f=json`

      // ${
      //   store.cities[store.currentCity]
      // }/sights/MapServer/exts/CompositeSoe/Search?f=json&layerIds=${
      //   store.layerIds
      // }&definitionQueries=%7B%22102%22%3A%22type!%3D30%22%7D&geometryToDistance=%7B%22type%22%3A%22point%22%2C%22x%22%3A9248980.746105952%2C%22y%22%3A7336891.762952331%2C%22spatialReference%22%3A%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D%7D&orderByDisplayNames=false&returnGeometries=&outCoordinateSystems=%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D&compareType=contains&onlyInCaption=false&singleText=%D0%B0&returnFields=%5B%22*%22%5D&returnLabelPoints=&returnExtents=*&returnScore=true&ignoreCase=true&language=ru`
    )
      // fetch(
      //   `https://gde-chto.ru/elitegis/rest/services/${
      //     store.cities[store.currentCity]
      //   }/sights/MapServer/exts/CompositeSoe/Search?f=json&layerIds=${
      //     store.layerIds
      //   }&definitionQueries=%7B%22102%22%3A%22type!%3D30%22%7D&geometryToDistance=%7B%22type%22%3A%22point%22%2C%22x%22%3A9248980.746105952%2C%22y%22%3A7336891.762952331%2C%22spatialReference%22%3A%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D%7D&orderByDisplayNames=false&returnGeometries=&outCoordinateSystems=%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D&compareType=contains&onlyInCaption=false&singleText=%D0%B0&returnFields=%5B%22*%22%5D&returnLabelPoints=&returnExtents=*&returnScore=true&ignoreCase=true&language=ru`
      // )
      .then((response) => response.json())
      .then((data) => setData(data.features))
      .catch((error) => console.error(error));
  };

  const sortData = () => {
    console.log("SORTDATA!");
    let events: { layerId: Number | null }[] = [];
    let ads: { layerId: Number | null }[] = [];
    data?.map((item: { layerId: Number | null }) => {
      if (store.layerIds === "102") {
        events.push(item);
      }
      if (store.layerIds === "201") {
        ads.push(item);
      }
    });

    setAllEvents(events);
    // console.log(events?.length, "events.length!!");
  };

  const sortFavorites = () => {
    let shownEvents: any[] = [];
    allEvents?.map((item: { attributes: { oid: Number } }) => {
      if (store.favoriteEvents.includes(item.attributes.oid)) {
        shownEvents.push(item);
      }
    });
    setShownCards(shownEvents);
    store.setСurrentTab(2);
    setResetFilters(false);
    setFilters(false);
    store.setMapView(false);
    store.setSorted(0);
  };

  const filterEvents = () => {
    setFilters(true);
    // store.setDatesFilters([
    //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    //   22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    // ]);
    store.setСurrentTab(3);
    setResetFilters(true);
    store.setMapView(false);
    store.setSorted(0);
  };

  // const useFilterEvents = (typeEvent: number) => {
  //   let currentFilters = [];
  //   if (typesFilters.length === 1) {
  //     currentFilters.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15);
  //   }
  //   currentFilters.push(...typesFilters);
  //   if (!currentFilters.includes(typeEvent)) {
  //     currentFilters.push(typeEvent);
  //     // setStyleFilter("hidden");
  //     setTypesFilters(currentFilters);
  //   } else {
  //     const delArray = currentFilters.filter((number) => number !== typeEvent);
  //     setTypesFilters(delArray);
  //   }
  //   store.setSorted(0);
  // };

  const onSearch = (value: string, _e: any) => {
    console.log(value);
    let resultIds: any[] = [];
    let resultCards: any[] = [];
    fetch(
      `https://gde-chto.ru/elitegis/rest/services/${
        store.cities[store.currentCity]
      }/sights/MapServer/exts/CompositeSoe/Search?f=json&layerIds=201%2C20100%2C102&compareType=contains&onlyInCaption=false&singleText=${value}&returnFields=%5B%22*%22%5D&returnLabelPoints=&returnExtents=*&returnScore=true&ignoreCase=true&language=ru`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        data.results.map((item: any) => {
          resultIds.push(item.objectId);
          // console.log(item);
        });
        allEvents.map((item: any) => {
          // console.log(item.objectId);
          if (resultIds.includes(item.attributes.oid)) {
            resultCards.push(item);
          }
        });
        setShownCards(resultCards);
      })
      .catch((error) => console.error(error));
    store.setСurrentTab(99);
    setResetFilters(false);
    setFilters(false);
    store.setTypeFilters([0]);
    store.setMapView(false);
  };

  const sortByDate = () => {
    if (store.sorted === 1) {
      shownCards?.sort(
        (a: any, b: any) => a.attributes.date_from - b.attributes.date_from
      );
    } else {
      shownCards?.sort(() => Math.random() - 0.5);
    }

    let checkArray: any[] = [];
    shownCards?.map((item: any) => {
      checkArray.push(item);
    });
    setShownCards(checkArray);
  };

  useEffect(() => {
    setIsloaded(false);
    setData(null);
    setShownCards(null);
    setAllEvents(null);
    jsonFetch();
    store.checkEvents();
    document.title = `ГдеЧто. ${store.titleCities[store.currentCity]}`;
  }, [store.currentCity]);

  useEffect(() => {
    // setIsloaded(false);
    // console.log(data, "DATA!!");
    if (data !== null) {
      // console.log("data not null!!!!!!");
      sortData();
    }
  }, [data]);

  useEffect(() => {
    store.setSpinView("");
    setShownCards(allEvents?.sort(() => Math.random() - 0.5));
    setIsloaded(true);

    let checkFav: any[] = [];
    allEvents?.map((item: any) => {
      if (store.favoriteEvents.includes(item.attributes.oid)) {
        checkFav.push(item.attributes.oid);
        localStorage.setItem("favoriteEvents", JSON.stringify(checkFav));
      }
    });
    store.checkEvents();

    setFilters(false);
    store.setTypeFilters([0]);
    setResetFilters(false);
    store.setСurrentTab(0);
    store.setSorted(0);
    store.setData(allEvents?.length, allEvents?.length);
    store.setMapView(true);
  }, [allEvents]);

  // useEffect(() => {
  //   setShownCards(allEvents?.slice(0, 4));
  // }, [allEvents]);

  // useEffect(() => {
  //   sortEvents();
  //   store.setAllEvents(events?.length);
  // }, [events, store.allEvents, store.dataFilter]);

  useEffect(() => {
    // console.log(store.dataFilter);
    let dateEvents: any[] = [];
    allEvents?.map(
      (item: { attributes: { date_to: string | number | Date } }) => {
        if (store.dataFilter === new Date(item.attributes.date_to).getDate()) {
          dateEvents.push(item);
        }
      }
    );
    setShownCards(dateEvents);
    // setMap(false);
    // console.log(shownEvents[0]);
  }, [store.dataFilter]);

  // useEffect(() => {
  //   let coordEvents: { objectId: string | Number | null }[] = [];
  //   shownEvents?.map(
  //     (item: { attributes: any; objectId: string | Number | null }) => {
  //       if (
  //         Math.abs(store.eventLat - item.attributes.geom_lat) < toleranceLat &&
  //         Math.abs(store.eventLong - item.attributes.geom_long) < toleranceLong
  //       ) {
  //         coordEvents.push(item);
  //       }
  //     }
  //   );
  //   setshownEvents(coordEvents);
  //   // setMap(false);
  //   // setMap(true);
  //   // console.log(store.x);
  // }, [store.x, store.y]);

  useEffect(() => {
    let typeEvents: { attributes: { type: number } }[] = [];
    shownCards?.map((item: { attributes: { type: number } }) => {
      if (item.attributes.type === store.currentType) {
        typeEvents.push(item);
      }
    });
    setShownCards(typeEvents);
  }, [store.currentType]);

  useEffect(() => {
    // console.log(store.datesFilters, "store days");
    let cardsEvents: { attributes: any; oid: Number | null }[] = [];
    if (store.datesFilters.length === 30) {
      store.setDatesFilters([]);
      store.setDatesFilters([store.dateEvent]);
    }

    allEvents?.map((item: { attributes: any; oid: Number | null }) => {
      const dateEvent = new Date(item.attributes.date_from).getDate();
      if (
        !store.typesFilters.includes(item.attributes.type) &&
        store.datesFilters.includes(dateEvent)
      ) {
        cardsEvents.push(item);
      }
    });
    setShownCards(cardsEvents);
    console.log(cardsEvents.length, "- найдено ");
  }, [store.typesFilters, store.datesFilters]);

  useEffect(() => {
    // console.log(shownCards?.length, "shownCards...");
    // console.log("use!");
    // if (shownCards?.length === 239) {
    //   setShownCards(allEvents?.slice(0, 1));
    //   console.log("Ничего нету...");
    // }
  }, [shownCards]);

  useEffect(() => {
    sortByDate();
  }, [store.sorted]);

  return (
    <>
      <Spinner />
      <AllMap />

      {store.addEventView && <AddEvent />}

      {store.cardsEventsView && (
        <div
          ref={allEv}
          className={
            store.mapView
              ? "fixed container z-20 mx-auto sm:top-[90%] top-[100%] overflow-x-hidden overflow-scroll w-11/12 h-[75%]"
              : "fixed container z-20 mx-auto top-[25%] overflow-x-hidden overflow-scroll w-11/12 h-[75%]"
          }
        >
          <div
            className={
              "flex gap-4 gap-x-6 flex-wrap items-center md:justify-normal justify-center"
            }
          >
            <h1
              className={
                store.currentTab == 0
                  ? store.underlineTabStyle +
                    " cursor-pointer text-slate-600 font-bold "
                  : " cursor-pointer text-slate-600 font-bold"
              }
              onClick={() => {
                store.setSpinView("");
                store.setСurrentTab(0);
                setFilters(false);
                setResetFilters(false);
                store.setTypeFilters([0]);
                // setIsloaded(false);
                // setShownCards(null);
                setShownCards(allEvents);
                // setIsloaded(true);
                store.setMapView(false);
                store.setDatesFilters([
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                ]);
                store.setSorted(0);
              }}
            >
              Мероприятия
            </h1>
            <span className="-left-4 p-2 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-white bg-slate-400">
              {store.allEvents}
            </span>

            <p
              className={
                store.currentTab == 2
                  ? store.underlineTabStyle +
                    " font-bold text-slate-600 cursor-pointer"
                  : " font-bold text-slate-600 cursor-pointer"
              }
              onClick={() => sortFavorites()}
            >
              Избранное
            </p>

            {store.favoriteEvents.length && (
              <span className="-left-4 p-2 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-white bg-sky-400">
                {store.favoriteEvents.length}
              </span>
            )}

            <Search
              className=""
              placeholder="Поиск мероприятий"
              onSearch={onSearch}
              style={{ width: 170 }}
            />

            <div onClick={() => filterEvents()}>
              <p
                className={
                  store.currentTab == 3
                    ? store.underlineTabStyle +
                      " font-bold text-slate-600 cursor-pointer"
                    : " font-bold text-slate-600 cursor-pointer"
                }
              >
                Фильтр
              </p>
            </div>
            <div className="relative -left-3">
              <FilterIcon />
            </div>

            <p
              className="font-bold text-sky-400 cursor-pointer sm:block hidden"
              onClick={() => store.setMapView(store.mapView ? false : true)}
            >
              {store.mapView ? "Скрыть карту" : "Показать карту"}
            </p>

            {store.sorted === 0 ? (
              <div onClick={() => store.setSorted(1)}>
                <SortByDate />
              </div>
            ) : (
              <div onClick={() => store.setSorted(0)}>
                <ShuffleByDate />
              </div>
            )}
            {/* <div className="absolute -z-10 w-full h-32 rounded-3xl bg-gray-500 drop-shadow-lg opacity-95"></div> */}
          </div>

          {/* {filters ? (
            <div className="mt-4">
              <p
                className="flex justify-center cursor-pointer sm:justify-normal font-bold text-sky-400"
                onClick={() =>
                  allEv.current.scrollTo({
                    top: 600,
                    left: 0,
                    behavior: "smooth",
                  })
                }
              >
                Найдено мероприятий: {shownCards.length}
              </p>
            </div>
          ) : (
            ""
          )} */}

          {/* {filters ? (
            <div className="mt-4 md:w-1/6 w-full">
              <Day />
            </div>
          ) : (
            ""
          )} */}

          {filters ? (
            <div className="pt-6 flex gap-1 flex-wrap">
              <Type />
              {resetFilters && (
                <div
                  onClick={() => {
                    store.setSpinView("");
                    setShownCards(allEvents);
                    store.setTypeFilters([0]);
                    store.setDatesFilters([
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                      18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                    ]);
                    store.setSorted(0);
                    // setIsloaded(false);
                  }}
                >
                  <p className="pl-8 pr-8 pt-1 pb-1 rounded-full inline-block relative border-2 border-red-600 font-bold text-xs text-red-600 hover:bg-red-600 hover:text-white cursor-pointer">
                    Сбросить
                  </p>
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          {shownCards?.length === 0 ? <EmptyCard /> : ""}
          <div className="grid items-start sm:grid-cols-3 grid-cols-1 2xl:grid-cols-4 gap-4 pt-8">
            {isLoaded ? (
              shownCards?.map((item: { attributes: { oid: any } }) => {
                return <CardEvent data={item} key={item.attributes.oid} />;
              })
            ) : (
              <Spinner />
            )}
          </div>

          {/* <BackGrnd /> */}

          {!store.mapView && (
            <div
              className="fixed bottom-0 left-0 p-4 z-10 cursor-pointer hover:animate-bounce"
              onClick={() =>
                allEv.current.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }
            >
              <PageUp />
            </div>
          )}
        </div>
      )}
    </>
  );
});

export default AllEvents;
