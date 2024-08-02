import { makeAutoObservable } from "mobx";

class Store {
  cities = ["novosibirsk", "moscow", "tomsk", "chelyabinsk"];
  titleCities = ["Новосибирск", "Москва", "Томск", "Озерск"];
  currentCity = JSON.parse(localStorage.getItem("currentCity") || "0") || 0;
  currentTab = 0;
  allEvents = 0;
  removedEvents = [];
  favoriteEvents: any = [];
  dataFilter = 0;
  requestSearch = "";
  eventLat = 0.0;
  eventLong = 0.0;

  constructor() {
    makeAutoObservable(this);
  }

  setCurentCity(currentCity: any) {
    this.currentCity = currentCity;
    localStorage.setItem("currentCity", this.currentCity);
  }

  setСurrentTab(currentTab: number) {
    this.currentTab = currentTab;
  }

  setAllEvents(events: number) {
    this.allEvents = events;
  }

  setCoordEvent(eventLat: any, eventLong: any) {
    this.eventLat = eventLat;
    this.eventLong = eventLong;
  }

  setRequest(value: string) {
    this.requestSearch = value;
    // setTimeout(() => {
    //   console.log(value, "store!");
    // }, 2000);
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
