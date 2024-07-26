import { makeAutoObservable } from "mobx";

class Store {
  // jsonData = {};
  // isLoaded = false;
  removedEvents = [];
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

  checkRemovedEvents() {
    this.removedEvents =
      JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];
  }

  setDataFilter() {
    console.log(this.dataFilter, "store!!");
  }
}

export default new Store();
