import { defineStore } from 'pinia'
import { ref } from 'vue'

import axios from 'axios'

import { api_url, config } from '../help'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])
  const getCategoryList = async() => {
    const { data } = await axios.get(`${api_url}/categories`, config);
    categoryList.value = data;
  };

  return { categoryList, getCategoryList }
})