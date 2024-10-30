import { observer } from "mobx-react-lite";
import store from "../store/store";
import { useEffect, useState } from "react";
import { Image } from "antd";
import MoreInfo from "./SVG_components/MoreInfo";
import VK from "./SVG_components/VK";
import Telegram from "./SVG_components/Telegram";
import Dzen from "./SVG_components/Dzen";

const CardEvent = observer(({ data }: any) => {
  const [img, setImg] = useState<any>([]);
  const [imgLinks, setImgLinks] = useState<any>([]);
  const [description, setDescription] = useState("");

  const waitGifs = [
    "https://cs4.pikabu.ru/post_img/2014/10/26/11/1414342825_975442758.jpg",
  ];
  let rndGif = Math.floor(Math.random() * waitGifs.length);

  // const days = [
  //   "ВОСКРЕСЕНИЕ",
  //   "ПОНЕДЕЛЬНИК",
  //   "ВТОРНИК",
  //   "СРЕДА",
  //   "ЧЕТВЕРГ",
  //   "ПЯТНИЦА",
  //   "СУББОТА",
  // ];

  const [visibleEl, setVisibleEl] = useState("hidden");
  const [fav, setFav] = useState(false);
  // const [visibleTooltip, setVisibleTooltip] = useState("hidden");
  // const [tooltip, setTooltip] = useState(0);
  const [dateEl, setDateEl] = useState(
    store.styleDateEl + "before:bg-sky-800 text-white"
  );
  const [dateText, setDateText] = useState(data.attributes.text_date);

  const getImg = () => {
    fetch(
      `https://gde-chto.ru/elitegis/rest/services/${
        store.cities[store.currentCity]
      }/sights/MapServer/exts/CompositeSoe/GetAttachments?layer=${
        store.layerIds
      }&objectId=${data.attributes.oid}&f=json`
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
      console.log(newDesc);

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
    visibleEl == "hidden" ? setVisibleEl("") : setVisibleEl("hidden");
    setHyperlinks();
  };

  // const getTooltip = (num: number) => {
  //   setTooltip(num);
  //   const day = new Date(data.attributes.date_to);
  //   setDateText(days[day.getDay()]);
  //   setTimeout(() => {
  //     setDateText(dateText);
  //     setTooltip(0);
  //   }, 1500);
  // };

  // const sortByDate = () => {
  //   // store.dataFilter = new Date(data.attributes.date_to).getDate();
  //   const dataFilter = new Date(data.attributes.date_to).getDate();
  //   store.setDataFilter(dataFilter);
  //   store.setСurrentTab(99);
  // };

  const sortByGeom = () => {
    const eventLat = data.attributes.geom_lat;
    const eventLong = data.attributes.geom_long;
    store.setCoordEvent(eventLat, eventLong);
    store.setСurrentTab(99);
    // store.setMapView(false);
    store.setMapView(true);

    store.setCurrentObjectId(data.attributes.oid);
    const scale = "2256";
    store.setCoords(data.attributes.geom_lat, data.attributes.geom_long, scale);
    // store.x = data.attributes.geom_lat;
    // store.y = data.attributes.geom_long;
    // store.scale = "36112";
  };

  const sortByType = () => {
    store.currentType = data.attributes.type;
    store.setСurrentTab(99);
  };

  const addFavoriteEvent = () => {
    console.log("В избранное!", data.attributes.oid);
    let favoriteEvents =
      JSON.parse(localStorage.getItem("favoriteEvents") || "[]") || [];
    favoriteEvents.push(data.attributes.oid);
    localStorage.setItem("favoriteEvents", JSON.stringify(favoriteEvents));
    store.checkEvents();
  };

  const removeFavoriteEvent = () => {
    console.log(data.attributes.oid, "REMOVE FAV!!");

    const filteredNumbers = store.favoriteEvents.filter(
      (number: any) => number !== data.attributes.oid
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
        }/sights/MapServer/${store.layerIds}/${
          data.attributes.oid
        }/attachments/${item}`
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
    if (store.favoriteEvents.includes(data.attributes.oid)) {
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
          data.attributes.type_for_search === "Хэллоуин"
            ? "p-6 max-w-[400px] mx-auto bg-cover bg-[url('../src/assets/hell.jpg')] rounded-xl shadow-lg"
            : "p-6 max-w-[400px] mx-auto bg-white rounded-xl shadow-lg"
        }
      >
        <h1
          className="relative font-sans sm:text-xl text-base font-bold text-sky-700 cursor-pointer -mt-2 sm:mt-0 pb-4"
          onClick={() => getFullCard()}
          // onMouseEnter={() => getTooltip(1)}
        >
          {data.attributes.name}
          {/* <div
            className={
              tooltip === 1
                ? " absolute -top-10 right-100 font-normal text-slate-900 text-sm bg-opacity-90 bg-white inline-block before:block before:absolute before:-inset-1 shadow-md p-2"
                : "hidden"
            }
          >
            Подробнее
          </div> */}
        </h1>

        <span
          className={dateEl}
          // onClick={() => sortByDate()}
          // onMouseEnter={() => getTooltip(2)}
        >
          <span className="relative leading-normal p-2">{dateText}</span>
          {/* <div
            className={
              tooltip === 2
                ? "absolute -top-10 right-100 font-normal bg-opacity-90 bg-white w-40 text-slate-900 text-sm inline-block before:block before:absolute before:-inset-1 shadow-md p-2"
                : "hidden"
            }
          >
            Показать все события в этот день
          </div> */}
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
                  }/sights/MapServer/${store.layerIds}/${
                    data.attributes.oid
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
            // width={100}
            fallback={"#"}
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

          <div className={visibleEl + " pb-4 pl-2"}>
            {data.attributes.social_network_ya_dzen && (
              <a href={data.attributes.social_network_ya_dzen} target="_blank">
                <Dzen />
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
          {data.attributes.type_for_search === "Хэллоуин"
            ? data.attributes.type_for_search
            : store.typesEvent[data.attributes.type]}
        </p>

        <div
          className={
            "transition ease-in-out delay-100 border-2 hover:border-white rounded border-blue-400 p-2 pt-1 pb-1 hover:bg-blue-200 text-sm text-blue-400 hover:text-black relative inline-block cursor-pointer"
          }
          onClick={() => sortByGeom()}
        >
          Показать на карте
        </div>

        <div
          className="relative cursor-pointer"
          // onMouseEnter={() => getTooltip(4)}
        >
          {fav ? (
            <svg
              onClick={() => removeFavoriteEvent()}
              className="absolute bottom-0 right-0"
              width="33"
              height="29"
              viewBox="0 0 33 29"
              fill="none"
            >
              <path
                d="M32.8654 10.1157C31.088 19.2778 23.1596 24.9259 16.5 28.4925C9.84041 24.9259 1.9062 19.2778 0.1346 10.1157C-0.748278 5.57273 2.83001 0.678892 7.41396 0.0649706C11.191 -0.437861 15.0383 2.03537 16.5 5.49672C17.9559 2.03537 21.809 -0.437861 25.586 0.0649706C30.17 0.678892 33.7483 5.57273 32.8654 10.1157Z"
                fill="#3399FF"
              />
            </svg>
          ) : (
            <svg
              onClick={() => addFavoriteEvent()}
              className="absolute bottom-0 right-0"
              width="33"
              height="29"
              viewBox="0 0 33 29"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30.902 9.73485L30.9021 9.73421C31.2207 8.09509 30.7456 6.28989 29.6577 4.7925C28.5697 3.29494 26.9883 2.27096 25.3216 2.04741C22.5313 1.67623 19.487 3.55356 18.3436 6.27213L16.5037 10.6464L14.6576 6.27478C13.5077 3.55192 10.467 1.67653 7.67852 2.0474C6.0118 2.27092 4.4303 3.29491 3.34227 4.7925C2.25438 6.28989 1.77933 8.09509 2.09787 9.73421L2.09823 9.73605C3.60743 17.5411 10.1761 22.6877 16.5 26.2135C22.8225 22.6882 29.3876 17.5412 30.902 9.73485ZM16.5 28.4925C9.84041 24.9259 1.9062 19.2778 0.1346 10.1157C-0.748278 5.57273 2.83001 0.678892 7.41396 0.0649706C10.3988 -0.332398 13.4275 1.12883 15.2881 3.46753C15.7819 4.08823 16.1934 4.77074 16.5 5.49672C16.8055 4.7705 17.2164 4.08778 17.7101 3.46692C19.5693 1.12857 22.6014 -0.332363 25.586 0.0649706C30.17 0.678892 33.7483 5.57273 32.8654 10.1157C31.088 19.2778 23.1596 24.9259 16.5 28.4925Z"
                fill="#3399FF"
              />
            </svg>
          )}

          {/* <div
            className={
              tooltip === 4
                ? " absolute -top-0 right-10 font-normal text-slate-900 text-sm bg-opacity-90 bg-white inline-block before:block before:absolute before:-inset-1 rounded-md shadow-md p-2"
                : "delay-1000 hidden"
            }
          >
            Добавить в Избранное
          </div> */}
        </div>
      </div>
    </>
  );
});

export default CardEvent;
