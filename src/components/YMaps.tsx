import { useEffect, useState } from "react";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const AllMap = observer(() => {
  const [h, setH] = useState(600);

  useEffect(() => {
    if (window.localStorage.getItem("currentBrowserCookieId") == null)
      window.localStorage.setItem(
        "currentBrowserCookieId",
        self.crypto.randomUUID()
      );
    if (window.localStorage.getItem("currentUserCookieId") == null)
      window.localStorage.setItem(
        "currentUserCookieId",
        self.crypto.randomUUID()
      );
    // store.setSourceCity(
    //   `https://gde-chto.ru/catalog/novosibirsk_2?mode=iframe`
    // );
    store.setSourceCity(
      `https://gde-chto.ru/catalog/${
        store.sourceCities[store.currentCity]
      }?mode=iframe#id=0_${store.layerIds}_${store.currentObjectId}&scale=${
        store.scale
      }&centerX=${store.defaultCoords[store.currentCity].x}&centerY=${
        store.defaultCoords[store.currentCity].y
      }&layers=0`
    );
  }, [
    store.defaultCoords[store.currentCity].x,
    store.defaultCoords[store.currentCity].y,
    store.scale,
  ]);

  useEffect(() => {
    if (window.innerWidth > 1900) {
      setH(window.innerHeight * 0.8);
    } else {
      setH(window.innerHeight * 0.9);
    }
  }, []);

  return (
    <>
      <div className="container sm:pt-11 pt-11 absolute -ml-4">
        {/* <input onMouseMove="this.value=event.clientX+':'+event.clientY" value="Наведи на меня мышь"> */}
        {/* <p>{window.innerWidth}</p>
        <p>{window.innerHeight}</p>
        <p>{h}</p> */}
        <iframe
          // style={{ overflow: "scroll" }}
          src={store.sourceCity}
          width="100%"
          height={h}
          // onLoad={() => setLoadingIframe()}
          // onMouseOver={(e) => console.log(e, e.pageX, e.pageY, "!!")}
          // onMouseOut={(e) => console.log(e.pageX, e.pageY, "OUT")}
          // onMouseMove={(e) => console.log(e.pageX, e.pageY, "MM")}
        ></iframe>
      </div>
    </>
  );
});

export default AllMap;
