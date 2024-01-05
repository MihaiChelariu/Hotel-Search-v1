import axios from "axios";

export async function getPropertiesList(regionId: String) {
    const options = {
        method: 'POST',
        url: 'https://hotels4.p.rapidapi.com/properties/v2/list',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '193ebaa4b5msh889c774df79466cp112556jsn5dd40c53f272',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        },
        data: {
          currency: 'USD',
          eapid: 1,
          locale: 'en_US',
          siteId: 300000001,
          destination: {
            regionId: regionId
          },
          checkInDate: {
            day: 10,
            month: 10,
            year: 2022
          },
          checkOutDate: {
            day: 15,
            month: 10,
            year: 2022
          },
          rooms: [
            {
              adults: 2,
              children: [{age: 5}, {age: 7}]
            }
          ],
          resultsStartingIndex: 0,
          resultsSize: 200,
          sort: 'PRICE_LOW_TO_HIGH',
          filters: {
            price: {max: 150, min: 100}
          }
        }
      };
      
      try {
          const response = await axios.request(options);
          return await response.data;
      } catch (error) {
          console.error(error);
      }
}

