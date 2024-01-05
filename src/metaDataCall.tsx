import axios from "axios";

export async function getMetaData() {

    const options = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/v2/get-meta-data',
      headers: {
        'X-RapidAPI-Key': '193ebaa4b5msh889c774df79466cp112556jsn5dd40c53f272',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return await response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

