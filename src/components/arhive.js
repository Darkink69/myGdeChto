{/* <p
    className={
    store.currentTab == 1
        ? underlineTabStyle +
        " cursor-pointer text-slate-600 font-bold "
        : " cursor-pointer text-slate-600 font-bold"
    }
    onClick={() => {
    store.setСurrentTab(1);
    setIsloaded(false);
    setShownCards(null);
    setShownCards(allAds);
    setIsloaded(true);

    // console.log("null!!!");

    store.setMapView(false);
    }}
>
    Все объявления
</p>
<span className="-left-4 p-2 pt-1 pb-1 rounded-full inline-block relative text-xs font-bold text-white bg-slate-400 cursor-pointer">
    {store.allAds}
</span> */}


  // const getImg = (layerId: Number | null, objectId: Number | null) => {
  //   // let img: any;
  //   // events.forEach((item: any) => console.log(item));
  //   // events?.map((item: { layerId: number; objectId: number }) => {
  //   // console.log(item.objectId);
  //   fetch(
  //     `https://gde-chto.ru/elitegis/rest/services/${
  //       store.cities[store.currentCity]
  //     }/sights/MapServer/exts/CompositeSoe/GetAttachments?layer=${layerId}&objectId=${objectId}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data.attachmentInfos[0].id, "IMG!!!");
  //       return data.attachmentInfos[0].id;
  //     })
  //     .catch((error) => console.error(error));
  //   // });
  // };


{/* <p className="pr-4 font-bold text-slate-600">Прошедшие</p> */}


{/* <p
    className={
    store.currentTab == 1
        ? underlineTabStyle +
        " font-bold text-slate-600 cursor-pointer"
        : " font-bold text-slate-600 cursor-pointer"
    }
    // onClick={() => sortSoonEvents()}
>
    Скоро!
</p> */}

{/* <p
    className="font-bold text-slate-600 cursor-pointer"
    // onClick={() => shuffleEvents()}
>
    Перемешать
</p> */}




  // const removeEvent = () => {
  //   console.log("Remove!", data.objectId);
  //   let removedEvents =
  //     JSON.parse(localStorage.getItem("removedEvents") || "[]") || [];
  //   removedEvents.push(data.objectId);
  //   localStorage.setItem("removedEvents", JSON.stringify(removedEvents));
  //   store.checkEvents();
  // };

{/* <div className="relative cursor-pointer" onClick={() => removeEvent()}>
<svg
className="absolute top-0 right-0 z-10"
width="18"
height="18"
viewBox="0 0 18 18"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path d="M1 1L17 17" stroke="#ADADAD" strokeWidth="2" />
<path d="M17 1L1 17" stroke="#ADADAD" strokeWidth="2" />
</svg>
</div> */}



// src="https://sun4-18.userapi.com/impg/CczDilyLD0wR09MhcxOJu-0Rmp01vB4bTE5KeA/dGsBmaa2L24.jpg?size=1620x2160&quality=95&sign=3b2b9c3c58905215471b3f21a8a810bf&type=album"
// src={`https://gde-chto.ru/elitegis/rest/services/${
//   store.cities[store.currentCity]
// }/sights/MapServer/102/1931/attachments/${im}`}
// src={
//   img
//     ? `https://gde-chto.ru/elitegis/rest/services/${
//         store.cities[store.currentCity]
//       }/sights/MapServer/102/1931/attachments/${img}`
//     : waitGifs[rndGif]
// }



{/* <p className={visibleEl + " text-xs sm:text-sm"}>
    {data.attributes.note}
</p> */}

// const onSearch = (value: string, _e: any) => {
//     console.log(value);
//     fetch(
//       `https://gde-chto.ru/elitegis/rest/services/${
//         store.cities[store.currentCity]
//       }/sights/MapServer/exts/CompositeSoe/Search?f=json&layerIds=${
//         store.layerIds
//       }&definitionQueries=%7B%22102%22%3A%22type!%3D30%22%7D&geometryToDistance=%7B%22type%22%3A%22point%22%2C%22x%22%3A9248980.746105952%2C%22y%22%3A7336891.762952331%2C%22spatialReference%22%3A%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D%7D&orderByDisplayNames=false&returnGeometries=&outCoordinateSystems=%7B%22wkid%22%3A3857%2C%22wkt%22%3Anull%2C%22latestWkid%22%3A3857%7D&compareType=contains&onlyInCaption=false&singleText=%D0%B0&returnFields=%5B%22*%22%5D&returnLabelPoints=&returnExtents=*&returnScore=true&ignoreCase=true&language=ru`
//     )
//       .then((response) => response.json())
//       .then((data) => setData(data.results))
//       .catch((error) => console.error(error));
//     // const wordsSearch = store.requestSearch.toLowerCase().split(" ");
//     // https://gde-chto.ru/elitegis/rest/services/novosibirsk/sights/MapServer/exts/CompositeSoe/Search?f=json&layerIds=201%2C20100%2C102&compareType=contains&onlyInCaption=false&singleText=%D0%BB%D0%B5%D0%BA%D1%86%D0%B8%D1%8F
//     const wordsSearch = value.toLowerCase().split(" ");
//     console.log(wordsSearch);
//     let searchedEvents: { objectId: string | Number | null }[] = [];
//     data?.map((item: any) => {
//       if (item.attributes.description !== null) {
//         const wordsDes = item.attributes.description.toLowerCase().split(" ");
//         // console.log(wordsDes);
//         const filteredArray = wordsSearch.filter((val) =>
//           wordsDes.includes(val)
//         );

//         if (filteredArray.length !== 0) {
//           searchedEvents.push(item);
//           console.log(item);
//           console.log(filteredArray, "fA");
//         }
//       }
//     });


  // const shuffleEvents = () => {
  //   setShownCards(shownCards.sort(() => Math.random() - 0.5));
  //   store.setMapView(false);
  // };


          {/* <div
          className={
            !visibleEl
              ? "hidden"
              : "transition ease-in-out delay-100 border-2 hover:border-white rounded border-blue-400 p-2 pt-1 pb-1 hover:bg-blue-200 text-sm text-blue-400 hover:text-black relative inline-block cursor-pointer"
          }
          onClick={() => sortByGeom()}
        >
          Показать на карте
        </div> */}

        {/* <span
          className={
            visibleEl +
            " before:block before:absolute before:-inset-1 before:bg-blue-100 relative inline-block font-bold cursor-pointer"
          }
          onClick={() => sortByGeom()}
          onMouseEnter={() => getTooltip(3)}
        >
          <span className=" relative leading-normal p-2">
            {data.attributes.address}
          </span>
          <div className="relative text-sm font-light p-1">
            {data.attributes.place}
            <div
              className={
                tooltip === 3
                  ? " absolute -top-0 z-20 right-100 font-normal w-40 bg-opacity-90 bg-white text-slate-900 text-sm inline-block before:block before:absolute before:-inset-1 rounded-md shadow-md p-2"
                  : "hidden"
              }
            >
              Показать на карте и другие события рядом
            </div>
          </div>
        </span> */}


          // const sortSoonEvents = () => {
  //   let soonEvents: { objectId: string | Number | null }[] = [];
  //   const now = new Date().getDate();
  //   shownEvents.map((item: any) => {
  //     const day = new Date(item.attributes.date_to).getDate();
  //     if (day === now) {
  //       soonEvents.push(item);
  //     }
  //   });

  //   shownEvents.map((item: any) => {
  //     const day = new Date(item.attributes.date_to).getDate();
  //     if (day === now + 1) {
  //       soonEvents.push(item);
  //     }
  //   });

  //   setshownEvents(soonEvents);
  //   store.setMapView(false);
  //   store.setСurrentTab(1);
  //   setFilters(false);
  //   setResetFilters(true);
  // };




  
        {/* <div className="grid items-start sm:grid-cols-3 grid-cols-1 gap-4 pt-4">
          <div className="w-[200px] ">
            <a
              href="https://gde-chto.ru/ru/resourses/news/bloggdechto/news/post-4/"
              target="_blank"
            >
              <div className="hover:drop-shadow-lg cursor-pointer bg-cover w-[200px] h-[130px] rounded-xl bg-[url('https://gde-chto.ru/media/bjnbca2x/artboard-30.png')]"></div>
            </a>
            <p className="pt-2 text-sm text-center font-normal">
              Ночь музеев - 2024 в Новосибирске
            </p>
          </div>

          <div className="w-[200px] ">
            <a
              href="https://gde-chto.ru/ru/resourses/news/bloggdechto/news/post-3/"
              target="_blank"
            >
              <div className="hover:drop-shadow-lg cursor-pointer bg-cover w-[200px] h-[130px] rounded-xl bg-[url('https://gde-chto.ru/media/it4pswjk/ek2o690vkqe.jpg')]"></div>
            </a>
            <p className="pt-2 text-sm text-center font-normal">
              Новосибирск событийный: как найти или создать мероприятие на карте
            </p>
          </div>

          <div className="w-[200px] ">
            <a
              href="https://gde-chto.ru/ru/resourses/news/bloggdechto/news/post-2/"
              target="_blank"
            >
              <div className="hover:drop-shadow-lg cursor-pointer bg-cover w-[200px] h-[130px] rounded-xl bg-[url('https://gde-chto.ru/media/5m3cbp4y/bmsn750hltw.jpg')]"></div>
            </a>
            <p className="pt-2 text-sm text-center font-normal">
              Интерактивная карта мероприятий «ГдеЧто»
            </p>
          </div>
        </div> */}
        {/* <p
          onClick={() => store.setLayerIds(105)}
          className="fixed bottom-10 right-28 text-gray-700 text-sm"
        >
          Архив
        </p>
        <p
          onClick={() => store.setLayerIds(20100)}
          className="fixed bottom-10 right-10 text-gray-700 text-sm"
        >
          All Ads
        </p> */}