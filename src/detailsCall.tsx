import axios from "axios";

export async function getDetails(hotelId: String) {

    const options = {
        method: 'POST',
        url: 'https://hotels4.p.rapidapi.com/properties/v2/detail',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '16f6894920msh2be1dfcd82b9b42p1614b2jsn31772ace51f9',
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
          return await response.data;
      } catch (error) {
          console.error(error);
      }
    
}
