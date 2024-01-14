import { ChangeEvent, FormEvent, useState } from "react";
import { getLocations } from "./locationsCall";
import { getPropertiesList } from "./propertiesListCall";
import { getDetails } from "./detailsCall";
import { Hotel, HotelComponent } from "./components/hotel";

// import "./App.css";
// import "./output.css";

function App() {
  const [city, setCity] = useState<String>("");
  const [hotelList, setHotelList] = useState<Hotel[]>([]);
  const [hotelImages, setHotelImages] = useState();

  const handleCityChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(city);
    setHotelList([]);

    locations(city)
      .then(regionId => {
        console.log(regionId);
        return propertiesList(regionId);
      })
      .then(propertyList => {
        console.log(propertyList);
        return propertyDetails(propertyList);
      })
      .then(hotelDetailsList => {
        console.log(hotelDetailsList);
        hotelDetailsList.forEach(detail => {
          var hotel = new Hotel(detail.data.propertyInfo.summary.name, detail.data.propertyInfo.propertyGallery.images[0].image.url);
          console.log(hotel);
          setHotelList((hotelList) => [...hotelList, hotel]);
        });

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

      <div className="center-div">
        <h1>Please enter the location you want to travel to: </h1>
        <div className="forms-div">
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
        </div>
        <p>Hotels</p>
        {hotelList.map((hotel: Hotel) => (
          <HotelComponent key={hotel.name} name={hotel.name} image={hotel.image} />
        ))}
      </div>
    </>
  );
}

export default App;
