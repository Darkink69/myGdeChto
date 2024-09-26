import { useEffect, useState } from "react";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const AllMap = observer(() => {
  const [h, setH] = useState(600);

  // const setMapSize = () => {
  //   setH(800);
  // };

  // useEffect(() => {
  //   store.sourceCity = `https://gde-chto.ru/catalog/novosibirsk#id=0_102_3678&scale=2256&centerX=82.82839536666872&centerY=54.987864168094596`;
  // }, [store.x, store.y, store.scale]);

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
      }?mode=iframe&CurrentBrowserCookieId=${window.localStorage.getItem(
        "currentBrowserCookieId"
      )}&CurrentUserCookieId=${window.localStorage.getItem(
        "currentUserCookieId"
      )}#id=0_${store.layerIds}_${store.currentObjectId}&scale=${
        store.scale
      }&centerX=${store.x}&centerY=${store.y}&layers=0`
    );
  }, [store.x, store.y, store.scale]);

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
        {/* <p>{window.innerWidth}</p> */}
        {/* <p>{window.innerHeight}</p> */}
        <iframe src={store.sourceCity} width="100%" height={h}></iframe>
      </div>
    </>
  );
});

export default AllMap;
