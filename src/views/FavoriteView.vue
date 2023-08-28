<template>
  <main class="card">  
    <div class="title-wrapper">
      <div class="title">
        <SearchFilter title="order" :list="orderList" v-model:selected="order"/>
      </div>
    </div>
    <div  class="container">
      <Loader v-if="loading"/>
      <div v-if="!isEmpty(store.favorites)">
        <PhotoGallery  :img-arr="store.favorites"/>
        <Pagination
          :current-page="pagination.page"
          :total-pages="totalPages"
          @changePage="(e) => changePage(e)"
        />
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
import { ref, watch, computed } from 'vue';
import { loading } from '@/api';
import { useFavoriteStore } from "../store/favorite";
import { usePagination } from '../composable/usePagination';

const store = useFavoriteStore();
const { pagination, changePage, totalPages } = usePagination({ limit: 4});

const orderList = [ 
  { name:'ASC', id: 'ASC'},
  { name:'DESC', id: 'DESC'}
];
const order = ref('ASC');

const queryObject = computed(() => {
  return {
    sub_id: import.meta.env.VITE_USER_ID,
    order: order.value,
    limit: pagination.value.limit,
    page: pagination.value.page
  }
});
const updateSearch = async() => {
  loading.value = true
  const { currentPagination, currentTotalPages } = await store.getFavorites(queryObject)
  totalPages.value = currentTotalPages
  pagination.value = currentPagination
  loading.value = false
}
watch(() => pagination.value.page,() => updateSearch())
watch(() => order.value, async()=>{
  pagination.value.page = 0
  updateSearch()
}, { immediate: true  })
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