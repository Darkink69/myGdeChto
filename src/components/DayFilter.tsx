// import store from "../store/store";
import { observer } from "mobx-react-lite";
import store from "../store/store";
// import { useState } from "react";

const Day = observer(() => {
  // const [datesFilters, setDatesFilters] = useState([0]);
  const now = new Date();
  let days = [];
  let daysSecond = [];
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  // let daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

  const daysOfMounth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  const secondDaysMounth =
    store.daysOfEvents - (daysOfMounth - now.getDate() + 1);

  // console.log(secondDaysMounth, "second");
  // console.log(store.daysOfEvents, "store");
  // console.log(now.getFullYear());
  // console.log(daysOfMounth);
  // console.log(
  //   daysOfWeek[new Date(`${now.getMonth()} 25, ${now.getFullYear()}`).getDay()],
  //   "week"
  // );
  // console.log(new Date(`${now.getFullYear}-09-25`), "w");

  // const days = [
  //   { d: 24, color: " bg-red-800" },
  //   { d: 25, color: " bg-pink-400" },
  //   { d: 26, color: " bg-sky-800" },
  //   { d: 27, color: " bg-sky-800" },
  //   { d: 28, color: " bg-yellow-400" },
  //   { d: 29, color: " bg-yellow-400" },
  // ];

  for (let i = now.getDate(); i <= daysOfMounth; i++) {
    // console.log(i);
    days.push(i);
  }

  for (let i = 1; i <= secondDaysMounth; i++) {
    daysSecond.push(i);
  }

  const useDateFilterEvents = (dateEvent: number) => {
    console.log(store.datesFilters);
    let currentDates: number[] = [];
    // if (currentDates.length === 0) {

    // }

    currentDates.push(...store.datesFilters);
    if (!currentDates.includes(dateEvent)) {
      currentDates.push(dateEvent);
      // setStyleFilter("hidden");
      store.setDatesFilters(currentDates);
    } else {
      const delArray = currentDates.filter((number) => number !== dateEvent);
      store.setDatesFilters(delArray);
    }
    store.setSorted(0);
    console.log(currentDates);
  };

  // const setDays = (i: number) => {
  //   console.log("day -", i);
  // };

  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <div className="text-sx text-gray-400 pb-2">
            {months[now.getMonth()]}
          </div>
          {days.map((item) => {
            // console.log(item);
            return (
              <div
                onClick={() => useDateFilterEvents(item)}
                // className={
                //   "cursor-pointer p-2 pt-1 pb-1 mr-1 rounded-full inline-block relative text-md font-bold text-white" +
                //   " bg-sky-800"
                // }
                className={
                  store.datesFilters.includes(item)
                    ? "cursor-pointer p-2 pt-1 pb-1 mr-1 rounded-full inline-block relative text-md font-bold text-sky-800 border-sky-800 border-2"
                    : "cursor-pointer p-2 pt-1 pb-1 mr-1 rounded-full inline-block relative text-md font-bold text-white border-white border-2 bg-sky-800"
                }
              >
                {item}
                {/* <div className="text-xs font-thin text-gray-400">
                  {daysOfWeek[now.getDay()]}
                </div> */}
              </div>
            );
          })}

          {/* {days.map((item) => {
            // console.log(item);
            return (
              <div className="text-xs font-thin text-gray-400">
                {daysOfWeek[now.getDay()]} {item}
              </div>
            );
          })} */}
        </div>

        <div>
          <div className="text-sx text-gray-400 pb-2">
            {months[now.getMonth() + 1]}
          </div>

          {daysSecond.map((item) => {
            return (
              <div
                onClick={() => useDateFilterEvents(item)}
                className={
                  store.datesFilters.includes(item)
                    ? "cursor-pointer p-2 pt-1 pb-1 mr-1 pr-3 pl-3 rounded-full inline-block relative text-md font-bold text-sky-800 border-sky-800 border-2"
                    : "cursor-pointer p-2 pt-1 pb-1 mr-1 pr-3 pl-3 rounded-full inline-block relative text-md font-bold text-white border-white border-2 bg-sky-800"
                }
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
});

export default Day;
