// import store from "../store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const Menu = observer(() => {
  // const coGis = () => {
  //   fetch(
  //     `https://gde-chto.dataeast.com/elitegis/rest/services/novosibirsk/sights_test/MapServer/102/1931/attachments/`
  //   )
  //     .then((r) => r.json())
  //     .then((d) => console.log(d));
  // };

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex items-center flex-col pt-32 text-sm sm:text-2xl text-white font-bold p-20">
        <p className="cursor-pointer">Разместить мероприятие</p>
        <p className="cursor-pointer">Разместить объявление</p>
        <p className="cursor-pointer">Блог</p>
        {/* <p className="cursor-pointer" onClick={() => coGis()}>
          гет-запросик
        </p> */}
      </div>
    </>
  );
});

export default Menu;
