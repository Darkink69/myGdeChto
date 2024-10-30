import store from "../store/store";
import { observer } from "mobx-react-lite";
// import { useEffect, useRef, useState } from "react";
import { useEffect, useState } from "react";

const Menu = observer(() => {
  const [os, setOs] = useState("");
  const getAddEvent = () => {
    store.setEventView(true);
    store.setMenuView(true);
    store.setCardsEventsView(false);
    store.setMapView(false);
  };

  // const [src, setSrc] = useState("");

  // let src = "";

  //
  // let access_token =
  //   "vk1.a.UieeP5DkJ4abyojVpozUqXtspyHnBs5xArMUFKQ-NOm8_JF4rqfeS8uNBo5n6f34flurk4e1YOZUD1roJiBMvIcwauP9l7rK3WBbEJKMsb9u3obMmVArUYWC6vz5_nuuc_6ZCTV3ZyLA6KThabhlLYoUMgJhrDBV618SwTZ_IfdiqB1w-wylp_EIiN2u8LyNUD5xhpfQAqgF-ZsFESIQZQ";
  // let owner_id = "-214478812"; // gdechtoacadem
  // let message = `Читающая суббота\nОсвобождайте утро субботы 26 октября и приходите в 11:00 в лофт "Книжный шкаф". Энциклопедия "Мы живем во дворце Минотавра" перенесет нас на остров Крит, где мы с вами займемся расшифровкой тайных посланий древних людей. Ждем детей и родителей!\nhttps://ngonb.ru/`;
  // let attachments =
  //   "https://gde-chto.ru/elitegis/rest/services/novosibirsk/sights/MapServer/102/3314/attachments/54340";

  // const xx = () => {
  //   fetch(
  //     `http://localho.st:5000/get_example?access_token=${access_token}&owner_id=${owner_id}&message=${message}&attachments=${attachments}&v=5.199`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
  // };

  const xx = () => {
    const currentBrowserCookieId = window.localStorage.getItem(
      "currentBrowserCookieId"
    );

    console.log(currentBrowserCookieId);

    fetch(
      `http://localho.st:5000/get_statistics?currentBrowserCookieId=${currentBrowserCookieId}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  // const os = navigator;

  // const userAgent = navigator.userAgent;
  // intent://path/#Intent;scheme=yourapp;package=com.yourapp.example;end

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
  // };
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

  useEffect(() => {
    const os = navigator.userAgent;
    if (os.includes("Android")) {
      setOs("Android");
    }
    if (os.includes("iPhone") || os.includes("iPad")) {
      setOs("iPhone");
    }
  }, []);

  return (
    <>
      <div
        className="flex items-center xl:gap-8 gap-2 flex-col sm:pt-40 pt-28 text-sm sm:text-2xl text-white font-bold sm:p-5 p-6"
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
          className="flex justify-center xl:text-xl text-xl w-[90%] md:w-[80%] font-normal bg_blue_grad text-white hover:text-sky-700 hover:border-white hover:bg-white rounded-lg border-white xl:p-4 p-2 cursor-pointer "
        >
          О проекте
        </div>

        <p className="flex justify-center xl:text-xl text-xl w-[90%] md:w-[80%] font-normal bg_blue_grad text-white hover:text-sky-700 hover:border-white hover:bg-white rounded-lg border-white xl:p-4 p-2 cursor-pointer ">
          <a href="https://gde-chto.ru/ru/resourses/news/main/" target="_blank">
            Блог
          </a>
        </p>
        <div className="flex justify-center xl:text-xl text-xl font-normal text-[#545454] xl:p-4 p-2  ">
          Скачать приложение
        </div>
        <div className="flex items-end flex-col">
          <a
            href="https://play.google.com/store/apps/details?id=ru.sibgeoclub.eventsonmap"
            target="_blank"
          >
            <img
              className={
                os === "Android" || os === "" ? "p-2 cursor-pointer" : "hidden"
              }
              src="https://mobilekarta.ru/media/2ijlvgwi/google.png"
              alt=""
            />
          </a>
          <a
            href="https://www.rustore.ru/catalog/app/ru.sibgeoclub.eventsonmap"
            target="_blank"
          >
            <img
              className={
                os === "Android" || os === "" ? "p-2 cursor-pointer" : "hidden"
              }
              src="https://mobilekarta.ru/media/2509/rustore.png"
              alt=""
            />
          </a>

          <a
            href="https://apps.apple.com/ru/app/%D0%B3%D0%B4%D0%B5%D1%87%D1%82%D0%BE/id1633000287"
            target="_blank"
          >
            <img
              className={
                os === "iPhone" || os === "" ? "p-2 cursor-pointer" : "hidden"
              }
              src="https://mobilekarta.ru/media/2512/appstore_ru.png"
              alt=""
            />
          </a>
        </div>
        <p onClick={() => xx()}>...</p>
      </div>
    </>
  );
});

export default Menu;
