// import { useEffect, useState } from "react";
import store from "../store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const AddEvent = observer(() => {
  // const coGis = () => {
  //   // let img =
  //   //   "https://sun4-19.userapi.com/s/v1/ig2/uSzLXYqlXGPwpQ2aqY20JTQIUksvSSrIhik-G0EmZ9TdwXgqmxB5vokxfkGAZ_eNAms-HjmNY1FtDVqMfdyyNTRc.jpg";
  //   // fetch(
  //   //   `https://gde-chto.ru/elitegis/rest/services/novosibirsk/sights/MapServer/exts/CompositeSoe/ApplyEdits?layer=102&f=json&adds=%5B%7B%22geometry%22%3A%7B%22type%22%3A%22point%22%2C%22x%22%3A9344732.455975939%2C%22y%22%3A7386568.665366298%2C%22spatialReference%22%3A%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D%7D%2C%22attributes%22%3A%7B%22name%22%3A%22%D0%A2%D0%95%D0%A1%D0%A2%22%2C%22type%22%3A1%2C%22place%22%3A%22%D0%BB%D1%80%D0%BE%D0%BF%D0%B0%D0%BE%D1%80%D0%B0%D1%80%D0%BE%D0%BF%22%2C%22date_from%22%3A1724778000000%2C%22date_to%22%3A1725037200000%2C%22starttime%22%3Anull%2C%22endtime%22%3Anull%2C%22entrance%22%3A0%2C%22description%22%3A%22%D1%88%D0%B3%D1%80%D1%8B%D0%B2%D0%B4%D1%88%D1%80%D0%B0%D0%B2%D0%B4%D1%88%D1%8B%D1%80%D0%B3%D0%B0%D1%88%D1%8B%D0%B2%D1%80%D1%88%D0%B3%D1%80%22%2C%22address%22%3A%22%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F%2C+21%22%2C%22site%22%3Anull%2C%22phone%22%3A%22%2B7(890)+593-32-64%22%2C%22note%22%3Anull%2C%22create_user%22%3Anull%2C%22create_date%22%3Anull%2C%22last_edited_user%22%3Anull%2C%22last_edited_date%22%3Anull%2C%22status%22%3A0%2C%22text_date%22%3Anull%2C%22social_network_vk%22%3Anull%2C%22social_network_telegram%22%3Anull%2C%22social_network_ya_dzen%22%3Anull%2C%22social_network_youtube%22%3Anull%2C%22text_time%22%3Anull%2C%22contact_data%22%3A%22%D1%80%D0%BE%D0%BF%D0%B0%D0%BE%D1%80%D0%BF%D0%B0%D0%BE%D1%80%D0%BF%D0%B0%D0%BE%D1%80%D0%BF+%D0%B0%D1%80%D0%BF%D0%B0+%D0%BE%D1%80%D0%BF%D0%B0+%D0%BB%D0%BF%D1%80+8+%22%2C%22geom_lat%22%3Anull%2C%22geom_long%22%3Anull%2C%22type_for_search%22%3Anull%2C%22social_network_whatsapp%22%3Anull%7D%2C%22attachments%22%3A%5B%7B%22fileName%22%3A%22image_2024_08_19T08_37_13_252Z.png%22%2C%22fileUrl%22%3A%22${img}%22%2C%22attributes%22%3A%7B%7D%7D%5D%7D%5D&updates=%5B%5D&deletes=%5B%5D&rollbackOnFailure=true&language=ru`
  //   // )
  //   //   // fetch(
  //   //   //   `https://gde-chto.ru/elitegis/rest/services/novosibirsk/sights/MapServer/exts/CompositeSoe/GetAttachments?layer=102&objectId=2174`
  //   //   // )
  //   //   .then((r) => r.json())
  //   //   .then((d) => console.log(d));
  //   console.log("Пытаемся добавить..");
  // };

  const cancelAddEvent = () => {
    store.setEventView(false);
    store.setCardsEventsView(true);
  };

  useEffect(() => {}, []);

  return (
    <>
      <span className="relative flex h-3 w-3 scale-150">
        <span className="animate-ping fixed -top-[400px] -right-[970px] w-[50px] h-[50px] inline-flex rounded-full bg-red-400 opacity-75"></span>
      </span>
      <div className="pt-[600px]">
        <p className="text-3xl font-bold text-sky-700">
          Как добавить мероприятие прямо сейчас?
        </p>
        <img
          src="https://gde-chto.ru/media/gijdomyq/main-image-v2.png"
          alt=""
        />
        <h1 className="text-3xl">Планирование досуга</h1>
        <p>
          Планирование досуга — это очень важная часть нашей жизни. Зачастую мы
          тратим слишком много времени на поиск подходящих мероприятий и все
          равно упускаем то, что могло бы нас заинтересовать, потому что громкие
          анонсы скрывают от нас то, что происходит по соседству. Интерактивная
          карта «ГдеЧто» поможет устроить детям праздник, найдет, куда
          отправиться большой компании, и предоставит актуальную информацию тем,
          кто хочет с пользой провести свободное время.
        </p>
        <img src="https://gde-chto.ru/media/fzrii3fz/group-48.png" alt="" />
        <br />
        <h1 className="text-3xl">Создавайте свои мероприятия</h1>
        <p>
          Наша платформа – это удобный и наглядный инструмент, который
          объединяет активных жителей и культурные и спортивные площадки города.
          Соберите родителей с детьми на мастер-класс. Расскажите о своем
          концерте, даже если вы уличный артист. Позаботьтесь о том, чтобы люди
          узнали о мероприятиях вашего заведения. «ГдеЧто» – это возможность
          быстро и бесплатно разместить свой анонс.
        </p>
        <img src="https://gde-chto.ru/media/mbndsrj0/group-640.png" alt="" />
        <br />
      </div>

      <div
        onClick={() => cancelAddEvent()}
        className="transition ease-in-out delay-100 block mr-4 w-[280px] left-0 text-xl text-white hover:bg-emerald-500 rounded-lg border-sky-700 bg-sky-700 p-2 pr-8 pl-8 cursor-pointer"
      >
        Назад к мероприятиям
      </div>
      {/* <p className="cursor-pointer" onClick={() => coGis()}>
        гет-запросик
      </p> */}
    </>
  );
});

export default AddEvent;