import { defineStore } from 'pinia'
import { ref, toValue } from 'vue'
import { get } from 'lodash';
import axios from 'axios'
import router from '@/router'
import { api_url, config } from '../help'
import { usePagination } from '../composable/usePagination'

export const useCatStore = defineStore('cat', () => {
  const catData = ref([])
  const { pagination } = usePagination();

  const getCatData = async(queryObject = {}) => {
    const searchString = new URLSearchParams(toValue(queryObject)).toString();
    try {
      const res = await axios.get(`${api_url}/images/search?${searchString}`, config);
      const { data, headers } = res;
      const total = headers['pagination-count'];
      const temp = Math.ceil(total/pagination.value.limit);
      temp > 10 ? pagination.value.totalPages = 10 : pagination.value.totalPages = temp;
      catData.value = data;   
    } catch (error) {
      router.push({ name: 'error', params: { error: get(error, 'response.data') } })
    } 
  }
  const voteForCat = async ({ payload, imgId }) => {
    const body = {
      image_id: imgId,
      value: payload === 'like' ? 1: -1,
    };    
    try {
      await axios.post(`${api_url}/votes`, body, config);    
    } catch (error) {
      router.push({ name: 'error', params: { error: get(error, 'response.data') } })
    }
  }
  return { catData, getCatData, voteForCat }
})