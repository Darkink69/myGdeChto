import { observer } from "mobx-react-lite";
import store from "../store/store";
// import { useState } from "react";

const Type = observer(() => {
  //   const [typesFilters, setTypesFilters] = useState([0]);

  const useFilterEvents = (typeEvent: number) => {
    let currentFilters = [];
    if (store.typesFilters.length === 1) {
      currentFilters.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15);
    }
    currentFilters.push(...store.typesFilters);
    if (!currentFilters.includes(typeEvent)) {
      currentFilters.push(typeEvent);
      store.setTypeFilters(currentFilters);
    } else {
      const delArray = currentFilters.filter((number) => number !== typeEvent);
      store.setTypeFilters(delArray);
    }
    store.setSorted(0);
  };

  return (
    <>
      <div className="flex gap-1 flex-wrap">
        <p
          onClick={() => useFilterEvents(1)}
          className={
            store.typesFilters.includes(1)
              ? store.styleFilter + " text-[#7777F7] border-[#7777F7]"
              : store.styleFilter + " text-white border-[#7777F7] bg-[#7777F7]"
          }
        >
          Музыка
        </p>
        <p
          onClick={() => useFilterEvents(2)}
          className={
            store.typesFilters.includes(2)
              ? store.styleFilter + " text-[#507077] border-[#507077]"
              : store.styleFilter + " text-white border-[#507077] bg-[#507077]"
          }
        >
          Выставки
        </p>
        <p
          onClick={() => useFilterEvents(3)}
          className={
            store.typesFilters.includes(3)
              ? store.styleFilter + " text-[#B74890] border-[#B74890]"
              : store.styleFilter + " text-white border-[#B74890] bg-[#B74890]"
          }
        >
          Праздники
        </p>
        <p
          onClick={() => useFilterEvents(4)}
          className={
            store.typesFilters.includes(4)
              ? store.styleFilter + " text-[#8CC63F] border-[#8CC63F]"
              : store.styleFilter + " text-white border-[#8CC63F] bg-[#8CC63F]"
          }
        >
          Дети
        </p>
        <p
          onClick={() => useFilterEvents(5)}
          className={
            store.typesFilters.includes(5)
              ? store.styleFilter + " text-[#FC5454] border-[#FC5454]"
              : store.styleFilter + " text-white border-[#FC5454] bg-[#FC5454]"
          }
        >
          Спорт
        </p>
        <p
          onClick={() => useFilterEvents(6)}
          className={
            store.typesFilters.includes(6)
              ? store.styleFilter + " text-[#80CCFF] border-[#80CCFF]"
              : store.styleFilter + " text-white border-[#80CCFF] bg-[#80CCFF]"
          }
        >
          Курсы
        </p>
        <p
          onClick={() => useFilterEvents(7)}
          className={
            store.typesFilters.includes(7)
              ? store.styleFilter + " text-[#58AAAB] border-[#58AAAB]"
              : store.styleFilter + " text-white border-[#58AAAB] bg-[#58AAAB]"
          }
        >
          Танцы
        </p>
        <p
          onClick={() => useFilterEvents(8)}
          className={
            store.typesFilters.includes(8)
              ? store.styleFilter + " text-[#FBB03B] border-[#FBB03B]"
              : store.styleFilter + " text-white border-[#FBB03B] bg-[#FBB03B]"
          }
        >
          Еда
        </p>
        <p
          onClick={() => useFilterEvents(9)}
          className={
            store.typesFilters.includes(9)
              ? store.styleFilter + " text-[#FF6B57] border-[#FF6B57]"
              : store.styleFilter + " text-white border-[#FF6B57] bg-[#FF6B57]"
          }
        >
          Игры
        </p>
        <p
          onClick={() => useFilterEvents(10)}
          className={
            store.typesFilters.includes(10)
              ? store.styleFilter + " text-[#7D6793] border-[#7D6793]"
              : store.styleFilter + " text-white border-[#7D6793] bg-[#7D6793]"
          }
        >
          Ярмарки
        </p>
        <p
          onClick={() => useFilterEvents(12)}
          className={
            store.typesFilters.includes(12)
              ? store.styleFilter + " text-[#2ECC71] border-[#2ECC71]"
              : store.styleFilter + " text-white border-[#2ECC71] bg-[#2ECC71]"
          }
        >
          Экскурсии
        </p>
        <p
          onClick={() => useFilterEvents(13)}
          className={
            store.typesFilters.includes(13)
              ? store.styleFilter + " text-[#157764] border-[#157764]"
              : store.styleFilter + " text-white border-[#157764] bg-[#157764]"
          }
        >
          Театр Кино
        </p>
        <p
          onClick={() => useFilterEvents(14)}
          className={
            store.typesFilters.includes(14)
              ? store.styleFilter + " text-[#FF978F] border-[#FF978F]"
              : store.styleFilter + " text-white border-[#FF978F] bg-[#FF978F]"
          }
        >
          Тренировки
        </p>
        <p
          onClick={() => useFilterEvents(15)}
          className={
            store.typesFilters.includes(15)
              ? store.styleFilter + " text-[#F458F9] border-[#F458F9]"
              : store.styleFilter + " text-white border-[#F458F9] bg-[#F458F9]"
          }
        >
          Вечеринки
        </p>
      </div>
    </>
  );
});

export default Type;
