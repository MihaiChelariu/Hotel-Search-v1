import axios from "axios";

export async function getDetails(hotelId: String) {

    const options = {
        method: 'POST',
        url: 'https://hotels4.p.rapidapi.com/properties/v2/detail',
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
          propertyId: hotelId
        }
      };
      
      try {
          const response = await axios.request(options);
          return await response;
      } catch (error) {
          console.error(error);
      }
    
}
