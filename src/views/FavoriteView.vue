<template>
  <main class="card">  
    <div class="title-wrapper">
      <div class="title">
        <SearchFilter title="order" :list="orderList" v-model:title="order"/>
      </div>
    </div>
    <div  class="container">
      <Loader v-if="loading"/>
      <div v-else-if="!isEmpty(imgList)">
        <PhotoGallery  :img-arr="imgList"/>
        <div>
            <button
                type="button"
                :class="[
                    'button--link button--large',
                    { isActive: page === pagination.currentPage }
                ]"
                v-for="page in pagination.totalPages"
                :key="page"
                @click="changePage(page)"
            >
                {{ page }}
            </button>
        </div>
      </div>   
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
const pagination = ref({
  currentPage: 0,
  limit: 4,
  totalPages: 1,
});
const loading = ref(false);
const order = ref('ASC');
const imgList = ref([]);
const getFavor = async() => {
  loading.value = true;
  try {
    const res = await axios.get(
      `${api_url}/favourites?limit=${pagination.value.limit}&page=${pagination.value.currentPage}&sub_id=${user_id}&order=${order.value}`, config);
    const { data, headers } = res;
    const total = headers['pagination-count'];
    pagination.value.totalPages = Math.ceil(total/pagination.value.limit);
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
const changePage = async(num) => {
  pagination.value.currentPage = num -1; // api pages starts from 0
  
}
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
.title {
  display: flex;
  justify-content: center;
}
</style>