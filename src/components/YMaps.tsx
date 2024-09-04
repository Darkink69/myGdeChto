import { useEffect, useState } from "react";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const AllMap = observer(() => {
  const [h, setH] = useState(600);

  const setMapSize = () => {
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
        <iframe src={store.sourceCity} width="100%" height={h}></iframe>
      </div>
    </>
  );
});

export default AllMap;
