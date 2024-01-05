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
          'X-RapidAPI-Key': '193ebaa4b5msh889c774df79466cp112556jsn5dd40c53f272',
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
