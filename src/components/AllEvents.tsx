import { observer } from "mobx-react-lite";
import store from "../store/store";
import CardEvent from "./CardEvent";
import { useEffect, useState } from "react";

const AllEvents = observer(() => {
  const [events, setEvents] = useState<any>(null);
  const [shownEvents, setshownEvents] = useState<any>(null);

  const jsonFetch = () => {
    fetch(
      "https://raw.githubusercontent.com/Darkink69/design_work/main/all_events_now.json"
    )
      .then((response) => response.json())
      .then((data) => setEvents(data.results))
      .catch((error) => console.error(error));
  };

  const sortEvents = () => {
    let removedEvents =
      JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];

    let shownEvents: { objectId: string | Number | null }[] = [];
    events?.map((item: { objectId: string | Number | null }) => {
      if (!removedEvents.includes(item.objectId)) {
        // console.log(item);
        shownEvents.push(item);
      }
    });
    setshownEvents(shownEvents);
  };

  // const sortByDate = () => {
  //   let shownEvents: { objectId: string | Number | null }[] = [];
  //   shownEvents.map((item: any) => {
  //     const day = new Date(item.attributes.date_to).getDate();
  //     if (day === store.dataFilter) {
  //       console.log(day, "!!!!!!!", store.dataFilter);
  //       shownEvents.push(item);
  //     }
  //   });
  //   setshownEvents(shownEvents);
  // };

  useEffect(() => {
    jsonFetch();
  }, []);

  useEffect(() => {
    sortEvents();
  }, [events, store.removedEvents, store.dataFilter]);

  return (
    <>
      <div className="pt-32">
        <h1>Все события</h1>
      </div>

      <div className="grid items-start sm:grid-cols-3 grid-cols-1 2xl:grid-cols-4 gap-4 pt-8">
        {shownEvents &&
          shownEvents.map((item: { objectId: number }) => {
            return <CardEvent data={item} key={item.objectId} />;
          })}
      </div>
    </>
  );
});

export default AllEvents;
