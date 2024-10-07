import { observer } from "mobx-react-lite";
import store from "../store/store";
// import { useState } from "react";

const Day = observer(() => {
  const now = new Date();
  const daysStyles = [];
  let daysStylesSecond = [];
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
  let daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

  const daysOfMounth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  let daysHideMounth = daysOfMounth - now.getDate() + 1 - store.daysOfEvents;
  if (daysHideMounth < 0) daysHideMounth = 0;

  const secondDaysMounth =
    store.daysOfEvents - (daysOfMounth - now.getDate() + 1);

  // console.log(String(42).length, "second");
  // console.log(secondDaysMounth, "second");
  // console.log(store.daysOfEvents, "store");
  // console.log(now.getFullYear());
  // console.log(now.getDay() + 1, "now!");
  // console.log(daysOfMounth);

  for (let i = now.getDate(); i <= daysOfMounth - daysHideMounth; i++) {
    const dayWeek =
      daysOfWeek[new Date(now.getFullYear(), now.getMonth(), i).getDay()];

    let styleDay = {
      d: i,
      elemColor: ` hover:scale-105 cursor-pointer p-2 pt-1 pb-1 mr-1 ${
        String(i).length === 1 ? "pr-3 pl-3" : ""
      } rounded-full inline-block relative text-md font-bold border-2 ${
        dayWeek === "ВС" || dayWeek === "СБ"
          ? "text-black border-yellow-400 border-2 bg-yellow-400"
          : "text-white border-sky-800 border-2 bg-sky-800"
      }`,
      elemColorPush: ` hover:scale-105 cursor-pointer p-2 pt-1 pb-1 mr-1 ${
        String(i).length === 1 ? "pr-3 pl-3" : ""
      } rounded-full inline-block relative text-md font-bold border-2 ${
        dayWeek === "ВС" || dayWeek === "СБ"
          ? "text-black border-yellow-400 border-2"
          : "text-sky-800 border-sky-800 border-2"
      }`,
      dayWeek: dayWeek,
      dwStyle: `text-xs pr-6 ml-3 ${
        dayWeek === "ВС" || dayWeek === "СБ" ? "text-red-600" : "text-gray-400"
      } pb-2`,
    };

    daysStyles.push(styleDay);
  }

  for (let i = 1; i <= secondDaysMounth; i++) {
    const dayWeek =
      daysOfWeek[new Date(now.getFullYear(), now.getMonth() + 1, i).getDay()];
    // console.log(i, dayWeek, "w");
    let styleDay = {
      d: i,
      elemColor: ` hover:scale-105 cursor-pointer p-2 pt-1 pb-1 mr-1 ${
        String(i).length === 1 ? "pr-3 pl-3" : ""
      } rounded-full inline-block relative text-md font-bold border-2 ${
        dayWeek === "ВС" || dayWeek === "СБ"
          ? "text-black border-yellow-400 border-2 bg-yellow-400"
          : "text-white border-sky-800 border-2 bg-sky-800"
      }`,
      elemColorPush: ` hover:scale-105 cursor-pointer p-2 pt-1 pb-1 mr-1 ${
        String(i).length === 1 ? "pr-3 pl-3" : ""
      } rounded-full inline-block relative text-md font-bold border-2 ${
        dayWeek === "ВС" || dayWeek === "СБ"
          ? "text-black border-yellow-400 border-2"
          : "text-sky-800 border-sky-800 border-2"
      }`,
      dayWeek: dayWeek,
      dwStyle: `text-xs pr-6 ml-3 ${
        dayWeek === "ВС" || dayWeek === "СБ" ? "text-red-600" : "text-gray-400"
      } pb-2`,
    };

    daysStylesSecond.push(styleDay);
  }

  const useDateFilterEvents = (dateEvent: number) => {
    store.setDateEvent(dateEvent);
    let currentDates: number[] = [];

    currentDates.push(...store.datesFilters);
    if (!currentDates.includes(dateEvent)) {
      currentDates.push(dateEvent);
      store.setDatesFilters(currentDates);
    } else {
      const delArray = currentDates.filter((number) => number !== dateEvent);
      store.setDatesFilters(delArray);
    }
    store.setSorted(0);
  };

  return (
    <>
      {/* <div className="grid grid-flow-row-dense grid-cols-2"> */}
      <div className="">
        <div>
          <div className="text-sx text-gray-400 pb-2">
            {months[now.getMonth()]}
          </div>
          <div className="flex sm:flex-nowrap flex-wrap">
            {daysStyles.map((item) => {
              return (
                <div>
                  <div
                    onClick={() => useDateFilterEvents(item.d)}
                    className={
                      store.datesFilters.includes(item.d)
                        ? item.elemColor
                        : item.elemColorPush
                    }
                  >
                    {item.d}
                  </div>
                  <div
                    onClick={() => useDateFilterEvents(item.d)}
                    className={item.dwStyle}
                  >
                    {item.dayWeek}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {secondDaysMounth > 0 ? (
          <div>
            <div className="text-sx text-gray-400 pb-2">
              {months[now.getMonth() + 1]}
            </div>
            <div className="flex">
              {daysStylesSecond.map((item) => {
                return (
                  <div>
                    <div
                      onClick={() => useDateFilterEvents(item.d)}
                      className={
                        store.datesFilters.includes(item.d)
                          ? item.elemColor
                          : item.elemColorPush
                      }
                    >
                      {item.d}
                    </div>
                    <div
                      onClick={() => useDateFilterEvents(item.d)}
                      className={item.dwStyle}
                    >
                      {item.dayWeek}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
});

export default Day;
