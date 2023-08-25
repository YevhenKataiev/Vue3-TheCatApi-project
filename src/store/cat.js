import { defineStore } from 'pinia'
import { ref, toValue } from 'vue'
import { get } from 'lodash';
import axios from 'axios'
import router from '@/router'
import { api_url, config } from '../help'


export const useCatStore = defineStore('cat', () => {
  const catData = ref([])

  const getCatData = async(queryObject = {}) => {
    const temp  = new URLSearchParams(toValue(queryObject))
    const limit = temp.get('limit');
    const searchString = temp.toString();
    try {
      const res = await axios.get(`${api_url}/images/search?${searchString}`, config);
      const { data, headers } = res;
      const total = headers['pagination-count'];
      const temp = Math.ceil(total/limit);
      catData.value = data;
      return temp > 10 ?  10 : temp;;
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