import axios from 'axios';
import { get, map } from 'lodash';
import { api_url, config, user_id } from '../help';
import { ref } from 'vue';
import router from '@/router';

const newPag = {
  currentPage: 0,
  limit: 4,
  totalPages: 1,
}
export const loading = ref(false);
export const pagination = ref(newPag);

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
    const res = await axios.get(`${api_url}/images/search?limit=${pagination.value.limit}&page=${pagination.value.currentPage}${search}`, config);
    const { data, headers } = res;
    const total = headers['pagination-count'];
    const temp = Math.ceil(total/pagination.value.limit);
    temp > 10 ? pagination.value.totalPages = 10 : pagination.value.totalPages = temp;
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
export const getFavor = async(order) => {
  loading.value = true;
  try {
    const res = await axios.get(
      `${api_url}/favourites?limit=${pagination.value.limit}&page=${pagination.value.currentPage}&sub_id=${user_id}&order=${order.value}`, config);
    const { data, headers } = res;
    const total = headers['pagination-count'];
    const temp = Math.ceil(total/pagination.value.limit);
    temp > 10 ? pagination.value.totalPages = 10 : pagination.value.totalPages = temp;
    return map(data, element => {
      return { url: element.image.url }
  });
  } catch (error) {
    // router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  } finally {
    loading.value = false;
  } 
}
