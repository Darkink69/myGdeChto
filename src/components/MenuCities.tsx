import store from "../store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const MenuCities = observer(() => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="transition-all grid grid-cols-2 sm:grid-cols-4 gap-2 sm:pt-32 pt-28 text-md sm:text-2xl text-[#545454] font-bold sm:p-20 p-10">
        <p
          className="cursor-pointer hover:text-sky-300"
          onClick={() => {
            store.setSpinView("");
            store.setCurentCity(1);
          }}
        >
          Москва
        </p>
        <p className="opacity-40">Санкт-Петербург</p>
        <p
          className="cursor-pointer hover:text-sky-300"
          onClick={() => {
            store.setSpinView("");
            store.setCurentCity(0);
          }}
        >
          Новосибирск
        </p>
        <p
          className="cursor-pointer hover:text-sky-300"
          onClick={() => {
            store.setSpinView("");
            store.setCurentCity(2);
          }}
        >
          Томск
        </p>
        <p className="opacity-40">Екатеринбург</p>
        <p className="opacity-40">Казань</p>
        <p className="opacity-40">Красноярск</p>
        <p className="opacity-40">Нижний Новгород</p>
        <p
          className="cursor-pointer hover:text-sky-300"
          onClick={() => {
            store.setSpinView("");
            store.setCurentCity(3);
          }}
        >
          Челябинск
        </p>
        <p className="opacity-40">Уфа</p>
        <p className="opacity-40">Самара</p>
        <p className="opacity-40">Ростов-на-Дону</p>
        <p className="opacity-40">Краснодар</p>
        <p className="opacity-40">Омск</p>
        <p className="opacity-40">Воронеж</p>
        <p className="opacity-40">Пермь</p>
        <p className="opacity-40">Волгоград</p>
      </div>
    </>
  );
});

export default MenuCities;
