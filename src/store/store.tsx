import { makeAutoObservable } from "mobx";

class Store {
  cities = ["novosibirsk", "moscow", "tomsk", "chelyabinsk"];
  sourceCities = [
    "novosibirsk",
    "moscow_and_the_moscow_region",
    "tomsk",
    "chelyabinsk",
  ];
  titleCities = ["Новосибирск", "Москва", "Томск", "Озерск"];
  typesEvent = [
    "",
    "Музыка",
    "Выставки",
    "Праздники",
    "Дети",
    "Спорт",
    "Курсы",
    "Танцы",
    "Еда",
    "Игры",
    "Ярмарки",
    "",
    "Экскурсии",
    "Театр #Кино",
    "Тренировки",
    "Вечеринки",
  ];
  currentType = 0;
  currentCity = JSON.parse(localStorage.getItem("currentCity") || "0") || 0;
  currentTab = 0;
  allEvents = 0;
  removedEvents = [];
  favoriteEvents: any = [];
  dataFilter = 0;
  requestSearch = "";
  eventLat = 0.0;
  eventLong = 0.0;
  menuView = false;
  addEventView = false;

  x = "83.06831359863283";
  y = "54.93227079942556";
  // scale = "2256";
  scale = "288895";
  sourceCity = `https://gde-chto.ru/catalog/${
    this.sourceCities[this.currentCity]
  }#}`;
  // sourceCity = `https://gde-chto.ru/catalog/${
  //   this.sourceCities[this.currentCity]
  // }#&scale=${this.scale}&centerX=${this.x}&centerY=${this.y}`;

  constructor() {
    makeAutoObservable(this);
  }

  setMenuView(menuView: any) {
    this.menuView = menuView;
  }

  setEventView(addEventView: any) {
    this.addEventView = addEventView;
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

  setRequest(value: any) {
    this.requestSearch = value;
    // console.log(typeof value);
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
