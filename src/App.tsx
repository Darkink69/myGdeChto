import "./App.css";
import AllEvents from "./components/AllEvents";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <AllEvents />
      </div>
    </>
  );
}

export default App;
