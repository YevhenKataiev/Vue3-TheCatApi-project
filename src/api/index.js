import axios from 'axios';
import { get } from 'lodash';
import { api_url, config, user_id } from '../help';
import { ref } from 'vue';
import router from '@/router';
export const loading = ref(false);

export const getCategory = async() => {
  const { data } = await axios.get(`${api_url}/categories`, config);
  return data;
};
export const getBreeds = async() => { 
  loading.value = true;
  try {
    const { data } = await axios.get(`${api_url}/breeds`, config);
    return data;    
  } catch (error) {
    router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  } finally {
    loading.value = false;
  } 
}

export const getKity = async(str= '') => {
  loading.value = true;
  let search;
  typeof str === 'string' ? search = str : search = str.value;
  
  try {
    const { data } = await axios.get(`${api_url}/images/search${search}`, config);
    return data;    
  } catch (error) {
    router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  } finally {
    loading.value = false;
  }  
}
export const getBreedsImages = async(id) => {
  loading.value = true;
  try {
    const { data } = await axios.get(`${api_url}/images/search?breed_ids=${id}&limit=10`, config);
    return data;
  } catch (error) {
    router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  } finally {
    loading.value = false;
  }
}

export const voteKity = async (props) => {
  const body = {
    image_id: props.id,
    value: props.payload === 'like' ? 1: -1,
  };
  
  try {
    await axios.post(`${api_url}/votes`, body, config);    
  } catch (error) {
    router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  }
}
export const favorKity = async(props) => {
  let end,body;
  let result = '';
  if(props.favorId) {
    end = `/${props.favorId}`;
    await axios.delete(`${api_url}/favourites${end}`, config);  
  } else {
    body = {
      image_id: props.id,
      sub_id: user_id,
    };
    const { data } = await axios.post(`${api_url}/favourites`, body, config);
    if (data.message === 'SUCCESS') {
      result = data.id;
    }
  }; 
  return result;
};
