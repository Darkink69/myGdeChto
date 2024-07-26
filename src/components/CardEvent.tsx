import { observer } from "mobx-react-lite";
import store from "../store/store";
import { useEffect, useState } from "react";
import { Image } from "antd";

const CardEvent = observer(({ data }: any) => {
  const styleDateEl =
    "relative inline-block font-bold cursor-pointer before:block before:absolute before:-inset-1 ";

  const [visibleEl, setVisibleEl] = useState("hidden");
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
    // console.log(now.getDate(), now.getMonth() + 1, now.getDay());
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

  const sortByDate = () => {
    console.log(new Date(data.attributes.date_to).getDate());
    store.dataFilter = new Date(data.attributes.date_to).getDate();
    store.setDataFilter();
    // let now = new Date();
    // console.log(now.getDate(), now.getMonth() + 1, now.getDay());
  };

  const sortByGeom = () => {
    console.log(data.attributes.geom_lat);
    console.log(data.attributes.geom_long);
  };

  const removeEvent = () => {
    console.log("Скрыть. Не интересно...");
    console.log("Remove!", data.objectId);
    let removedEvents =
      JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];
    removedEvents.push(data.objectId);
    localStorage.setItem("removedEvents", JSON.stringify(removedEvents));
    store.checkRemovedEvents();
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
            className="absolute top-0 right-0"
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
          className="font-sans text-2xl font-bold text-sky-700 cursor-pointer pb-4"
          onClick={() => getFullCard()}
          onMouseEnter={() => console.log("Подробнее")}
        >
          {data.attributes.name}
        </h1>
        <span
          className={dateEl}
          onClick={() => sortByDate()}
          onMouseEnter={() => console.log("Показать все события в этот день")}
        >
          <span className="relative leading-normal p-2">{dateText}</span>
        </span>
        <p className="text-base pt-1">{data.attributes.text_time}</p>
        {/* <p>{data.objectId}</p> */}

        <Image
          className="pt-4 pb-4 w-full rounded-xl"
          // width={200}
          src={data.attributes.img}
        />
        <p className={visibleEl + " text-sm"}>{data.attributes.description}</p>
        <p className={visibleEl + " text-sm"}>{data.attributes.note}</p>
        <p className={visibleEl + " pt-2"}>{data.attributes.phone}</p>
        <a className={visibleEl} href={data.attributes.site} target="_blank">
          <p className="pb-4 text-sky-700">{data.attributes.site}</p>
        </a>

        <span
          className="before:block before:absolute before:-inset-1 before:bg-blue-100 relative inline-block font-bold cursor-pointer"
          onClick={() => sortByGeom()}
          onMouseEnter={() => console.log("Показать события рядом")}
        >
          <span className="relative leading-normal p-2">
            {data.attributes.address}
          </span>
          <p className="relative text-sm font-light p-1">
            {data.attributes.place}
          </p>
        </span>

        <div
          className="relative cursor-pointer"
          onClick={() => console.log("В избранное!")}
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
        </div>
      </div>
    </>
  );
});

export default CardEvent;
