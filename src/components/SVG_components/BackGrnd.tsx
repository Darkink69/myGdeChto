import { observer } from "mobx-react-lite";
// import store from "../../store/store";
// import ArrowUp from "./ArrowUp";
// import ArrowDown from "./ArrowDown";

const BackGrnd = observer(() => {
  return (
    <>
      {/* {store.mapView ? (
        <div
          className="absolute z-10"
          onClick={() => store.setMapView(store.mapView ? false : true)}
        >
          <ArrowUp />
        </div>
      ) : (
        <div
          className="absolute z-10"
          onClick={() => store.setMapView(store.mapView ? false : true)}
        >
          <ArrowDown />
        </div>
      )} */}
      {/* <div
        className={
          store.mapView
            ? "fixed -z-10 container mx-auto sm:h-[20%] h-[10%] rounded-3xl -bottom-10 -ml-4 bg-gray-50 drop-shadow-lg opacity-95"
            : "fixed -z-10 h-[84%] container mx-auto rounded-3xl -bottom-10 -ml-4 bg-gray-50 drop-shadow-lg opacity-95"
        }
      ></div> */}
      {/* <div
        onClick={() => store.setMapView(store.mapView ? false : true)}
        className={
          store.mapView
            ? ""
            : "cursor-pointer -z-10 opacity-0 fixed container mx-auto h-[100%] rounded-3xl -bottom-10 -ml-4 bg-gray-50"
        }
      ></div> */}
    </>
  );
});

export default BackGrnd;
