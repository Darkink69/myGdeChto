import { observer } from "mobx-react-lite";
import store from "../store/store";
import { useEffect, useState } from "react";
import { Image } from "antd";

const CardEvent = observer(({ data }: any) => {
  const styleDateEl =
    "relative inline-block font-bold cursor-pointer before:block before:absolute before:-inset-1 ";

  const [visibleEl, setVisibleEl] = useState("hidden");
  // const [visibleTooltip, setVisibleTooltip] = useState("hidden");
  const [tooltip, setTooltip] = useState(0);
  const [dateEl, setDateEl] = useState(
    styleDateEl + "before:bg-sky-800 text-white"
  );
  const [dateText, setDateText] = useState(data.attributes.text_date);

  // type Data = {
  //   name: string;
  //   body: string;
  //   userId: number;
  //   id: number;
  // };

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

  const getFullCard = () => {
    console.log(data.objectId);
    visibleEl == "hidden" ? setVisibleEl("") : setVisibleEl("hidden");
  };

  const getTooltip = (num: number) => {
    setTooltip(num);
    setTimeout(() => {
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
  };

  useEffect(() => {
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
          className="relative font-sans text-2xl font-bold text-sky-700 cursor-pointer pb-4"
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

        <p className="text-base pt-1">{data.attributes.text_time}</p>
        {/* <p>{data.objectId}</p> */}
        {/* <p>{data.attributes.approve}</p> */}

        <Image
          className="pt-4 pb-4 w-full"
          // width={200}
          src={data.attributes.img}
        />
        <p className={visibleEl + " text-sm"}>{data.attributes.description}</p>
        <p className={visibleEl + " text-sm"}>{data.attributes.note}</p>
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

        <span
          className="before:block before:absolute before:-inset-1 before:bg-blue-100 relative inline-block font-bold cursor-pointer"
          onClick={() => sortByGeom()}
          onMouseEnter={() => getTooltip(3)}
        >
          <span className="relative leading-normal p-2">
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
              Показать все события рядом
            </div>
          </div>
        </span>

        <div
          className="relative cursor-pointer"
          onClick={() => addFavoriteEvent()}
          onMouseEnter={() => getTooltip(4)}
        >
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
