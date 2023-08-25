<template>
  <main class="card">  
    <div class="title-wrapper">
      <div class="title">
        <SearchFilter title="breed" :list="breedsList" v-model:title="filter.breed"/>
        <SearchFilter title="order" :list="order" v-model:title="filter.order"/>
        <SearchFilter title="category" :list="categoryList" v-model:title="filter.category"/>
      </div>
    </div>
    <div  class="container">
      <Loader v-if="loading"/>
      <div v-else-if="!isEmpty(catData)">
        <PhotoGallery  :img-arr="catData"/>
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
import { isEmpty, forEach } from 'lodash';
import { ref, onMounted, watch, computed } from 'vue';
import { order } from '../help';
import { loading } from '../api'
import { useBreedStore } from '../store/breed'
import { useCategoryStore } from '../store/category'
import { useCatStore } from '../store/cat'
import { storeToRefs } from 'pinia'
import { usePagination } from '../composable/usePagination';
const { pagination } = usePagination({
  limit: 4
})

const categoryStore = useCategoryStore()
const { categoryList } = storeToRefs(categoryStore)

const breedStore = useBreedStore()
const { breedsList } = storeToRefs(breedStore)

const catStore = useCatStore()
const { catData } = storeToRefs(catStore)

const filter = ref({
  breed: '',
  order: '',
  category: '',
})
const queryObject = computed(() => {
  const params = new URLSearchParams()
  const obj = { ...filter.value, ...pagination.value }
  forEach(obj, (value, key) => {
    params.append(key, value)
  }); 
  return params;
});
onMounted(async() => {
  loading.value = true
  await catStore.getCatData(queryObject);
  await categoryStore.getCategoryList();
  await breedStore.getBreedList();
  loading.value = false
  });
watch(()=> queryObject, async()=>{
  loading.value = true
  await catStore.getCatData(queryObject);
  loading.value = false
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
