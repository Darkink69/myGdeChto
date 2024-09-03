// import { useEffect, useState } from "react";
import "./App.css";
import AllEvents from "./components/AllEvents";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="container mx-auto bg-slate-50 p-4">
        <AllEvents />
      </div>
    </>
  );
}

export default App;
