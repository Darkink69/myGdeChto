import { useEffect, useState } from "react";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const AllMap = observer(() => {
  const [w, setW] = useState(1500);
  const [h, setH] = useState(600);

  const setMapSize = () => {
    let wSize = 1500;
    if (window.innerWidth < 640) {
      wSize = window.innerWidth - 48;
    } else if (window.innerWidth > 640 && window.innerWidth < 768) {
      wSize = 640 - 32;
    } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
      wSize = 768 - 32;
    } else if (window.innerWidth > 1024 && window.innerWidth < 1280) {
      wSize = 1024 - 32;
    } else if (window.innerWidth > 1280 && window.innerWidth < 1536) {
      wSize = 1280 - 32;
    } else {
      wSize = 1500;
    }

    setW(wSize);
    setH(600);
  };

  useEffect(() => {
    store.sourceCity =
      `https://gde-chto.ru/${store.sourceCities[store.currentCity]}#` +
      `&scale=${store.scale}&centerX=${store.x}&centerY=${store.y}`;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [store.x, store.y]);

  useEffect(() => {
    setMapSize();
  }, []);

  return (
    <>
      <div className="pt-28">
        {/* <p>{window.innerWidth}</p> */}
        <iframe src={store.sourceCity} width={w} height={h}></iframe>
      </div>
    </>
  );
});

export default AllMap;
