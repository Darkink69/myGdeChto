// import { useEffect, useState } from "react";
import store from "../store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const AllMap = observer(() => {
  // const [w, setW] = useState("1500");
  let w =
    window.innerWidth > 1536
      ? window.innerWidth - 420
      : window.innerWidth - 150;
  let h = "600";

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

  // useEffect(() => {
  //   setW("500");
  // }, [window.innerWidth]);

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
