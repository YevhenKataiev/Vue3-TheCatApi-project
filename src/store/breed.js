import { defineStore } from 'pinia'
import { ref, toValue } from 'vue'
import { get } from 'lodash';
import axios from 'axios'
import router from '@/router'
import { api_url, config } from '../help'

export const useBreedStore = defineStore('breed', () => {
  const breedsList = ref([])
  const breedsImgsList = ref([])
  const getBreedList = async() => { 
    try {
      const { data } = await axios.get(`${api_url}/breeds`, config);
      breedsList.value = data;    
    } catch (error) {
      router.push({ name: 'error', params: { error: get(error, 'response.data') } })
    } 
  }
  const getBreedImgList = async(id) => {   
    try {
      const { data } = await axios.get(`${api_url}/images/search?breed_ids=${toValue(id)}&limit=10`, config);
      breedsImgsList.value = data;
    } catch (error) {
      router.push({ name: 'error', params: { error: get(error, 'response.data') } })
    } 
  }

  return { breedsList, breedsImgsList, getBreedList, getBreedImgList }
})