<template>
  <main class="card">
    
    <div class="title-wrapper">
      <div class="title">
        <SearchFilter title="breed" :list="breeds" v-model:title="filter.breed"/>
        <SearchFilter title="order" :list="order" v-model:title="filter.order"/>
        <SearchFilter title="category" :list="categories" v-model:title="filter.category"/>
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
import { isEmpty } from 'lodash';
import { ref, onMounted, computed, watch } from 'vue';
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
const getKity = async(str= '') => {
  loading.value = true;
  try {
    const { data } = await axios.get(`${api_url}/images/search${str.value}`, config);
    return data;
    
  } catch (error) {
    // router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  } finally {
    loading.value = false;
  }  
}
const queryStr = computed(()=>{
  let query = '?limit=6&size=small';
  let prepFilter = '';
  if(filter.value.breed) {
    prepFilter += `&breed_ids=${filter.value.breed}`;
  }
  if(filter.value.order) {
    prepFilter += `&order=${filter.value.order}`;
  }
  if(filter.value.category) {
    prepFilter += `&category_ids=${filter.value.category}`;
  }
  return !isEmpty(prepFilter) ? query + prepFilter : query;
});
onMounted(async() => {
  imgList.value = await getKity(queryStr);
  categories.value = await getCategory();
  breeds.value = await getBreeds();
  });
watch(filter.value, async()=>{
  imgList.value = await getKity(queryStr);
})
</script>
<style scoped>
.title-wrapper {
  display: flex;
  justify-content: center;
}
.title {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
}
.container {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  min-height: 300px;
  padding-top: 1em;
} 
</style>
