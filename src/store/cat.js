import { defineStore } from 'pinia'
import { ref, toValue } from 'vue'
import { get, forEach } from 'lodash';
import axios from 'axios'
import router from '@/router'
import { api_url, config } from '../help'


export const useCatStore = defineStore('cat', () => {
  const catData = ref([])

  const getCatData = async(props) => {
    const params = new URLSearchParams()
    const filter = toValue(get(props, 'filter'))
    const pagination = toValue(get(props,'pagination'))
    if(filter){
      forEach(filter, (value, key) => {
      if (value || value === 0) {
        params.append(key, value)
      }  
    });
    }
    if(pagination){
      forEach(pagination, (value, key) => {
      if (value || value === 0) {
        params.append(key, value)
      }  
    });
    }    
    const searchString = params.toString();
    try {
      const res = await axios.get(`${api_url}/images/search?${searchString}`, config);
      const { data, headers } = res;
      catData.value = data;
      const paginationСount = headers['pagination-count'];
      return { currentPagination: pagination, paginationСount };
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