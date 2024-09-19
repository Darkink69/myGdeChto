import { useEffect, useState } from "react";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const AllMap = observer(() => {
  const [h, setH] = useState(600);

  const setMapSize = () => {
    setH(800);
  };

  // useEffect(() => {
  //   store.sourceCity = `https://cogisdemo.dataeast.com/elitegis/rest/services/common_osmde/ru_basemap/MapServer#`;
  // }, []);
  useEffect(() => {
    store.sourceCity =
      `https://gde-chto.ru/catalog/${store.sourceCities[store.currentCity]}#` +
      `id=0_${store.layerIds}_${store.currentObjectId}&scale=${store.scale}&centerX=${store.x}&centerY=${store.y}&layers=0`;
  }, [store.x, store.y]);

  // https://gde-chto.ru/catalog/novosibirsk#id=0_102_1455&scale=9028&centerX=82.82839536666872&centerY=54.987864168094596&layers=0&hash=id=0_102_1500&scale=144448&centerX=83.06854250840846&centerY=54.932205039962355&layers=0
  // https://gde-chto.ru/catalog/novosibirsk#id=0_102_4166&scale=9028&centerX=82.92566299438478&centerY=54.990166322244576&layers=0&hash=id=0_102_3137&scale=9028&centerX=82.82839536666872&centerY=54.987864168094596&layers=0&hash=id=0_102_964&scale=9028&centerX=83.10086488723756&centerY=54.84179600630816&layers=0&hash=id=0_102_1500

  useEffect(() => {
    setMapSize();
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
