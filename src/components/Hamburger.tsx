import store from "../store/store";
import { observer } from "mobx-react-lite";
// import { useEffect, useRef, useState } from "react";
import { useEffect } from "react";

const Menu = observer(() => {
  const getAddEvent = () => {
    store.setEventView(true);
    store.setMenuView(true);
    store.setCardsEventsView(false);
  };

  // const [isPlaying, setIsPlaying] = useState(false);
  // const ref = useRef<any>(null);

  // function handleClick() {
  //   const nextIsPlaying = !isPlaying;
  //   setIsPlaying(nextIsPlaying);
  //   console.log(ref.current);
  //   if (nextIsPlaying) {
  //     ref.current.play();
  //   } else {
  //     ref.current.pause();
  //   }
  // }

  // const inputEl = useRef<any>(null);
  // const onButtonClick = () => {
  //   console.log(inputEl);
  //   inputEl.current.focus();
  // };

  // const inputRef = useRef<any>(null);

  // function handleSubmit(event: { preventDefault: () => void }) {
  //   event.preventDefault();
  //   console.log(inputRef.current.value);
  // }

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex items-center xl:gap-8 gap-2 flex-col sm:pt-40 pt-28 text-sm sm:text-2xl text-white font-bold sm:p-20 p-6">
        {/* <input ref={inputEl} type="text" />
        <button onClick={() => onButtonClick()}>Фокус</button>
        <form onSubmit={handleSubmit}>
          <input className="rounded-lg" ref={inputRef} type="text" />
          <button type="submit">Отправить</button>
        </form> */}

        {/* <button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</button>
        <video
          width="250"
          ref={ref}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />
        </video> */}
        <div
          onClick={() => getAddEvent()}
          className="transition ease-in-out delay-100 flex justify-center xl:text-3xl text-xl w-[90%] md:w-[28%] font-normal bg-emerald-500 text-white hover:text-sky-700 hover:border-white hover:bg-white rounded-lg border-white xl:p-4 p-2 pr-8 pl-8 cursor-pointer "
        >
          Добавить мероприятие
        </div>
        <div className="transition ease-in-out delay-100 flex justify-center xl:text-3xl text-xl w-[90%] md:w-[28%] font-normal bg-emerald-500 text-white hover:text-sky-700 hover:border-white hover:bg-white rounded-lg border-white xl:p-4 p-2 cursor-pointer ">
          Разместить объявление - ₽
        </div>

        <p className="transition ease-in-out delay-100 flex justify-center xl:text-3xl text-xl w-[90%] md:w-[28%] font-normal bg-emerald-500 text-white hover:text-sky-700 hover:border-white hover:bg-white rounded-lg border-white xl:p-4 p-2 cursor-pointer ">
          <a href="https://gde-chto.ru/ru/resourses/news/main/" target="_blank">
            Блог
          </a>
        </p>

        {/* <div className="grid items-start sm:grid-cols-3 grid-cols-1 gap-4 pt-4">
          <div className="w-[200px] ">
            <a
              href="https://gde-chto.ru/ru/resourses/news/bloggdechto/news/post-4/"
              target="_blank"
            >
              <div className="hover:drop-shadow-lg cursor-pointer bg-cover w-[200px] h-[130px] rounded-xl bg-[url('https://gde-chto.ru/media/bjnbca2x/artboard-30.png')]"></div>
            </a>
            <p className="pt-2 text-sm text-center font-normal">
              Ночь музеев - 2024 в Новосибирске
            </p>
          </div>

          <div className="w-[200px] ">
            <a
              href="https://gde-chto.ru/ru/resourses/news/bloggdechto/news/post-3/"
              target="_blank"
            >
              <div className="hover:drop-shadow-lg cursor-pointer bg-cover w-[200px] h-[130px] rounded-xl bg-[url('https://gde-chto.ru/media/it4pswjk/ek2o690vkqe.jpg')]"></div>
            </a>
            <p className="pt-2 text-sm text-center font-normal">
              Новосибирск событийный: как найти или создать мероприятие на карте
            </p>
          </div>

          <div className="w-[200px] ">
            <a
              href="https://gde-chto.ru/ru/resourses/news/bloggdechto/news/post-2/"
              target="_blank"
            >
              <div className="hover:drop-shadow-lg cursor-pointer bg-cover w-[200px] h-[130px] rounded-xl bg-[url('https://gde-chto.ru/media/5m3cbp4y/bmsn750hltw.jpg')]"></div>
            </a>
            <p className="pt-2 text-sm text-center font-normal">
              Интерактивная карта мероприятий «ГдеЧто»
            </p>
          </div>
        </div> */}
        <p
          onClick={() => store.setLayerIds(105)}
          className="fixed bottom-10 right-28 text-gray-700 text-sm"
        >
          Архив
        </p>
        <p
          onClick={() => store.setLayerIds(20100)}
          className="fixed bottom-10 right-10 text-gray-700 text-sm"
        >
          All Ads
        </p>
      </div>
    </>
  );
});

export default Menu;
