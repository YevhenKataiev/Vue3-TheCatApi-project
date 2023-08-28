<template>
  <main class="card">  
    <div class="title-wrapper">
      <div class="title">
        <SearchFilter
          title="breed"
          :list="breedsList"
          v-model:selected="filter.breed_ids"/>
        <SearchFilter title="order" :list="order" v-model:selected="filter.order"/>
        <SearchFilter title="category" :list="categoryList" v-model:selected="filter.category_ids"/>
      </div>
    </div>
    <div  class="container">
      <Loader v-if="loading"/>
      <div v-else-if="!isEmpty(catData)">
        <PhotoGallery  :img-arr="catData"/>
        <Pagination :current-pagination="pagination" @changePage="(e) => changePage(e)"/>
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
const { pagination, changePage, currentPage } = usePagination({
  limit: 4
})

const categoryStore = useCategoryStore()
const { categoryList } = storeToRefs(categoryStore)

const breedStore = useBreedStore()
const { breedsList } = storeToRefs(breedStore)

const catStore = useCatStore()
const { catData } = storeToRefs(catStore)

const filter = ref({
  breed_ids: '',
  order: '',
  category_ids: '',
})
onMounted(async() => {
  loading.value = true
  await categoryStore.getCategoryList();
  await breedStore.getBreedList();
  loading.value = false
  });
watch(() =>[filter, currentPage], async(newVal, oldVal)=>{
  console.log(newVal)
  console.log(oldVal)
  loading.value = true
  pagination.value = await catStore.getCatData({filter, pagination});
  debugger
  loading.value = false
}, { deep: true, immediate: true })
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
