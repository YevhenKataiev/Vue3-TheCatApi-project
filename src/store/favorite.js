import { defineStore } from 'pinia'
import { ref, toValue } from 'vue'
import axios from 'axios'
import router from '@/router'
import { get, forEach } from 'lodash'
import { api_url, config } from '../help'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref({});
  const $reset = () => {
    favorites.value = {}
  }

  const getFavorites = async(queryObject) => {
    const params = new URLSearchParams()
    forEach(queryObject.value, (value, key) => {
      if (value || value === 0) {
        params.append(key, value)
      }  
    });
    const limit = params.get('limit');
    const page = params.get('page') || 0;
    const searchString = params.toString();
    try {
      const { data, headers } = await axios.get(`${api_url}/favourites?${searchString}`, config);
      favorites.value = data.map(element => {
        return { url: element.image.url }
      }) ;
      const total = headers['pagination-count'];
      const pageCount = Math.ceil(total/limit);
      const currentPagination = {limit: +limit, page: +page}
      return { currentPagination, currentTotalPages: pageCount > 10 ?  10 : pageCount};
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