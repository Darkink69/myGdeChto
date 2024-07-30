import { makeAutoObservable } from "mobx";

class Store {
  allEvents = 0;
  removedEvents = [];
  favoriteEvents: any = [];
  dataFilter: any;

  constructor() {
    makeAutoObservable(this);
  }

  // async fetchJsonData() {
  //   fetch(
  //     `https://raw.githubusercontent.com/Darkink69/design_work/main/all_events_now.json`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.jsonData = data;
  //       this.isLoaded = true;
  //     });
  // }

  setAllEvents(events: number) {
    this.allEvents = events;
  }

  checkEvents() {
    this.removedEvents =
      JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];
    this.favoriteEvents =
      JSON.parse(localStorage.getItem("favoriteEvents") || "[]") || [];
  }

  setDataFilter() {
    console.log(this.dataFilter, "store!!");
  }
}

export default new Store();
