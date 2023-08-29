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
      <div v-if="!isEmpty(catData)">
        <PhotoGallery  :img-arr="catData"/>
        <Pagination
          :current-page="pagination.page"
          :total-pages="totalPages"
          @changePage="(e) => changePage(e)"
        />
      </div>   
      <div v-else>
        <h3> Nothing founded yet</h3>
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
import { ref, onMounted, watch } from 'vue';
import { order } from '../help';
import { loading } from '../api'
import { useBreedStore } from '../store/breed'
import { useCategoryStore } from '../store/category'
import { useCatStore } from '../store/cat'
import { storeToRefs } from 'pinia'
import { usePagination } from '../composable/usePagination';
const { pagination, changePage, totalPages, total } = usePagination({ limit: 4});

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
const updateSearch = async()=>{
  loading.value = true
  const { currentPagination, paginationСount } = await catStore.getCatData({filter, pagination});
  total.value = paginationСount;
  pagination.value = currentPagination;
  loading.value = false
}
onMounted(async() => {
  loading.value = true
  await categoryStore.getCategoryList();
  await breedStore.getBreedList();
  loading.value = false
  });
watch(() => pagination.value.page,() => updateSearch(), { immediate: true })
watch(() => filter,() => {
  pagination.value.page = 0;
  updateSearch();
}, { deep: true })
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
