// import { useEffect, useState } from "react";
import store from "../store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const AddEvent = observer(() => {
  const coGis = () => {
    // let img =
    //   "https://sun4-19.userapi.com/s/v1/ig2/uSzLXYqlXGPwpQ2aqY20JTQIUksvSSrIhik-G0EmZ9TdwXgqmxB5vokxfkGAZ_eNAms-HjmNY1FtDVqMfdyyNTRc.jpg";
    // fetch(
    //   `https://gde-chto.ru/elitegis/rest/services/novosibirsk/sights/MapServer/exts/CompositeSoe/ApplyEdits?layer=102&f=json&adds=%5B%7B%22geometry%22%3A%7B%22type%22%3A%22point%22%2C%22x%22%3A9344732.455975939%2C%22y%22%3A7386568.665366298%2C%22spatialReference%22%3A%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D%7D%2C%22attributes%22%3A%7B%22name%22%3A%22%D0%A2%D0%95%D0%A1%D0%A2%22%2C%22type%22%3A1%2C%22place%22%3A%22%D0%BB%D1%80%D0%BE%D0%BF%D0%B0%D0%BE%D1%80%D0%B0%D1%80%D0%BE%D0%BF%22%2C%22date_from%22%3A1724778000000%2C%22date_to%22%3A1725037200000%2C%22starttime%22%3Anull%2C%22endtime%22%3Anull%2C%22entrance%22%3A0%2C%22description%22%3A%22%D1%88%D0%B3%D1%80%D1%8B%D0%B2%D0%B4%D1%88%D1%80%D0%B0%D0%B2%D0%B4%D1%88%D1%8B%D1%80%D0%B3%D0%B0%D1%88%D1%8B%D0%B2%D1%80%D1%88%D0%B3%D1%80%22%2C%22address%22%3A%22%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F%2C+21%22%2C%22site%22%3Anull%2C%22phone%22%3A%22%2B7(890)+593-32-64%22%2C%22note%22%3Anull%2C%22create_user%22%3Anull%2C%22create_date%22%3Anull%2C%22last_edited_user%22%3Anull%2C%22last_edited_date%22%3Anull%2C%22status%22%3A0%2C%22text_date%22%3Anull%2C%22social_network_vk%22%3Anull%2C%22social_network_telegram%22%3Anull%2C%22social_network_ya_dzen%22%3Anull%2C%22social_network_youtube%22%3Anull%2C%22text_time%22%3Anull%2C%22contact_data%22%3A%22%D1%80%D0%BE%D0%BF%D0%B0%D0%BE%D1%80%D0%BF%D0%B0%D0%BE%D1%80%D0%BF%D0%B0%D0%BE%D1%80%D0%BF+%D0%B0%D1%80%D0%BF%D0%B0+%D0%BE%D1%80%D0%BF%D0%B0+%D0%BB%D0%BF%D1%80+8+%22%2C%22geom_lat%22%3Anull%2C%22geom_long%22%3Anull%2C%22type_for_search%22%3Anull%2C%22social_network_whatsapp%22%3Anull%7D%2C%22attachments%22%3A%5B%7B%22fileName%22%3A%22image_2024_08_19T08_37_13_252Z.png%22%2C%22fileUrl%22%3A%22${img}%22%2C%22attributes%22%3A%7B%7D%7D%5D%7D%5D&updates=%5B%5D&deletes=%5B%5D&rollbackOnFailure=true&language=ru`
    // )
    //   // fetch(
    //   //   `https://gde-chto.ru/elitegis/rest/services/novosibirsk/sights/MapServer/exts/CompositeSoe/GetAttachments?layer=102&objectId=2174`
    //   // )
    //   .then((r) => r.json())
    //   .then((d) => console.log(d));
    console.log("Пытаемся добавить..");
  };

  const cancelAddEvent = () => {
    store.setEventView(false);
    console.log("Галя отмена!");
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="pt-28">
        <p>Добавляем мероприятие прямо сейчас</p>
      </div>

      <div onClick={() => cancelAddEvent()} className="cursor-pointer">
        Отмена
      </div>
      <p className="cursor-pointer" onClick={() => coGis()}>
        гет-запросик
      </p>
    </>
  );
});

export default AddEvent;
