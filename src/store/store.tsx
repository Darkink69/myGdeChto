import { makeAutoObservable } from "mobx";

class Store {
  cities = ["novosibirsk", "tomsk", "chelyabinsk"];
  titleCities = ["Новосибирск", "Томск", "Озерск"];
  currentCity = JSON.parse(localStorage.getItem("currentCity") || "0") || 0;
  allEvents = 0;
  removedEvents = [];
  favoriteEvents: any = [];
  dataFilter = 0;
  eventLat = 0.0;
  eventLong = 0.0;

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

  setCurentCity(currentCity: any) {
    this.currentCity = currentCity;
    localStorage.setItem("currentCity", this.currentCity);
  }

  setAllEvents(events: number) {
    this.allEvents = events;
  }

  setCoordEvent(eventLat: any, eventLong: any) {
    this.eventLat = eventLat;
    this.eventLong = eventLong;
  }

  checkEvents() {
    this.removedEvents =
      JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];
    this.favoriteEvents =
      JSON.parse(localStorage.getItem("favoriteEvents") || "[]") || [];
  }

  setDataFilter(dataFilter: number) {
    this.dataFilter = dataFilter;
  }
}

export default new Store();
