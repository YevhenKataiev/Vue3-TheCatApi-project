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
import { ref, watch, computed } from 'vue';
import { loading } from '@/api';
import { useFavoriteStore } from "../store/favorite";
import { usePagination } from '../composable/usePagination';

const store = useFavoriteStore();
const { pagination } = usePagination({
  limit: 4,
})

const orderList = [ 
  { name:'ASC', id: 'ASC'},
  { name:'DESC', id: 'DESC'}
];
const order = ref('ASC');

const queryObject = computed(() => {
  const params = new URLSearchParams()
  params.append('sub_id', import.meta.env.VITE_USER_ID);
  params.append('order', order.value);
  const obj = { ...pagination.value }
  forEach(obj, (value, key) => {
    params.append(key, value)
  }); 
  return params;
});

watch(() => queryObject,async()=>{ 
  loading.value = true;
  pagination.value.totalPages = await store.getFavorites(queryObject);
  loading.value = false;
}, {immediate: true})
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