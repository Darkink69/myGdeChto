import { observer } from "mobx-react-lite";
// import store from "../store/store";
import CardEvent from "./CardEvent";
import { useEffect, useState } from "react";

const AllEvents = observer(() => {
  const [events, setEvents] = useState<any>(null);

  // useEffect(() => {
  //   store.fetchJsonData();
  // }, []);

  const handleFetch = () => {
    fetch(
      "https://raw.githubusercontent.com/Darkink69/design_work/main/all_events_now.json"
    )
      .then((response) => response.json())
      .then((data) => setEvents(data.results))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      {/* <div>
        <h1>Все события</h1>
      </div> */}

      <div className="grid items-start sm:grid-cols-3 grid-cols-1 2xl:grid-cols-4 gap-4 pt-48">
        {events &&
          events.map((item: { objectId: number }) => {
            return <CardEvent data={item} key={item.objectId} />;
          })}
      </div>
    </>
  );
});

export default AllEvents;
