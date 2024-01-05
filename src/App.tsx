import * as React from "react";
import { getMetaData } from "./metaDataCall"
import { getLocations } from "./locationsCall";
import { getPropertiesList } from "./propertiesListCall";
import { getDetails } from "./detailsCall";

import "./App.css";
import "./output.css";

function App() {
  const [city, setCity] = React.useState("bucharest");

  async function retryIfFailed(error, element) {
    if (error.response && error.response.status === 429) {
      await new Promise(resolve => {
        setTimeout(resolve, 300);
      });
      await callWithDelay(element);

    } else {
      console.error(error.message);
    }
  }

  const callWithDelay = async (element) => {
    try {
      const response = await getDetails(element);
      console.log(response);
    } catch (error) {
      retryIfFailed(error, element);
    }
  };

  const handleCityChange = (event) => {
    var city = event.target.value;

    setCity(city);
    console.log(city);
    locations(city).then(regionId => {
      console.log(regionId);
      return propertiesList(regionId);
    }).then(propList => {

      propList?.forEach((element, index) => {
        setTimeout(() => {
          callWithDelay(element + "");
        }, index * 300);
        // propertyDetails(element.id + "").then(response => {
        //   console.log(response);
        // }).catch(err => {
        //   console.log(err);
        // });
      })
    }).catch(err => {
      console.log(err);
    });
    const regionId = locations(city);


    // regionId.then(regionId => {
    //   console.log(regionId);
    //   propertiesList(regionId).then(list => {
    //     list?.forEach(element => {
    //       propertyDetails(element).then(value =>
    //         console.log(value));
    //     });
    //   });
    // });

    // console.log(regionId);
    // const regionIdNr: string = regionId + "";
    // console.log(regionIdNr);
    // propertiesList(regionId);
  }

  async function locations(city: String) {
    const locationList: Array<any> = await getLocations(city).then(response => response.sr);
    const regionId = locationList[0].gaiaId;
    return regionId;
  }

  async function propertiesList(regionId: any) {
    try {
      const propertiesList: Array<any> = await getPropertiesList(regionId).then(response => response.data.propertySearch.filterMetadata.amenities);
      return propertiesList;
    } catch (error) {
      console.log(error);
    }
  }

  async function propertyDetails(hotelId: String) {
    const details = await getDetails(hotelId);
    return details;
  }

  // async function metaData() {
  //   let metaDataList = await getMetaData();
  //   console.log(metaDataList);
  // }

  return (
    <>
      <h1>Please enter the location you want to travel to: </h1>
      <div className="center-div">
        <div className="forms-div">
          <select name={city} onChange={handleCityChange}>
            <option value="bucharest">Bucharest</option>
            <option value="paris">Paris</option>
            <option value="new york">New York</option>
            <option value="budapest">Budapest</option>
          </select>
        </div>
      </div >
    </>
  );
}

export default App;
