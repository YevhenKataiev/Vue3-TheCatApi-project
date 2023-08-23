<template>
  <main class="card">  
    <div class="title-wrapper">
      <div class="title">
        <SearchFilter title="order" :list="orderList" v-model:title="order"/>
      </div>
    </div>
    <div  class="container">
      <Loader v-if="loading"/>
      <div v-if="!isEmpty(imgList)">
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
import { ref, watchEffect, computed } from 'vue';
import { loading } from '@/api';
import { useFavoriteStore } from "../store/favorite";
import { usePagination } from '../composable/usePagination';

const store = useFavoriteStore();
const { pagination} = usePagination()

const orderList = [ 
  { name:'ASC', id: 'ASC'},
  { name:'DESC', id: 'DESC'}
];
const order = ref('ASC');

const qs = computed(() => {
  const params = new URLSearchParams(pagination.value);
  params.append({ sub_id: import.meta.env.VITE_USER_ID});
  params.append({ order: order.value });
  return '?' + params.toString();
} )
// const qs = `?limit=${pagination.value.limit}&page=${pagination.value.currentPage}&sub_id=${import.meta.env.VITE_USER_ID}&order=${order.value}`;
watchEffect(async()=>{ 
  loading.value = true;
  await store.getFavorites(qs);
  loading.value = false;
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