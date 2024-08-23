// import { useEffect, useState } from "react";
import "./App.css";
import AllEvents from "./components/AllEvents";
import Header from "./components/Header";

function App() {
  // const [img, setImg] = useState(null);
  // const getImg = () => {
  //   fetch(
  //     `https://gde-chto.ru/elitegis/rest/services/novosibirsk/sights/MapServer/exts/CompositeSoe/GetAttachments?layer=102&objectId=1931`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setImg(data.attachmentInfos[0].id))
  //     .catch((error) => console.error(error));
  // };

  // useEffect(() => {
  //   getImg();
  // }, []);

  return (
    <>
      {/* <img
        src={`https://gde-chto.ru/elitegis/rest/services/novosibirsk/sights/MapServer/102/1931/attachments/${img}`}
        alt=""
      /> */}
      <Header />
      <div className="container mx-auto bg-slate-50 p-4">
        <AllEvents />
      </div>
    </>
  );
}

export default App;
