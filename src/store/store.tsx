import { makeAutoObservable } from "mobx";

class Store {
  jsonData = {};
  isLoaded = false;
  constructor() {
    makeAutoObservable(this);
  }

  async fetchJsonData() {
    fetch(
      `https://raw.githubusercontent.com/Darkink69/design_work/main/all_events_now.json`
    )
      .then((response) => response.json())
      .then((data) => {
        this.jsonData = data;
        this.isLoaded = true;
      });
  }
}

export default new Store();
