// import { useEffect, useState } from "react";
import store from "../store/store";
import { observer } from "mobx-react-lite";
// import { useEffect, useRef } from "react";

const AllMap = observer(() => {
  // const [zoom, setZoom] = useState(10);
  let sourceCity = `https://gde-chto.ru/${
    store.sourceCities[store.currentCity]
  }#`;
  let w = "1500";
  // let sourceCity = store.sourceCity;

  // useEffect(() => {
  //   // sourceCity =
  //   //   `https://gde-chto.ru/${store.sourceCities[store.currentCity]}#` +
  //   //   `&scale=${store.scale}&centerX=${store.x}&centerY=${store.y}`;
  //   sourceCity = store.sourceCity;
  // }, [zoom]);

  return (
    <>
      <div className="pt-28">
        <iframe src={sourceCity} width={w} height="600"></iframe>
      </div>
    </>
  );
});

export default AllMap;
