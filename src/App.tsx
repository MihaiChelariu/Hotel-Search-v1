import { ChangeEvent, FormEvent, useState } from "react";
import { getLocations } from "./locationsCall";
import { getPropertiesList } from "./propertiesListCall";
import { getDetails } from "./detailsCall";
import { Hotel, HotelComponent } from "./components/hotel";

import "./styling/App.css"

function App() {
  const [city, setCity] = useState<String>("");
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [peopleNumber, setPeopleNumber] = useState<number>();
  const [sortMethod, setSortMethod] = useState<String>("");
  const [hotelList, setHotelList] = useState<Hotel[]>([]);

  const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    hotelSearch();
  };

  const handleSortChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    hotelSearch();
  };

  const hotelSearch = () => {
    console.log(city);
    console.log(checkInDate?.getDate());
    console.log(checkInDate?.getMonth() + 1);
    console.log(checkInDate?.getFullYear());
    console.log(checkOutDate?.getDate());
    console.log(checkOutDate?.getMonth() + 1);
    console.log(checkOutDate?.getFullYear());
    console.log(peopleNumber);
    console.log(sortMethod);

    const checkInMonth = checkInDate?.getMonth() + 1;
    const checkOutMonth = checkOutDate?.getMonth() + 1;
    setHotelList([]);

    locations(city)
      .then(regionId => {
        console.log(regionId);
        return propertiesList(regionId, checkInDate?.getDate(), checkInMonth, checkInDate?.getFullYear(), checkOutDate?.getDate(), checkOutMonth, checkOutDate?.getFullYear(), 
        peopleNumber, sortMethod);
      })
      .then(propertyList => {
        console.log(propertyList);
        return propertyDetails(propertyList);
      })
      .then(hotelDetailsList => {
        console.log(hotelDetailsList);
        hotelDetailsList.forEach(detail => {
          var image = detail.data.propertyInfo.propertyGallery.images.map(image => image.image.url);
          var hotel = new Hotel(detail.data.propertyInfo.summary.name, image);
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

  async function propertiesList(regionId: any, checkInDay: number, checkInMonth: number, checkInYear: number,
    checkOutDay: number, checkOutMonth: number, checkOutYear: number, people: number, sortMethod: String) {
    try {
      const propertiesList: Array<any> = await getPropertiesList(regionId, checkInDay, checkInMonth, checkInYear, checkOutDay, checkOutMonth, checkOutYear, people, sortMethod)
        .then(response => response.data.propertySearch.properties);
      return propertiesList;
    } catch (error) {
      console.error(error);
    }
  }

  async function propertyDetails(hotelIds) {
    var promiseList = [];
    var idsList = [];
    hotelIds.forEach(element => {
      idsList.push(element.id + "");
    });
    for (var i = 0; i < 5; i++) {
      promiseList.push(await getDetails(idsList[i]).then(response => response));
    }
    return promiseList;
  }

  const handleCityInput = (city: ChangeEvent<HTMLInputElement>) => {
    setCity(city.target.value);
  }

  const handleCheckInInput = (checkInDate: ChangeEvent<HTMLInputElement>) => {
    const newCheckInDate = new Date(checkInDate.target.value);
    setCheckInDate(newCheckInDate);
  }

  const handleCheckOutInput = (checkOutDate: ChangeEvent<HTMLInputElement>) => {
    const newCheckOutDate = new Date(checkOutDate.target.value);
    setCheckOutDate(newCheckOutDate);
  }

  const handlePeopleNumber = (peopleNumber: ChangeEvent<HTMLInputElement>) => {
    setPeopleNumber(parseInt(peopleNumber.target.value));
  }

  const handleSort = (sort: ChangeEvent<HTMLInputElement>) => {
    setSortMethod(sort.target.value);
  }

  const formatDate = (date: Date | null): string => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  return (
    <>
      <div className="center-div">
        <h1>Please enter the location you want to travel to: </h1>
        <div className="forms-div">
          <form className="forms-div" onSubmit={handleFormChange}>
            <input
              type="text"
              name="city"
              value={city || ""}
              onChange={handleCityInput}
              placeholder="Enter city name"
            />
            <input
              type="date"
              name="check in"
              value={formatDate(checkInDate) || ""}
              onChange={handleCheckInInput}
              placeholder="Enter check-in date"
            />
            <input
              type="date"
              name="check out"
              value={formatDate(checkOutDate) || ""}
              onChange={handleCheckOutInput}
              placeholder="Enter check-out date"
            />
            <input
              type="number"
              name="check in"
              value={peopleNumber}
              onChange={handlePeopleNumber}
              placeholder="How many people"
            />
            <button type="submit">Search</button>
            <div className="forms-div" onSubmit={handleSortChange}>
              <p>Sort by:</p>
              <select id="dropdown" onChange={handleSort} >
                <option value="PRICE_LOW_TO_HIGH">Lowest price</option>
                <option value="PRICE_RELEVANT">Relevance</option>
                <option value="REVIEW">Review</option>
                <option value="PROPERTY_CLASS">Star rating</option>
              </select>
              <button type="submit">Apply</button>
            </div>
          </form>
        </div>
        {hotelList.map((hotel: Hotel) => (
          <HotelComponent key={hotel.name} name={hotel.name} images={hotel.images} />
        ))}
      </div>
    </>
  );
}

export default App;
