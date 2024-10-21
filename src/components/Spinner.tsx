import { observer } from "mobx-react-lite";
import { Spin } from "antd";
import { useEffect } from "react";
import store from "../store/store";
// import { useState, useEffect } from "react";

const Spinner = observer(() => {
  //   const [spinView, setSpinView] = useState("");

  useEffect(() => {
    setTimeout(() => {
      store.setSpinView("hidden");
    }, 1000);
  }, [store.spinView]);
  return (
    <>
      <div
        className={
          store.spinView +
          " fixed container top-1/3 left-1/2 -ml-2 mx-auto z-50"
        }
      >
        <Spin size="large" />
      </div>
    </>
  );
});

export default Spinner;
