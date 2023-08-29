import axios from 'axios';
import { api_url } from '../help';
import { ref } from 'vue';

const userId = import.meta.env.VITE_USER_ID;

export const loading = ref(false);

export const shareKity = async(payload) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      'x-api-key' : userId,
    }
  };
  try {
    const { data }  = await axios.post(`${api_url}/images/upload`, payload, config);
    return data.approved;
  } catch (error) {
    console.log(error);
  } 
}

