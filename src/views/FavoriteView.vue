<template>
  <main class="card">  
    <div class="title-wrapper">
      <div class="title">
        <SearchFilter title="order" :list="orderList" v-model:title="order"/>
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
import { ref, onMounted, watchEffect } from 'vue';
import { loading, getFavor } from '@/api';
const orderList = [ 
  { name:'ASC', id: 'ASC'},
  { name:'DESC', id: 'DESC'}
];
const order = ref('ASC');
const imgList = ref([]);

onMounted(async() => {
  imgList.value = await getFavor(order.value);
})
watchEffect(async()=>{
  imgList.value = await getFavor(order.value);
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