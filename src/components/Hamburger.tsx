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

  // const [src, setSrc] = useState("");

  // let src = "";

  //
  let access_token =
    "vk1.a.UieeP5DkJ4abyojVpozUqXtspyHnBs5xArMUFKQ-NOm8_JF4rqfeS8uNBo5n6f34flurk4e1YOZUD1roJiBMvIcwauP9l7rK3WBbEJKMsb9u3obMmVArUYWC6vz5_nuuc_6ZCTV3ZyLA6KThabhlLYoUMgJhrDBV618SwTZ_IfdiqB1w-wylp_EIiN2u8LyNUD5xhpfQAqgF-ZsFESIQZQ";
  let owner_id = "-214478812"; // gdechtoacadem
  let message = `Читающая суббота\nОсвобождайте утро субботы 26 октября и приходите в 11:00 в лофт "Книжный шкаф". Энциклопедия "Мы живем во дворце Минотавра" перенесет нас на остров Крит, где мы с вами займемся расшифровкой тайных посланий древних людей. Ждем детей и родителей!\nhttps://ngonb.ru/`;
  let attachments =
    "https://gde-chto.ru/elitegis/rest/services/novosibirsk/sights/MapServer/102/3314/attachments/54340";

  const xx = () => {
    fetch(
      `https://api.vk.com/method/wall.post?access_token=${access_token}&owner_id=${owner_id}&message=${message}&attachments=${attachments}&v=5.199`
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    // const os = navigator;

    // const userAgent = navigator.userAgent;
    // console.log(os);
    // navigator.gpu.requestAdapter().then((r) => console.log(r));

    // console.log(navigator.language);

    // const displayMediaOptions = {
    //   video: {
    //     displaySurface: "browser",
    //   },
    //   audio: {
    //     suppressLocalAudioPlayback: false,
    //   },
    //   preferCurrentTab: false,
    //   selfBrowserSurface: "exclude",
    //   systemAudio: "include",
    //   surfaceSwitching: "include",
    //   monitorTypeSurfaces: "include",
    // };

    // async function startCapture(displayMediaOptions) {
    //   let captureStream;

    //   try {
    //     captureStream = await navigator.mediaDevices.getDisplayMedia(
    //       displayMediaOptions
    //     );
    //   } catch (err) {
    //     console.error(`Error: ${err}`);
    //   }
    //   return captureStream;
    // }

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(showPosition);
    // } else {
    //   console.log("Геолокация не поддерживается.");
    // }

    // function showPosition(position) {
    // var lat = position.coords.latitude;
    // var lon = position.coords.longitude;
    //   console.log(lat, lon);
    // }

    // button.addEventListener('click', findLocation)

    // if (!navigator.geolocation) {
    //   console.log("Ваш браузер не дружит с геолокацией...");
    // } else {
    //   navigator.geolocation.getCurrentPosition(success);
    // }

    // function success(position: { coords: { longitude: any; latitude: any } }) {
    //   const { longitude, latitude } = position.coords;
    //   store.setCoordEvent(latitude, longitude);
    //   console.log(latitude, longitude);

    //   setSrc(
    //     `https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}&amp;layer=mapnik`
    //   );
    // }

    // Если всё плохо, просто напишем об этом
    // function error() {
    //   status.textContent = 'Не получается определить вашу геолокацию :('
    // }
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
      <div
        className="flex items-center xl:gap-8 gap-2 flex-col sm:pt-40 pt-28 text-sm sm:text-2xl text-white font-bold sm:p-20 p-6"
        // onClick={(e) => console.log(e, e.pageX, e.pageY, "!!")}
        // onBlur={() => console.log("blur!")}
        // onTouchStart={(e) => console.log(e, "touch!")}
      >
        {/* <iframe src={src} width="500px" height="300px"></iframe> */}
        {/* <p>{latitude} {longitude}</p> */}
        {/* <input ref={inputEl} type="text" />
        <button onClick={() => onButtonClick()}>Фокус</button>
        <form onSubmit={handleSubmit}>
          <input className="rounded-lg" ref={inputRef} type="text" />
          <button type="submit">Отправить</button>
        </form> */}

        {/* <button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</button> */}
        {/* <video controls>
          <source
            src="https://vthumb67.bcvcdn.mp4?t=1728973525"
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
        {/* <p onClick={() => xx()}>...</p> */}
      </div>
    </>
  );
});

export default Menu;
