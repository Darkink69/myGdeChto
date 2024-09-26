import { observer } from "mobx-react-lite";
import store from "../store/store";
import CardEvent from "./CardEvent";
import AllMap from "./YMaps";
import AddEvent from "./AddEvent";
import { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import ArrowUp from "./SVG_components/ArrowUp";
import ArrowDown from "./SVG_components/ArrowDown";
import PageUp from "./SVG_components/PageUp";
import FilterIcon from "./SVG_components/Filter";
import EmptyCard from "./SVG_components/EmptyCard";
import SortByDate from "./SVG_components/SortByDate";
import ShuffleByDate from "./SVG_components/SortByDateShuffle";
import Day from "./DayFilter";
const { Search } = Input;

const AllEvents = observer(() => {
  const [data, setData] = useState<any>(null);
  const [allEvents, setAllEvents] = useState<any>(null);
  // const [allAds, setAllAds] = useState<any>(null);
  const [shownCards, setShownCards] = useState<any>(null);

  const [resetFilters, setResetFilters] = useState(false);
  const [filters, setFilters] = useState(false);
  // const [typesFilters, setTypesFilters] = useState([0]);
  const [typesFilters, setTypesFilters] = useState([0]);
  const [isLoaded, setIsloaded] = useState(false);
  const allEv = useRef<any>(null);

  const jsonFetch = () => {
    fetch(
      `https://gde-chto.ru/elitegis/rest/services/${
        store.cities[store.currentCity]
      }/sights/MapServer/exts/CompositeSoe/Search?f=json&layerIds=${
        store.layerIds
      }&definitionQueries=%7B%22102%22%3A%22type!%3D30%22%7D&geometryToDistance=%7B%22type%22%3A%22point%22%2C%22x%22%3A9248980.746105952%2C%22y%22%3A7336891.762952331%2C%22spatialReference%22%3A%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D%7D&orderByDisplayNames=false&returnGeometries=&outCoordinateSystems=%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D&compareType=contains&onlyInCaption=false&singleText=%D0%B0&returnFields=%5B%22*%22%5D&returnLabelPoints=&returnExtents=*&returnScore=true&ignoreCase=true&language=ru`
    )
      .then((response) => response.json())
      .then((data) => setData(data.results))
      .catch((error) => console.error(error));
  };

  const sortData = () => {
    let events: { layerId: Number | null }[] = [];
    let ads: { layerId: Number | null }[] = [];
    data?.map((item: { layerId: Number | null }) => {
      if (item.layerId === 102) {
        events.push(item);
      }
      if (item.layerId === 201) {
        ads.push(item);
      }
      setAllEvents(events);
      // setAllAds(ads);
      setIsloaded(true);
      setShownCards(events.sort(() => Math.random() - 0.5));
      // setShownCards(events);
    });

    setFilters(false);
    setTypesFilters([0]);
    setResetFilters(false);
    store.setСurrentTab(0);
    store.setSorted(0);
    store.setDatesFilters([]);
    store.setData(events.length, ads.length);
  };

  const sortFavorites = () => {
    let shownEvents: { objectId: string | Number | null }[] = [];
    allEvents?.map((item: { objectId: string | Number | null }) => {
      if (store.favoriteEvents.includes(item.objectId)) {
        shownEvents.push(item);
      }
    });
    setShownCards(shownEvents);
    store.setСurrentTab(2);
    setResetFilters(true);
    setFilters(false);
    store.setMapView(false);
    store.setSorted(0);
  };

  const filterEvents = () => {
    setFilters(true);
    store.setСurrentTab(3);
    setResetFilters(true);
    store.setMapView(false);
    store.setSorted(0);
  };

  const useFilterEvents = (typeEvent: number) => {
    let currentFilters = [];
    if (typesFilters.length === 1) {
      currentFilters.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15);
    }
    currentFilters.push(...typesFilters);
    if (!currentFilters.includes(typeEvent)) {
      currentFilters.push(typeEvent);
      // setStyleFilter("hidden");
      setTypesFilters(currentFilters);
    } else {
      const delArray = currentFilters.filter((number) => number !== typeEvent);
      setTypesFilters(delArray);
    }
    store.setSorted(0);
  };

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
          if (resultIds.includes(item.objectId)) {
            resultCards.push(item);
          }
        });
        setShownCards(resultCards);
      })
      .catch((error) => console.error(error));
    store.setСurrentTab(99);
    setResetFilters(true);
    store.setMapView(false);
  };

  const sortByDate = () => {
    console.log("Sort!");

    if (store.sorted === 1) {
      shownCards?.sort(
        (a: any, b: any) => a.attributes.date_from - b.attributes.date_from
      );
    } else {
      shownCards?.sort(() => Math.random() - 0.5);
    }

    let checkArray: any[] = [];
    shownCards?.map((item: any) => {
      // console.log(item);
      checkArray.push(item);
    });
    setShownCards(checkArray);
  };

  useEffect(() => {
    jsonFetch();
    store.checkEvents();
    document.title = `ГдеЧто. ${store.titleCities[store.currentCity]}`;
  }, [store.currentCity]);

  useEffect(() => {
    sortData();
  }, [data]);

  // useEffect(() => {
  //   sortEvents();
  //   store.setAllEvents(events?.length);
  // }, [events, store.allEvents, store.dataFilter]);

  useEffect(() => {
    // console.log(store.dataFilter);
    let dateEvents: { objectId: string | Number | null }[] = [];
    allEvents?.map(
      (item: { attributes: any; objectId: string | Number | null }) => {
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
    let typeEvents: { objectId: string | Number | null }[] = [];
    shownCards?.map(
      (item: { attributes: any; objectId: string | Number | null }) => {
        if (item.attributes.type === store.currentType) {
          typeEvents.push(item);
        }
      }
    );
    setShownCards(typeEvents);
  }, [store.currentType]);

  useEffect(() => {
    let typeEvents: { attributes: any; objectId: string | Number | null }[] =
      [];
    if (store.datesFilters.length === 0) {
      console.log("store.datesFilters.length === 1");
      store.setDatesFilters([0]);
    }

    allEvents?.map(
      (item: { attributes: any; objectId: string | Number | null }) => {
        const dateEvent = new Date(item.attributes.date_from).getDate();
        if (
          !typesFilters.includes(item.attributes.type) &&
          !store.datesFilters.includes(dateEvent)
        ) {
          typeEvents.push(item);
        }
      }
    );
    setShownCards(typeEvents);
    console.log(typeEvents.length, "- найдено");
  }, [typesFilters, store.datesFilters]);

  useEffect(() => {
    console.log("loading...");

    // console.log("use!");
    // if (shownCards?.length === 0) {
    //   console.log("Ничего нету...");
    // }
  }, [shownCards]);

  useEffect(() => {
    sortByDate();
  }, [store.sorted]);

  // useEffect(() => {
  //   console.log(store.datesFilters);
  //   let daysEvents: { attributes: any; objectId: string | Number | null }[] =
  //     [];
  //   shownCards?.map((item: any) => {
  //     const dateEvent = new Date(item.attributes.date_from).getDate();
  //     if (store.datesFilters.includes(dateEvent)) {
  //       daysEvents.push(item);
  //     }
  //   });
  //   setShownCards(daysEvents);

  // }, [store.datesFilters]);

  return (
    <>
      <AllMap />

      {store.addEventView && <AddEvent />}

      {store.cardsEventsView && (
        <div
          ref={allEv}
          className={
            store.mapView
              ? "fixed container mx-auto sm:top-[90%] top-[100%] overflow-x-hidden overflow-scroll w-11/12 h-[75%]"
              : "fixed container mx-auto top-[26%] overflow-x-hidden overflow-scroll w-11/12 h-[75%]"
          }
        >
          {store.mapView ? (
            <div onClick={() => store.setMapView(store.mapView ? false : true)}>
              <ArrowUp />
            </div>
          ) : (
            <div onClick={() => store.setMapView(store.mapView ? false : true)}>
              <ArrowDown />
            </div>
          )}
          <div
            className={
              "flex z-40 gap-2 gap-x-6 flex-wrap items-center md:justify-normal justify-center"
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
                store.setСurrentTab(0);
                setFilters(false);
                // setResetFilters(true);
                setTypesFilters([0]);
                // setIsloaded(false);
                // setShownCards(null);
                setShownCards(allEvents);
                // setIsloaded(true);
                store.setMapView(false);
                // store.setDatesFilters([]);
                store.setSorted(0);
              }}
            >
              Все мероприятия
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
              Избранные
            </p>

            {store.favoriteEvents.length && (
              <span className="-left-5 p-2 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-white bg-sky-400">
                {store.favoriteEvents.length}
              </span>
            )}

            <Search
              className=""
              placeholder="Поиск мероприятий"
              onSearch={onSearch}
              style={{ width: 200 }}
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
              <div
                // className="relative -left-3"
                onClick={() => store.setSorted(1)}
              >
                <SortByDate />
              </div>
            ) : (
              <div onClick={() => store.setSorted(0)}>
                <ShuffleByDate />
              </div>
            )}

            {/* <div className="relative -left-3">
              <FilterIcon />
            </div> */}
          </div>

          {filters ? (
            <div className="mt-8 md:w-2/4 w-full">
              <Day />
            </div>
          ) : (
            ""
          )}

          {filters ? (
            <div className="pt-8 flex gap-1 flex-wrap">
              <p
                onClick={() => useFilterEvents(1)}
                className={
                  typesFilters.includes(1)
                    ? store.styleFilter + " text-[#7777F7] border-[#7777F7]"
                    : store.styleFilter +
                      " text-white border-[#7777F7] bg-[#7777F7]"
                }
              >
                Музыка
              </p>
              <p
                onClick={() => useFilterEvents(2)}
                className={
                  typesFilters.includes(2)
                    ? store.styleFilter + " text-[#507077] border-[#507077]"
                    : store.styleFilter +
                      " text-white border-[#507077] bg-[#507077]"
                }
              >
                Выставки
              </p>
              <p
                onClick={() => useFilterEvents(3)}
                className={
                  typesFilters.includes(3)
                    ? store.styleFilter + " text-[#B74890] border-[#B74890]"
                    : store.styleFilter +
                      " text-white border-[#B74890] bg-[#B74890]"
                }
              >
                Праздники
              </p>
              <p
                onClick={() => useFilterEvents(4)}
                className={
                  typesFilters.includes(4)
                    ? store.styleFilter + " text-[#8CC63F] border-[#8CC63F]"
                    : store.styleFilter +
                      " text-white border-[#8CC63F] bg-[#8CC63F]"
                }
              >
                Дети
              </p>
              <p
                onClick={() => useFilterEvents(5)}
                className={
                  typesFilters.includes(5)
                    ? store.styleFilter + " text-[#FC5454] border-[#FC5454]"
                    : store.styleFilter +
                      " text-white border-[#FC5454] bg-[#FC5454]"
                }
              >
                Спорт
              </p>
              <p
                onClick={() => useFilterEvents(6)}
                className={
                  typesFilters.includes(6)
                    ? store.styleFilter + " text-[#80CCFF] border-[#80CCFF]"
                    : store.styleFilter +
                      " text-white border-[#80CCFF] bg-[#80CCFF]"
                }
              >
                Курсы
              </p>
              <p
                onClick={() => useFilterEvents(7)}
                className={
                  typesFilters.includes(7)
                    ? store.styleFilter + " text-[#58AAAB] border-[#58AAAB]"
                    : store.styleFilter +
                      " text-white border-[#58AAAB] bg-[#58AAAB]"
                }
              >
                Танцы
              </p>
              <p
                onClick={() => useFilterEvents(8)}
                className={
                  typesFilters.includes(8)
                    ? store.styleFilter + " text-[#FBB03B] border-[#FBB03B]"
                    : store.styleFilter +
                      " text-white border-[#FBB03B] bg-[#FBB03B]"
                }
              >
                Еда
              </p>
              <p
                onClick={() => useFilterEvents(9)}
                className={
                  typesFilters.includes(9)
                    ? store.styleFilter + " text-[#FF6B57] border-[#FF6B57]"
                    : store.styleFilter +
                      " text-white border-[#FF6B57] bg-[#FF6B57]"
                }
              >
                Игры
              </p>
              <p
                onClick={() => useFilterEvents(10)}
                className={
                  typesFilters.includes(10)
                    ? store.styleFilter + " text-[#7D6793] border-[#7D6793]"
                    : store.styleFilter +
                      " text-white border-[#7D6793] bg-[#7D6793]"
                }
              >
                Ярмарки
              </p>
              <p
                onClick={() => useFilterEvents(12)}
                className={
                  typesFilters.includes(12)
                    ? store.styleFilter + " text-[#2ECC71] border-[#2ECC71]"
                    : store.styleFilter +
                      " text-white border-[#2ECC71] bg-[#2ECC71]"
                }
              >
                Экскурсии
              </p>
              <p
                onClick={() => useFilterEvents(13)}
                className={
                  typesFilters.includes(13)
                    ? store.styleFilter + " text-[#157764] border-[#157764]"
                    : store.styleFilter +
                      " text-white border-[#157764] bg-[#157764]"
                }
              >
                Театр Кино
              </p>
              <p
                onClick={() => useFilterEvents(14)}
                className={
                  typesFilters.includes(14)
                    ? store.styleFilter + " text-[#FF978F] border-[#FF978F]"
                    : store.styleFilter +
                      " text-white border-[#FF978F] bg-[#FF978F]"
                }
              >
                Тренировки
              </p>
              <p
                onClick={() => useFilterEvents(15)}
                className={
                  typesFilters.includes(15)
                    ? store.styleFilter + " text-[#F458F9] border-[#F458F9]"
                    : store.styleFilter +
                      " text-white border-[#F458F9] bg-[#F458F9]"
                }
              >
                Вечеринки
              </p>
              {resetFilters && (
                <div
                  onClick={() => {
                    setShownCards(allEvents);
                    setTypesFilters([0]);
                    store.setSorted(0);
                    // console.log(typesFilters);
                  }}
                >
                  <p className="pl-4 pr-4 pt-1 pb-1 rounded-full inline-block relative border-2 border-red-600 font-bold text-xs text-red-600 hover:bg-red-600 hover:text-white cursor-pointer">
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
              shownCards?.map((item: { layerId: any; objectId: number }) => {
                return <CardEvent data={item} key={item.objectId} />;
              })
            ) : (
              // <p className="font-mono text-center z-50 text-slate-600 decoration-solid">
              //   Загрузка..
              // </p>
              <img
                className="w-6 h-6 opacity-50 animate-spin"
                src="https://gde-chto.ru/catalog/css/images/common/loader_wait_snake_black_16x16.svg"
                alt=""
              />
            )}
          </div>

          <div
            className={
              store.mapView
                ? "fixed container mx-auto sm:h-[20%] h-[10%] -z-10 rounded-3xl -bottom-10 -ml-4 bg-white opacity-95 drop-shadow-lg"
                : "fixed container mx-auto h-[84%] -z-10 rounded-3xl -bottom-10 -ml-4 bg-white opacity-95 drop-shadow-lg"
            }
          ></div>
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
