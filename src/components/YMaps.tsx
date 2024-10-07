import { useEffect, useState } from "react";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const AllMap = observer(() => {
  const [h, setH] = useState(600);

  // const setMapSize = () => {
  //   setH(800);
  // };
  // const setLoadingIframe = () => {
  //   console.log("load!");
  // };

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
    store.setSourceCity(
      `https://gde-chto.ru/catalog/${
        store.sourceCities[store.currentCity]
      }#id=0_${store.layerIds}_${store.currentObjectId}&scale=${
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
    if (window.innerWidth > 2000) {
      setH(1000);
    } else {
      setH(800);
    }
    // setMapSize();
  }, []);

  return (
    <>
      <div className="container sm:pt-20 pt-10 fixed -ml-4">
        {/* <input onMouseMove="this.value=event.clientX+':'+event.clientY" value="Наведи на меня мышь"> */}
        {/* <p>{window.innerWidth}</p> */}
        {/* <p>{window.innerHeight}</p> */}
        {/* <canvas width="300" height="300"></canvas> */}
        <iframe
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
