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
  typesAds = ["", "Дети", "Образование", "Красота", "Спорт", "Развлечения"];
  currentType = 0;
  currentCity = JSON.parse(localStorage.getItem("currentCity") || "0") || 0;
  layerIds = "102%2C201";
  currentTab = 0;
  allEvents = 0;
  allAds = 0;
  removedEvents = [];
  favoriteEvents: any = [];
  dataFilter = 0;
  requestSearch = "";
  eventLat = 0.0;
  eventLong = 0.0;
  menuView = false;
  mapView = true;
  addEventView = false;
  cardsEventsView = true;
  underlineTabStyle =
    " underline decoration-4 underline-offset-8 decoration-sky-500";

  styleFilter =
    " cursor-pointer hover:scale-95 pr-4 pl-4 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-gray-200 border-2";
  styleColor = "border-gray-300 border-2";
  styleDateEl =
    "relative inline-block font-bold cursor-pointer before:block before:absolute before:-inset-1 ";

  x = "83.06831359863283";
  y = "54.93227079942556";
  // scale = "2256";
  scale = "288895";
  currentObjectId = 0;
  sourceCity = `https://gde-chto.ru/catalog/${
    this.sourceCities[this.currentCity]
  }#}`;
  // sourceCity = `https://gde-chto.ru/catalog/${
  //   this.sourceCities[this.currentCity]
  // }#&scale=${this.scale}&centerX=${this.x}&centerY=${this.y}`;

  constructor() {
    makeAutoObservable(this);
  }

  setData(allEvents: number, allAds: number) {
    this.allEvents = allEvents;
    this.allAds = allAds;
  }

  setCoords(x: string, y: string, scale: string) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    console.log(this.scale);
    console.log(this.x);
    console.log(this.y);
  }

  // setLayerIds(layerIds: number) {
  //   this.layerIds = layerIds;
  //   console.log(layerIds);
  // }

  setCurrentObjectId(objectId: number) {
    this.currentObjectId = objectId;
  }

  setMapView(mapView: boolean) {
    this.mapView = mapView;
  }

  setCardsEventsView(cardsEventsView: any) {
    this.cardsEventsView = cardsEventsView;
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
    // this.removedEvents =
    //   JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];
    this.favoriteEvents =
      JSON.parse(localStorage.getItem("favoriteEvents") || "[]") || [];
  }

  setDataFilter(dataFilter: number) {
    this.dataFilter = dataFilter;
  }
}

export default new Store();
