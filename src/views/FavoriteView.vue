<template>
  <main class="card">  
    <div class="title-wrapper">
      <div class="title">
        <SearchFilter title="order" :list="orderList" v-model:title="order"/>
      </div>
    </div>
    <div  class="container">
      <Loader v-if="loading"/>
      <PhotoGallery v-else-if="!isEmpty(imgList)" :img-arr="imgList"/>
      <div v-else>
        <h3> Nothing founded</h3>
      </div>
    </div>  
  </main>
</template>
<script setup>
import PhotoGallery from '@/components/PhotoGallery.vue'
import SearchFilter from '@/components/SearchFilter.vue';
import Loader from '@/components/Loader.vue';
import { isEmpty, map } from 'lodash';
import { ref, onMounted, watchEffect } from 'vue';
import axios from 'axios';
import { api_url, config, user_id } from '../help';
const orderList = [ 
  { name:'ASC', id: 'ASC'},
  { name:'DESC', id: 'DESC'}
];
const loading = ref(false);
const order = ref('ASC');
const imgList = ref([]);
const getFavor = async() => {
  loading.value = true;
  try {
    const { data } = await axios.get(`${api_url}/favourites?limit=8&sub_id=${user_id}&order=${order.value}`, config);
  return map(data, element => {
    return { url: element.image.url }
  });
  } catch (error) {
    // router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  } finally {
    loading.value = false;
  } 
}
onMounted(async() => {
  imgList.value = await getFavor();
})
watchEffect(async()=>{
  imgList.value = await getFavor();
})
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  min-height: 300px;
  padding-top: 1em;
} 
</style>