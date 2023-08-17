<template>
  <main class="card">
    <Loader v-if="loading" />
    <div v-else>
      <div class="title">
        <SearchFilter title="breed" :list="[]"/>
        <SearchFilter title="order" :list="order"/>
        <SearchFilter title="category" :list="[]"/>
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
const imgList = ref(['123']);
const loading = ref(false);
const categories = ref([]);
const filter = ref({
  breed: '',
  order: '',
  category: '',
})
const getCategory = async() => {
  const { data } = await axios.get(`${api_url}/categories`, config);
  return data;
};
const getKity = async() => {
  loading.value = true; 
  try {
    const { data } = await axios.get(`${api_url}/images/search`, config);
    imgList.value = data;
    
  } catch (error) {
    // router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  } finally {
    loading.value = false;
  }  
}
onMounted(() => {
  getKity();
  categories.value = getCategory();
  });
</script>
<style scoper>
.title {
  display: flex;
  padding-top: 1em;
  justify-content: center;
}
</style>
