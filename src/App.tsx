import { ChangeEvent, FormEvent, useState } from "react";
import { getLocations } from "./locationsCall";
import { getPropertiesList } from "./propertiesListCall";
import { getDetails } from "./detailsCall";

import "./App.css";
import "./output.css";

interface HotelImages{
  id: String;
  images: [];
}

function App() {
  const [city, setCity] = useState<String>("");
  const [hotelImagesMap, setHotelImagesMap] = useState<Map>();
  // const [hotelIds, setHotelIds] = useState([]);
  // const [hotelDetailsPromises, setHotelDetailsPromises] = useState([]);

  const handleCityChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(city);

    locations(city)
      .then(regionId => {
        console.log(regionId);
        return propertiesList(regionId);
      })
      .then(propertyList => {
        console.log(propertyList);
        return propertyDetails(propertyList);
      })
      .then(hotelList => {
        console.log(hotelList);
        var hotelImages = new Map();
        hotelList.forEach(x => {
          hotelImages.set(x.data.propertyInfo.summary.name, x.data.propertyInfo.propertyGallery.images);
        })
        console.log(hotelImages);
        setHotelImagesMap(hotelImages);
        console.log(hotelImagesMap);
      });
  }

  async function locations(city: String) {
    try {
      var locationList = await getLocations(city).then(response => response.sr);
      const regionId = locationList[0].gaiaId;
      return regionId;
    } catch (error) {
      console.error(error);
    }
  }

  async function propertiesList(regionId: any) {
    try {
      const propertiesList: Array<any> = await getPropertiesList(regionId).then(response => response.data.propertySearch.filterMetadata.amenities);
      return propertiesList;
    } catch (error) {
      console.log(error);
    }
  }

  async function propertyDetails(hotelIds: number[]) {
    var promiseList = [];
    var idsList = [];
    hotelIds.forEach(element => {
      idsList.push(element.id + "");
    });
    for (var i = 0; i < 4; i++) {
      promiseList.push(await getDetails(idsList[i]).then(response => response));
    }
    return promiseList;
  }

  const handleInput = (city: ChangeEvent<HTMLInputElement>) => {
    setCity(city.target.value);
  }

  return (
    <>
      <div className="app-container">
        <h1>Please enter the location you want to travel to: </h1>
        <div className="center-div">
          <div className="forms-div">
            {/* <select name={city} onChange={handleCityChange}>
              <option value="bucharest">Bucharest</option>
              <option value="paris">Paris</option>
              <option value="new york">New York</option>
              <option value="budapest">Budapest</option>
            </select> */}
            <form className="forms-div" onSubmit={handleCityChange}>
              <input
                type="text"
                name="city"
                value={city || ""}
                onChange={handleInput}
                placeholder="Enter city name"
              />
              {/* <input
                type="text"
                name="check in"
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter check-in date"
              /> */}
              <button type="submit">Search</button>
            </form>
            <ul>
              {
                hotelImagesMap.map(image => (
                  <li key={image.ge}></li>
                )

                )
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
