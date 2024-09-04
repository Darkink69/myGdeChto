import { observer } from "mobx-react-lite";
import store from "../store/store";
import { useEffect, useState } from "react";
import { Image } from "antd";

const CardEvent = observer(({ data }: any) => {
  const [img, setImg] = useState<any>([]);
  const [imgLinks, setImgLinks] = useState<any>([]);
  const [description, setDescription] = useState("");

  const waitGifs = [
    "https://cs4.pikabu.ru/post_img/2014/10/26/11/1414342825_975442758.jpg",
  ];
  let rndGif = Math.floor(Math.random() * waitGifs.length);

  const styleDateEl =
    "relative inline-block font-bold cursor-pointer before:block before:absolute before:-inset-1 ";

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
    styleDateEl + "before:bg-sky-800 text-white"
  );
  const [dateText, setDateText] = useState(data.attributes.text_date);

  const getImg = () => {
    fetch(
      `https://gde-chto.ru/elitegis/rest/services/${
        store.cities[store.currentCity]
      }/sights/MapServer/exts/CompositeSoe/GetAttachments?layer=${
        data.layerId
      }&objectId=${data.objectId}`
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
      setDateEl(styleDateEl + " before:bg-yellow-400");
    }
    if (now.getDate() === day.getDate()) {
      setDateEl(styleDateEl + " before:bg-red-800 text-white");
      setDateText("СЕГОДНЯ");
    }

    if (now.getDate() + 1 === day.getDate()) {
      setDateEl(styleDateEl + " before:bg-pink-400 text-white");
      setDateText("ЗАВТРА");
    }
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
    }, 1000);
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
    store.x = data.attributes.geom_lat;
    store.y = data.attributes.geom_long;
    store.scale = "2256";
  };

  const sortByType = () => {
    store.currentType = data.attributes.type;
    store.setСurrentTab(99);
  };

  // const removeEvent = () => {
  //   console.log("Remove!", data.objectId);
  //   let removedEvents =
  //     JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];
  //   removedEvents.push(data.objectId);
  //   localStorage.setItem("removedEvents", JSON.stringify(removedEvents));
  //   store.checkEvents();
  // };

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
      console.log(data.objectId, "INCLUDE!!");
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
            : "p-6 max-w-[400px] mx-auto bg-white rounded-xl shadow-lg"
        }
        // onClick={() => getFullCard()}
      >
        {/* <div className="relative cursor-pointer" onClick={() => removeEvent()}>
          <svg
            className="absolute top-0 right-0 z-10"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L17 17" stroke="#ADADAD" strokeWidth="2" />
            <path d="M17 1L1 17" stroke="#ADADAD" strokeWidth="2" />
          </svg>
        </div> */}

        <h1
          className="relative font-sans sm:text-xl text-base font-bold text-sky-700 cursor-pointer pb-4"
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
        {/* <p className="text-xs">
          {data.distanceInMeters}
        </p> */}

        <div
          className={
            visibleEl === "hidden"
              ? "cursor-pointer sm:pt-4 pt-1 sm:pb-4 pb-0 hover:drop-shadow-lg relative"
              : "hidden"
          }
        >
          <svg
            className="absolute z-10 inset-x-1/4 inset-y-1/4 opacity-50 hover:opacity-100"
            onClick={() => getFullCard()}
            width="143"
            height="143"
            viewBox="0 0 143 143"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.75">
              <circle cx="71.5" cy="71.5" r="71.5" fill="#D9D9D9" />
              <path
                d="M39.2637 77V70.748H36.3574V77H33.8262V68.5977H41.7949V77H39.2637ZM51.4395 72.7754C51.4395 73.6191 51.2578 74.375 50.8945 75.043C50.5312 75.707 50.0234 76.2246 49.3711 76.5957C48.7188 76.9629 47.9883 77.1465 47.1797 77.1465C46.3906 77.1465 45.6719 76.9688 45.0234 76.6133C44.3789 76.2539 43.877 75.752 43.5176 75.1074C43.1582 74.459 42.9785 73.7266 42.9785 72.9102C42.9785 72.0547 43.1602 71.2852 43.5234 70.6016C43.8867 69.918 44.3965 69.3906 45.0527 69.0195C45.709 68.6445 46.4551 68.457 47.291 68.457C48.0957 68.457 48.8145 68.6367 49.4473 68.9961C50.084 69.3516 50.5742 69.8613 50.918 70.5254C51.2656 71.1855 51.4395 71.9355 51.4395 72.7754ZM48.7559 72.8457C48.7559 72.1543 48.623 71.6094 48.3574 71.2109C48.0918 70.8125 47.7285 70.6133 47.2676 70.6133C46.7637 70.6133 46.3711 70.8047 46.0898 71.1875C45.8086 71.5703 45.668 72.1113 45.668 72.8105C45.668 73.4941 45.8066 74.0273 46.084 74.4102C46.3652 74.793 46.7461 74.9844 47.2266 74.9844C47.5195 74.9844 47.7832 74.8984 48.0176 74.7266C48.252 74.5547 48.4336 74.3086 48.5625 73.9883C48.6914 73.668 48.7559 73.2871 48.7559 72.8457ZM58.9102 79.3555V77H54.123V79.3555H51.8965V74.9844H52.7285C53.7363 73.1992 54.291 71.0703 54.3926 68.5977H59.8887V74.9844H61.1895V79.3555H58.9102ZM57.3574 70.6543H56.4141C56.2969 72.084 55.9121 73.5273 55.2598 74.9844H57.3574V70.6543ZM69.1816 71.3691C69.1816 71.9434 69.0352 72.4531 68.7422 72.8984C68.4531 73.3438 68.0391 73.6895 67.5 73.9355C66.9609 74.1777 66.334 74.2988 65.6191 74.2988H64.8457V77H62.3145V68.5977H65.7598C66.9434 68.5977 67.8086 68.8223 68.3555 69.2715C68.9062 69.7207 69.1816 70.4199 69.1816 71.3691ZM66.5039 71.457C66.5039 71.1133 66.4043 70.8535 66.2051 70.6777C66.0059 70.502 65.7129 70.4141 65.3262 70.4141H64.8457V72.4883H65.4141C66.1406 72.4883 66.5039 72.1445 66.5039 71.457ZM78.1816 72.7754C78.1816 73.6191 78 74.375 77.6367 75.043C77.2734 75.707 76.7656 76.2246 76.1133 76.5957C75.4609 76.9629 74.7305 77.1465 73.9219 77.1465C73.1328 77.1465 72.4141 76.9688 71.7656 76.6133C71.1211 76.2539 70.6191 75.752 70.2598 75.1074C69.9004 74.459 69.7207 73.7266 69.7207 72.9102C69.7207 72.0547 69.9023 71.2852 70.2656 70.6016C70.6289 69.918 71.1387 69.3906 71.7949 69.0195C72.4512 68.6445 73.1973 68.457 74.0332 68.457C74.8379 68.457 75.5566 68.6367 76.1895 68.9961C76.8262 69.3516 77.3164 69.8613 77.6602 70.5254C78.0078 71.1855 78.1816 71.9355 78.1816 72.7754ZM75.498 72.8457C75.498 72.1543 75.3652 71.6094 75.0996 71.2109C74.834 70.8125 74.4707 70.6133 74.0098 70.6133C73.5059 70.6133 73.1133 70.8047 72.832 71.1875C72.5508 71.5703 72.4102 72.1113 72.4102 72.8105C72.4102 73.4941 72.5488 74.0273 72.8262 74.4102C73.1074 74.793 73.4883 74.9844 73.9688 74.9844C74.2617 74.9844 74.5254 74.8984 74.7598 74.7266C74.9941 74.5547 75.1758 74.3086 75.3047 73.9883C75.4336 73.668 75.498 73.2871 75.498 72.8457ZM86.5547 74.2285C86.5547 75.1152 86.2832 75.7988 85.7402 76.2793C85.1973 76.7598 84.4121 77 83.3848 77H79.377V68.5977H85.4648V70.5781H81.9082V71.8789H83.6895C84.3105 71.8789 84.834 71.9766 85.2598 72.1719C85.6895 72.3672 86.0117 72.6406 86.2266 72.9922C86.4453 73.3438 86.5547 73.7559 86.5547 74.2285ZM83.8652 74.4102C83.8652 74.1562 83.7871 73.9551 83.6309 73.8066C83.4746 73.6543 83.2578 73.5781 82.9805 73.5781H81.9082V75.2949H82.8691C83.1855 75.2949 83.4297 75.2207 83.6016 75.0723C83.7773 74.9199 83.8652 74.6992 83.8652 74.4102ZM93.1113 77V73.8652H90.2051V77H87.6738V68.5977H90.2051V71.709H93.1113V68.5977H95.6426V77H93.1113ZM97.3184 77V68.5977H102.551V70.5781H99.8496V71.8027H102.387V73.7832H99.8496V75.0195H102.744V77H97.3184ZM103.939 77V68.5977H109.172V70.5781H106.471V71.8027H109.008V73.7832H106.471V75.0195H109.365V77H103.939Z"
                fill="black"
              />
            </g>
          </svg>

          <img
            // src="https://sun4-18.userapi.com/impg/CczDilyLD0wR09MhcxOJu-0Rmp01vB4bTE5KeA/dGsBmaa2L24.jpg?size=1620x2160&quality=95&sign=3b2b9c3c58905215471b3f21a8a810bf&type=album"
            // src={`https://gde-chto.ru/elitegis/rest/services/${
            //   store.cities[store.currentCity]
            // }/sights/MapServer/102/1931/attachments/${im}`}
            // src={
            //   img
            //     ? `https://gde-chto.ru/elitegis/rest/services/${
            //         store.cities[store.currentCity]
            //       }/sights/MapServer/102/1931/attachments/${img}`
            //     : waitGifs[rndGif]
            // }
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

        <p className={visibleEl + " text-xs sm:text-sm"}>
          {data.attributes.note}
        </p>

        <p className={visibleEl + " pt-2"}>{data.attributes.phone}</p>
        <a className={visibleEl} href={data.attributes.site} target="_blank">
          <p className="pb-2 text-sky-700">{data.attributes.site}</p>
        </a>

        <div className="flex items-center">
          <div className={visibleEl + " pb-4"}>
            {data.attributes.social_network_vk && (
              <a href={data.attributes.social_network_vk} target="_blank">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0958 0.0135485C23.5276 -0.326248 31.9042 5.93305 31.9993 15.9342C32.084 24.7565 24.7432 32.0186 15.9242 32C7.09694 31.9772 -0.00826187 24.7586 7.21037e-06 15.8182C0.0103436 6.6893 7.78948 -0.351111 16.0958 0.0135485ZM11.6098 10.6135C12.908 11.5397 12.9949 11.6889 13.03 13.1185C13.0445 13.738 13.1065 14.3761 12.9928 14.9749C12.8998 15.4701 12.5773 15.9197 12.3561 16.3901C11.955 16.1 11.4196 15.8969 11.1757 15.5074C10.3694 14.227 9.62728 12.903 8.94715 11.5521C8.62466 10.914 8.24014 10.5845 7.52487 10.6052C6.66488 10.6322 5.80283 10.5949 4.94285 10.628C3.92782 10.6674 3.7459 10.9285 4.24411 11.8484C5.48861 14.1503 6.67729 16.4957 8.10577 18.6795C9.9167 21.4476 12.4243 23.1943 15.9242 23.0555C17.0963 23.0099 17.2038 22.9374 17.3816 21.8082C17.4292 21.5015 17.4788 21.1907 17.578 20.8986C17.8964 19.9579 18.4359 19.8129 19.1987 20.449C19.3559 20.5816 19.5212 20.7183 19.6349 20.8861C20.8939 22.7364 22.6449 23.3973 24.8155 23.0658C24.8837 23.0555 24.954 23.0658 25.0222 23.0617C25.6879 23.0078 26.6182 23.2523 26.8146 22.4567C26.9324 21.9801 26.4487 21.2591 26.0683 20.7805C25.4729 20.0284 24.7432 19.384 24.0589 18.7044C22.9694 17.6249 22.9446 17.339 23.8708 16.0772C24.584 15.1055 25.3137 14.142 26.0042 13.1558C26.2998 12.7352 26.5603 12.2794 26.7608 11.8049C27.1164 10.9658 26.9138 10.6508 26.0042 10.628C24.9726 10.6011 23.9369 10.6778 22.9074 10.6197C22.0536 10.5721 21.6423 10.9264 21.2701 11.6889C20.5921 13.0771 19.7817 14.4031 18.9486 15.7043C18.7501 16.015 18.2333 16.1228 17.8633 16.3238C17.6917 15.9322 17.4808 15.5509 17.3609 15.1428C17.2865 14.8879 17.3444 14.5958 17.3465 14.3181C17.3568 13.3526 17.394 12.385 17.3692 11.4216C17.3465 10.483 17.0488 10.1204 16.1619 10.0769C15.0642 10.021 13.9582 10.0313 12.8626 10.0997C12.4718 10.1246 12.0956 10.4063 11.6139 10.6115L11.6098 10.6135Z"
                    fill="#239AC0"
                  />
                </svg>
              </a>
            )}
          </div>

          <div className={visibleEl + " pb-4 pl-2"}>
            {data.attributes.social_network_telegram && (
              <a href={data.attributes.social_network_telegram} target="_blank">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.0150971 16.083C-0.383506 7.53231 7.16712 -0.0351422 16.0153 0.000122764C24.1431 0.0333133 32.1089 6.5843 31.9989 16.1867C31.8992 24.9905 24.9465 31.9855 15.9613 32C6.24328 32.0166 -0.325377 23.8206 0.0150971 16.083V16.083ZM18.901 13.0814C18.9882 13.1975 19.0754 13.3116 19.1626 13.4278C18.8699 13.7887 18.6083 14.1829 18.2761 14.5044C16.8623 15.8756 15.4215 17.2198 14.0015 18.5848C13.2002 19.3564 13.1711 19.7651 14.07 20.4123C15.7226 21.603 17.3979 22.7771 19.1439 23.8226C20.6947 24.752 21.4463 24.3724 21.7328 22.6091C22.3639 18.7237 22.9514 14.8322 23.5223 10.9364C23.732 9.50092 23.1673 9.08189 21.8096 9.57975C21.6144 9.65028 21.4255 9.7374 21.2345 9.81623C17.6533 11.287 14.07 12.7557 10.4888 14.2306C9.05011 14.8239 7.60932 15.413 6.19345 16.054C5.91941 16.1784 5.58517 16.5332 5.58517 16.7821C5.58517 17.0041 5.97339 17.3214 6.25366 17.4293C7.09031 17.7529 7.94772 18.0454 8.81759 18.2549C9.81825 18.4956 10.7691 18.423 11.6784 17.7757C13.5074 16.473 15.3862 15.2387 17.2609 13.9982C17.782 13.6539 18.3529 13.3821 18.901 13.0772V13.0814Z"
                    fill="#239AC0"
                  />
                </svg>
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
          {data.attributes.type < 20
            ? store.typesEvent[data.attributes.type]
            : data.attributes.type_for_search}
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
