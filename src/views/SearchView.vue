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
      <div v-else-if="!isEmpty(imgList)">
        <PhotoGallery  :img-arr="imgList"/>
        <Pagination />
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
import Pagination from '@/components/Pagination.vue';
import Loader from '@/components/Loader.vue';
import { isEmpty } from 'lodash';
import { ref, onMounted, computed, watchEffect } from 'vue';
import { order } from '../help';
import { getCategory, getBreeds, getKity, loading } from '../api'
const imgList = ref([]);
const categories = ref([]);
const breeds = ref([]);
const filter = ref({
  breed: '',
  order: '',
  category: '',
})
const queryStr = computed(()=>{
  let query = '';
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
watchEffect(async()=>{
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
