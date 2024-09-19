import { observer } from "mobx-react-lite";
import store from "../store/store";
import { useEffect, useState } from "react";
import { Image } from "antd";
import MoreInfo from "./SVG_components/MoreInfo";
import VK from "./SVG_components/VK";
import Telegram from "./SVG_components/Telegram";

const CardEvent = observer(({ data }: any) => {
  const [img, setImg] = useState<any>([]);
  const [imgLinks, setImgLinks] = useState<any>([]);
  const [description, setDescription] = useState("");

  const waitGifs = [
    "https://cs4.pikabu.ru/post_img/2014/10/26/11/1414342825_975442758.jpg",
  ];
  let rndGif = Math.floor(Math.random() * waitGifs.length);

  const days = [
    "ВОСКРЕСЕНИЕ",
    "ПОНЕДЕЛЬНИК",
    "ВТОРНИК",
    "СРЕДА",
    "ЧЕТВЕРГ",
    "ПЯТНИЦА",
    "СУББОТА",
  ];

  const [visibleEl, setVisibleEl] = useState("hidden");
  const [fav, setFav] = useState(false);
  // const [visibleTooltip, setVisibleTooltip] = useState("hidden");
  const [tooltip, setTooltip] = useState(0);
  const [dateEl, setDateEl] = useState(
    store.styleDateEl + "before:bg-sky-800 text-white"
  );
  const [dateText, setDateText] = useState(data.attributes.text_date);

  const getImg = () => {
    fetch(
      `https://gde-chto.ru/elitegis/rest/services/${
        store.cities[store.currentCity]
      }/sights/MapServer/exts/CompositeSoe/GetAttachments?layer=${
        data.layerId
      }&objectId=${data.objectId}&f=json`
    )
      .then((response) => response.json())
      .then((data) => {
        // setImg(data.attachmentInfos[0].id);
        let imgIdsArray: never[] = [];
        data.attachmentInfos?.map((item: { id: never }) => {
          imgIdsArray.push(item.id);
        });
        // if (imgIdsArray.length > 1) {
        //   console.log(imgIdsArray);
        // }
        setImg(imgIdsArray);
      })
      .then()
      .catch((error) => console.error(error));
  };

  const setColorDateEl = () => {
    const now = new Date();
    const day = new Date(data.attributes.date_to);
    if (day.getDay() === 6 || day.getDay() === 0) {
      setDateEl(store.styleDateEl + " before:bg-yellow-400");
    }
    if (now.getDate() === day.getDate()) {
      setDateEl(store.styleDateEl + " before:bg-red-800 text-white");
      setDateText("СЕГОДНЯ");
    }

    if (now.getDate() + 1 === day.getDate()) {
      setDateEl(store.styleDateEl + " before:bg-pink-400 text-white");
      setDateText("ЗАВТРА");
    }

    // if (data.layerId === 201) {
    //   // console.log(data);
    //   setDateEl(" hidden");
    // }
  };

  const setHyperlinks = () => {
    // const wordsLinks = ["https://", "vk.cc", "http://"];

    // const descFieilds = [data.attributes.description];
    // const field = data.attributes.description + " " + data.attributes.note;
    const field = data.attributes.description;

    setDescription(field);

    // function getListIdx(str: string | any[], substr: string) {
    //   let listIdx = [];
    //   let lastIndex = -1;
    //   while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
    //     listIdx.push(lastIndex);
    //   }
    //   return listIdx;
    // }
    // getListIdx("abc bca abcabc cba", "abc"); // [ 0, 8, 11 ]

    // descFieilds.map((field) => {
    //   console.log(typeof field);

    // });
    if (field !== null) {
      let newDesc = field.split("\n").join(" ");

      // const inIndex = getListIdx(newDesc, "https://");
      // console.log(inIndex, "list indx!!");

      const inIndex = newDesc.indexOf("https://");

      let lnk = "";
      if (inIndex !== -1) {
        const outIndex = newDesc.indexOf(" ", inIndex);
        outIndex === -1
          ? (lnk = newDesc.slice(inIndex))
          : (lnk = newDesc.slice(inIndex, outIndex));

        const swiftInsert = (
          original: string,
          index: number,
          insert: string,
          outIndex: number
        ) =>
          original.substring(0, index) + insert + original.substring(outIndex);

        setDescription(
          swiftInsert(
            newDesc,
            inIndex,
            `<a style="color: #3D71B0" href="${lnk}" target="_blank">${lnk} </a>`,
            outIndex
          )
        );
      }
    }
  };

  const getFullCard = () => {
    console.log(data.objectId);
    visibleEl == "hidden" ? setVisibleEl("") : setVisibleEl("hidden");
    setHyperlinks();
  };

  const getTooltip = (num: number) => {
    setTooltip(num);
    const day = new Date(data.attributes.date_to);
    setDateText(days[day.getDay()]);
    setTimeout(() => {
      setDateText(dateText);
      setTooltip(0);
    }, 1500);
  };

  const sortByDate = () => {
    // store.dataFilter = new Date(data.attributes.date_to).getDate();
    const dataFilter = new Date(data.attributes.date_to).getDate();
    store.setDataFilter(dataFilter);
    store.setСurrentTab(99);
  };

  const sortByGeom = () => {
    const eventLat = data.attributes.geom_lat;
    const eventLong = data.attributes.geom_long;
    store.setCoordEvent(eventLat, eventLong);
    store.setСurrentTab(99);
    store.setMapView(true);

    store.setCurrentObjectId(data.objectId);
    const scale = "36112";
    store.setCoords(data.attributes.geom_lat, data.attributes.geom_long, scale);
    // store.x = data.attributes.geom_lat;
    // store.y = data.attributes.geom_long;
    // store.scale = "2256";
  };

  const sortByType = () => {
    store.currentType = data.attributes.type;
    store.setСurrentTab(99);
  };

  const addFavoriteEvent = () => {
    console.log("В избранное!", data.objectId);
    let favoriteEvents =
      JSON.parse(localStorage.getItem("favoriteEvents") || "[]") || [];
    favoriteEvents.push(data.objectId);
    localStorage.setItem("favoriteEvents", JSON.stringify(favoriteEvents));
    store.checkEvents();
  };

  const removeFavoriteEvent = () => {
    console.log(data.objectId, "REMOVE FAV!!");

    const filteredNumbers = store.favoriteEvents.filter(
      (number: any) => number !== data.objectId
    );
    localStorage.setItem("favoriteEvents", JSON.stringify(filteredNumbers));
    store.checkEvents();
    console.log(filteredNumbers);
    setFav(false);
  };

  useEffect(() => {
    let imgLinksArray: any[] = [];
    img?.map((item: string) => {
      imgLinksArray.push(
        `https://gde-chto.ru/elitegis/rest/services/${
          store.cities[store.currentCity]
        }/sights/MapServer/${data.layerId}/${data.objectId}/attachments/${item}`
      );

      // console.log(imgLinksArray);
      setImgLinks(imgLinksArray);
      // console.log(
      //   `https://gde-chto.ru/elitegis/rest/services/${
      //     store.cities[store.currentCity]
      //   }/sights/MapServer/${data.layerId}/${
      //     data.objectId
      //   }/attachments/${item}`
      // );
    });
  }, [img]);

  useEffect(() => {
    if (store.favoriteEvents.includes(data.objectId)) {
      // console.log(data.objectId, "INCLUDE!!");
      setFav(true);
    }
  }, [store.favoriteEvents]);

  useEffect(() => {
    getImg();
    setColorDateEl();
  }, []);

  return (
    <>
      <div
        className={
          data.attributes.type_for_search === "1 Сентября"
            ? "p-6 max-w-[400px] mx-auto bg-amber-50 rounded-xl shadow-lg"
            : "p-6 max-w-[400px] mx-auto bg-white z-10 rounded-xl shadow-lg"
        }
      >
        <h1
          className="relative font-sans sm:text-xl text-base font-bold text-sky-700 cursor-pointer -mt-2 sm:mt-0 pb-4"
          onClick={() => getFullCard()}
          onMouseEnter={() => getTooltip(1)}
        >
          {data.attributes.name}
          <div
            className={
              tooltip === 1
                ? " absolute -top-10 right-100 font-normal text-slate-900 text-sm bg-opacity-90 bg-white inline-block before:block before:absolute before:-inset-1 shadow-md p-2"
                : "hidden"
            }
          >
            Подробнее
          </div>
        </h1>

        <span
          className={dateEl}
          onClick={() => sortByDate()}
          onMouseEnter={() => getTooltip(2)}
        >
          <span className="relative leading-normal p-2">{dateText}</span>
          <div
            className={
              tooltip === 2
                ? "absolute -top-10 z-10 right-100 font-normal bg-opacity-90 bg-white w-40 text-slate-900 text-sm inline-block before:block before:absolute before:-inset-1 shadow-md p-2"
                : "hidden"
            }
          >
            Показать все события в этот день
          </div>
        </span>

        <p className="text-sm sm:text-base pt-1">{data.attributes.text_time}</p>
        {/* <p>{data.objectId}</p> */}
        {/* <p>{data.attributes.approve}</p> */}
        {/* <p>{data.objectId}</p>
        <p>{img}</p> */}
        {/* <p className="text-xs">{data.distanceInMeters}</p> */}

        <div
          onClick={() => getFullCard()}
          className={
            visibleEl === "hidden"
              ? "cursor-pointer sm:pt-4 pt-1 sm:pb-4 pb-0 hover:drop-shadow-lg relative"
              : "hidden"
          }
        >
          <MoreInfo />

          <img
            src={
              img[0]
                ? `https://gde-chto.ru/elitegis/rest/services/${
                    store.cities[store.currentCity]
                  }/sights/MapServer/${data.layerId}/${
                    data.objectId
                  }/attachments/${img[0]}`
                : waitGifs[rndGif]
            }
            alt=""
            onClick={() => getFullCard()}
          />
        </div>
        <Image.PreviewGroup items={imgLinks}>
          <Image
            className={visibleEl + " pt-4 pb-4 w-full"}
            // width={200}
            src={imgLinks[0]}
          />
        </Image.PreviewGroup>

        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className={visibleEl + " text-xs sm:text-sm"}
        ></div>

        <p className={visibleEl + " pt-2"}>{data.attributes.phone}</p>
        <a className={visibleEl} href={data.attributes.site} target="_blank">
          <p className="pb-2 text-sky-700">{data.attributes.site}</p>
        </a>

        <div className="flex items-center">
          <div className={visibleEl + " pb-4"}>
            {data.attributes.social_network_vk && (
              <a href={data.attributes.social_network_vk} target="_blank">
                <VK />
              </a>
            )}
          </div>

          <div className={visibleEl + " pb-4 pl-2"}>
            {data.attributes.social_network_telegram && (
              <a href={data.attributes.social_network_telegram} target="_blank">
                <Telegram />
              </a>
            )}
          </div>
        </div>

        <p
          className={
            visibleEl + " pb-4 text-sm font-bold text-pink-700 cursor-pointer"
          }
          onClick={() => sortByType()}
        >
          #
          {data.layerId === 201
            ? store.typesAds[data.attributes.type]
            : store.typesEvent[data.attributes.type]}
        </p>

        <div
          className={
            !visibleEl
              ? "hidden"
              : "transition ease-in-out delay-100 border-2 hover:border-white rounded border-blue-400 p-2 pt-1 pb-1 hover:bg-blue-200 text-sm text-blue-400 hover:text-black relative inline-block cursor-pointer"
          }
          onClick={() => sortByGeom()}
        >
          Показать на карте
        </div>

        <span
          className={
            visibleEl +
            " before:block before:absolute before:-inset-1 before:bg-blue-100 relative inline-block font-bold cursor-pointer"
          }
          onClick={() => sortByGeom()}
          onMouseEnter={() => getTooltip(3)}
        >
          <span className=" relative leading-normal p-2">
            {data.attributes.address}
          </span>
          <div className="relative text-sm font-light p-1">
            {data.attributes.place}
            <div
              className={
                tooltip === 3
                  ? " absolute -top-0 z-20 right-100 font-normal w-40 bg-opacity-90 bg-white text-slate-900 text-sm inline-block before:block before:absolute before:-inset-1 rounded-md shadow-md p-2"
                  : "hidden"
              }
            >
              Показать на карте и другие события рядом
            </div>
          </div>
        </span>

        <div
          className="relative cursor-pointer"
          // onMouseEnter={() => getTooltip(4)}
        >
          {fav ? (
            <svg
              onClick={() => removeFavoriteEvent()}
              className="absolute bottom-0 right-0"
              width="29"
              height="27"
              viewBox="0 0 29 27"
              fill="none"
            >
              <path
                d="M14.15 1.62012L16.68 9.40012C16.95 10.2201 17.72 10.7801 18.58 10.7801H26.76L20.14 15.5901C19.44 16.1001 19.15 17.0001 19.41 17.8301L21.94 25.6101L15.32 20.8001C14.62 20.2901 13.67 20.2901 12.97 20.8001L6.35004 25.6101L8.88004 17.8301C9.15004 17.0101 8.85004 16.1001 8.15004 15.5901L1.54004 10.7801H9.72004C10.59 10.7801 11.35 10.2201 11.62 9.40012L14.15 1.62012Z"
                fill="#3399FF"
                stroke="#3399FF"
              />
            </svg>
          ) : (
            <svg
              onClick={() => addFavoriteEvent()}
              className="absolute bottom-0 right-0"
              width="29"
              height="27"
              viewBox="0 0 29 27"
              fill="none"
            >
              <path
                d="M14.5 1.23607L17.0289 9.01925C17.2967 9.8433 18.0646 10.4012 18.931 10.4012H27.1147L20.494 15.2115C19.793 15.7208 19.4997 16.6235 19.7674 17.4476L22.2963 25.2307L15.6756 20.4205C14.9746 19.9112 14.0254 19.9112 13.3244 20.4205L6.70366 25.2307L9.23257 17.4476C9.50031 16.6235 9.207 15.7208 8.50603 15.2115L7.91824 16.0205L8.50602 15.2115L1.88525 10.4012L10.069 10.4012C10.9354 10.4012 11.7033 9.8433 11.9711 9.01925L14.5 1.23607Z"
                stroke="#3399FF"
                strokeWidth="2"
              />
            </svg>
          )}

          <div
            className={
              tooltip === 4
                ? " absolute -top-0 right-10 font-normal text-slate-900 text-sm bg-opacity-90 bg-white inline-block before:block before:absolute before:-inset-1 rounded-md shadow-md p-2"
                : "delay-1000 hidden"
            }
          >
            Добавить в Избранное
          </div>
        </div>
      </div>
    </>
  );
});

export default CardEvent;
