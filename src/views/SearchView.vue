<template>
  <main class="card">
    <Loader v-if="loading" />
    <div v-else class="title-wrapper">
      <div class="title">
        <SearchFilter title="breed" :list="breeds"/>
        <SearchFilter title="order" :list="order"/>
        <SearchFilter title="category" :list="categories"/>
      </div>
      <div class="container">
        <PhotoGallery v-if="!isEmpty(imgList)" :img-arr="imgList"/>
      </div>
    </div>   
  </main>
</template>
<script setup>
import SearchFilter from '@/components/SearchFilter.vue';
import Loader from '@/components/Loader.vue';
import { isEmpty } from 'lodash';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { api_url, config, order } from '../help';
const imgList = ref([]);
const loading = ref(false);
const categories = ref([]);
const breeds = ref([]);
const filter = ref({
  breed: '',
  order: '',
  category: '',
})
const getCategory = async() => {
  const { data } = await axios.get(`${api_url}/categories`, config);
  return data;
};
const getBreeds = async() => {
  const { data } = await axios.get(`${api_url}/breeds`, config);
  return data;
}
const getKity = async() => {
  loading.value = true; 
  try {
    const { data } = await axios.get(`${api_url}/images/search`, config);
    // imgList.value = data;
    return data;
    
  } catch (error) {
    // router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  } finally {
    loading.value = false;
  } 
  
}
onMounted(async() => {
  imgList.value = getKity();
  categories.value = await getCategory();
  breeds.value = await getBreeds();
  });
</script>
<style scoper>
.title-wrapper {
  display: flex;
  justify-content: center;
}
.title {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
}
</style>
