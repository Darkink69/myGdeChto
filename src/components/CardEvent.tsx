import { observer } from "mobx-react-lite";
import store from "../store/store";
import { useEffect, useState } from "react";
import { Image } from "antd";

const CardEvent = observer(({ data }: any) => {
  const [img, setImg] = useState(null);
  const [description, setDescription] = useState("");

  // let im;
  const waitGifs = [
    "https://cs4.pikabu.ru/post_img/2014/10/26/11/1414342825_975442758.jpg",
    // "https://media1.tenor.com/m/d23-C-mR704AAAAC/shvurlo-%D0%B6%D0%B4%D1%83.gif",
    // "https://images.squarespace-cdn.com/content/v1/5bb039b60490792e51c69930/1580611723040-VT133WFQRDI3Y2AUTK2B/giphy+%281%29.gif",
    // "https://i.pinimg.com/originals/44/5f/1a/445f1ab89041d998d9fa937ad7f9efa3.gif",
    // "https://gifdb.com/images/featured/waiting-ixdcqr5r6rgskuen.gif",
    // "https://64.media.tumblr.com/78842e06949159e3d28a527c25fb99d8/386a5022a82088aa-ad/s640x960/14e90205367dddfb371954c384dbd16a42395ee4.gif",
    // "https://i.gifer.com/WZ3W.gif",
    // "https://i.gifer.com/4qb.gif",
    // "https://i.gifer.com/origin/20/201d3ea5b1e9cac8d049886977bffe3c_w200.gif",
    // "https://99px.ru/sstorage/86/2016/10/image_862010162150152465627.gif",
    // "https://media.tenor.com/Y7ShQ_3hnn8AAAAM/me-waiting-for-my-friends-to-get-online.gif",
    // "https://gde-chto.ru/catalog/css/Gallery-master/img/loading.gif",
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
    // fetch(
    //   `https://gde-chto.ru/elitegis/rest/services/${
    //     store.cities[store.currentCity]
    //   }/sights/MapServer/102/1931/attachments/`
    // )
    fetch(
      `https://gde-chto.ru/elitegis/rest/services/${
        store.cities[store.currentCity]
      }/sights/MapServer/exts/CompositeSoe/GetAttachments?layer=${
        data.layerId
      }&objectId=${data.objectId}`
    )
      .then((response) => response.json())
      .then((data) => {
        // im = data.attachmentInfos[0].id;
        setImg(data.attachmentInfos[0].id);
        // return data.attachmentInfos[0].id;
        // console.log(data.attachmentInfos[0].id);
      })
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
    store.x = data.attributes.geom_lat;
    store.y = data.attributes.geom_long;
    store.scale = "2256";
  };

  const sortByType = () => {
    store.currentType = data.attributes.type;
    store.setСurrentTab(99);
  };

  const removeEvent = () => {
    console.log("Remove!", data.objectId);
    let removedEvents =
      JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];
    removedEvents.push(data.objectId);
    localStorage.setItem("removedEvents", JSON.stringify(removedEvents));
    store.checkEvents();
  };

  const addFavoriteEvent = () => {
    console.log("В избранное!", data.objectId);
    let favoriteEvents =
      JSON.parse(localStorage.getItem("favoriteEvents") || "[]") || [];
    favoriteEvents.push(data.objectId);
    localStorage.setItem("favoriteEvents", JSON.stringify(favoriteEvents));
    store.checkEvents();
    setFav(true);
  };

  useEffect(() => {
    getImg();
    setColorDateEl();
  }, []);

  return (
    <>
      <div
        className="p-6 max-w-[400px] mx-auto bg-white rounded-xl shadow-lg"
        // onClick={() => getFullCard()}
      >
        <div className="relative cursor-pointer" onClick={() => removeEvent()}>
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
        </div>

        <h1
          className="relative font-sans sm:text-2xl text-md font-bold text-sky-700 cursor-pointer pb-4"
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
            className="absolute z-10 top-0 opacity-50 hover:opacity-100"
            onClick={() => getFullCard()}
            width="300"
            height="300"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.75">
              <circle cx="150.5" cy="150.5" r="71.5" fill="#D9D9D9" />
              <path
                d="M118.264 156V149.748H115.357V156H112.826V147.598H120.795V156H118.264ZM130.439 151.775C130.439 152.619 130.258 153.375 129.895 154.043C129.531 154.707 129.023 155.225 128.371 155.596C127.719 155.963 126.988 156.146 126.18 156.146C125.391 156.146 124.672 155.969 124.023 155.613C123.379 155.254 122.877 154.752 122.518 154.107C122.158 153.459 121.979 152.727 121.979 151.91C121.979 151.055 122.16 150.285 122.523 149.602C122.887 148.918 123.396 148.391 124.053 148.02C124.709 147.645 125.455 147.457 126.291 147.457C127.096 147.457 127.814 147.637 128.447 147.996C129.084 148.352 129.574 148.861 129.918 149.525C130.266 150.186 130.439 150.936 130.439 151.775ZM127.756 151.846C127.756 151.154 127.623 150.609 127.357 150.211C127.092 149.812 126.729 149.613 126.268 149.613C125.764 149.613 125.371 149.805 125.09 150.188C124.809 150.57 124.668 151.111 124.668 151.811C124.668 152.494 124.807 153.027 125.084 153.41C125.365 153.793 125.746 153.984 126.227 153.984C126.52 153.984 126.783 153.898 127.018 153.727C127.252 153.555 127.434 153.309 127.562 152.988C127.691 152.668 127.756 152.287 127.756 151.846ZM137.91 158.355V156H133.123V158.355H130.896V153.984H131.729C132.736 152.199 133.291 150.07 133.393 147.598H138.889V153.984H140.189V158.355H137.91ZM136.357 149.654H135.414C135.297 151.084 134.912 152.527 134.26 153.984H136.357V149.654ZM148.182 150.369C148.182 150.943 148.035 151.453 147.742 151.898C147.453 152.344 147.039 152.689 146.5 152.936C145.961 153.178 145.334 153.299 144.619 153.299H143.846V156H141.314V147.598H144.76C145.943 147.598 146.809 147.822 147.355 148.271C147.906 148.721 148.182 149.42 148.182 150.369ZM145.504 150.457C145.504 150.113 145.404 149.854 145.205 149.678C145.006 149.502 144.713 149.414 144.326 149.414H143.846V151.488H144.414C145.141 151.488 145.504 151.145 145.504 150.457ZM157.182 151.775C157.182 152.619 157 153.375 156.637 154.043C156.273 154.707 155.766 155.225 155.113 155.596C154.461 155.963 153.73 156.146 152.922 156.146C152.133 156.146 151.414 155.969 150.766 155.613C150.121 155.254 149.619 154.752 149.26 154.107C148.9 153.459 148.721 152.727 148.721 151.91C148.721 151.055 148.902 150.285 149.266 149.602C149.629 148.918 150.139 148.391 150.795 148.02C151.451 147.645 152.197 147.457 153.033 147.457C153.838 147.457 154.557 147.637 155.189 147.996C155.826 148.352 156.316 148.861 156.66 149.525C157.008 150.186 157.182 150.936 157.182 151.775ZM154.498 151.846C154.498 151.154 154.365 150.609 154.1 150.211C153.834 149.812 153.471 149.613 153.01 149.613C152.506 149.613 152.113 149.805 151.832 150.188C151.551 150.57 151.41 151.111 151.41 151.811C151.41 152.494 151.549 153.027 151.826 153.41C152.107 153.793 152.488 153.984 152.969 153.984C153.262 153.984 153.525 153.898 153.76 153.727C153.994 153.555 154.176 153.309 154.305 152.988C154.434 152.668 154.498 152.287 154.498 151.846ZM165.555 153.229C165.555 154.115 165.283 154.799 164.74 155.279C164.197 155.76 163.412 156 162.385 156H158.377V147.598H164.465V149.578H160.908V150.879H162.689C163.311 150.879 163.834 150.977 164.26 151.172C164.689 151.367 165.012 151.641 165.227 151.992C165.445 152.344 165.555 152.756 165.555 153.229ZM162.865 153.41C162.865 153.156 162.787 152.955 162.631 152.807C162.475 152.654 162.258 152.578 161.98 152.578H160.908V154.295H161.869C162.186 154.295 162.43 154.221 162.602 154.072C162.777 153.92 162.865 153.699 162.865 153.41ZM172.111 156V152.865H169.205V156H166.674V147.598H169.205V150.709H172.111V147.598H174.643V156H172.111ZM176.318 156V147.598H181.551V149.578H178.85V150.803H181.387V152.783H178.85V154.02H181.744V156H176.318ZM182.939 156V147.598H188.172V149.578H185.471V150.803H188.008V152.783H185.471V154.02H188.365V156H182.939Z"
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
              img
                ? `https://gde-chto.ru/elitegis/rest/services/${
                    store.cities[store.currentCity]
                  }/sights/MapServer/${data.layerId}/${
                    data.objectId
                  }/attachments/${img}`
                : // : `https://gde-chto.ru/elitegis/rest/services/${
                  //     store.cities[store.currentCity]
                  //   }/sights/MapServer/${data.layerId}/${
                  //     data.objectId
                  //   }/attachments/${im}`
                  waitGifs[rndGif]
            }
            alt=""
            onClick={() => getFullCard()}
            // onClick={() => getImg()}
          />
        </div>

        <Image
          className={visibleEl + " pt-4 pb-4 w-full"}
          // width={200}
          src={`https://gde-chto.ru/elitegis/rest/services/${
            store.cities[store.currentCity]
          }/sights/MapServer/${data.layerId}/${
            data.objectId
          }/attachments/${img}`}
        />

        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className={visibleEl + " text-xs sm:text-sm"}
        ></div>
        {/* {description} */}

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
          #{store.typesEvent[data.attributes.type]}
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
          onClick={() => addFavoriteEvent()}
          onMouseEnter={() => getTooltip(4)}
        >
          {fav ? (
            <svg
              className="absolute bottom-0 right-0"
              width="29"
              height="27"
              viewBox="0 0 29 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.15 1.62012L16.68 9.40012C16.95 10.2201 17.72 10.7801 18.58 10.7801H26.76L20.14 15.5901C19.44 16.1001 19.15 17.0001 19.41 17.8301L21.94 25.6101L15.32 20.8001C14.62 20.2901 13.67 20.2901 12.97 20.8001L6.35004 25.6101L8.88004 17.8301C9.15004 17.0101 8.85004 16.1001 8.15004 15.5901L1.54004 10.7801H9.72004C10.59 10.7801 11.35 10.2201 11.62 9.40012L14.15 1.62012Z"
                fill="#3399FF"
                stroke="#3399FF"
              />
            </svg>
          ) : (
            <svg
              className="absolute bottom-0 right-0"
              width="29"
              height="27"
              viewBox="0 0 29 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
