import axios from "axios";

export async function getLocations(regionName:String) {
    const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/v3/search',
        params: {
          q: regionName,
          locale: 'en_US',
          langid: '1033',
          siteid: '300000001'
        },
        headers: {
          'X-RapidAPI-Key': '16f6894920msh2be1dfcd82b9b42p1614b2jsn31772ace51f9',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return await response.data;
      } catch (error) {
          console.error(error);
      }
} 
