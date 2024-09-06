// import { useEffect, useState } from "react";
import "./App.css";
import AllEvents from "./components/AllEvents";
import Header from "./components/Header";
// import AllMap from "./components/YMaps";

function App() {
  return (
    <>
      <Header />
      {/* <AllMap /> */}
      <div className="container mx-auto bg-slate-50 p-4">
        <AllEvents />
      </div>
    </>
  );
}

export default App;
