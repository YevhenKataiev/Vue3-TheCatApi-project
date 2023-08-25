import { defineStore } from 'pinia'
import { ref, toValue } from 'vue'
import axios from 'axios'
import router from '@/router'
import { get } from 'lodash'
import { api_url, config } from '../help'
import { usePagination } from '../composable/usePagination'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref({});
  const { pagination } = usePagination();
  const $reset = () => {
    favorites.value = {}
  }

  const getFavorites = async(queryObject = {}) => {
    const searchString = new URLSearchParams(toValue(queryObject)).toString();
    try {
      const { data, headers } = await axios.get(`${api_url}/favourites?${searchString}`, config);
      const total = headers['pagination-count'];
      const temp = Math.ceil(total/pagination.value.limit);
      temp > 10 ? pagination.value.totalPages = 10 : pagination.value.totalPages = temp;
      favorites.value = data.map(element => {
        return { url: element.image.url }
    }) ;
    } catch (error) {
      router.push({ name: 'error', params: { error: get(error, 'response.data') } })
    } 
  }
  const postOrDeleteFavorite = async({ favorId, imgId }) => {
    let end,body;
    let result = '';
    if(favorId) {
      end = `/${favorId}`;
      await axios.delete(`${api_url}/favourites${end}`, config);  
    } else {
      body = {
        image_id: imgId,
        sub_id: import.meta.env.VITE_USER_ID,
      };
      const { data } = await axios.post(`${api_url}/favourites`, body, config);
      if (data.message === 'SUCCESS') {
        result = data.id;
      }
    }; 
    return result;
  }

  return { favorites, getFavorites ,$reset, postOrDeleteFavorite }
})