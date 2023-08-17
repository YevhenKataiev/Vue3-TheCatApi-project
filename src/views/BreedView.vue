<template>
  <main class="card">
    <Loader v-if="loading" />
    <div v-else>
      <div class="title">
        Breeds:
        <select v-model="selectedBreed">
          <option v-for="item in breedsList" :value="item" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="container">
        <BreedGallery v-if="!isEmpty(breedImgs)" :img-arr="breedImgs"/>
      </div>
    </div>   
  </main>
</template>
<script setup>
import Loader from '@/components/Loader.vue'
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import router from '@/router';
import { api_url, config } from '@/help';
import { get, isEmpty } from 'lodash';
import BreedGallery from '@/components/BreedGallery.vue';
const breedsList = ref([]);
const selectedBreed = ref({});
const breedImgs = ref([]);
const loading = ref(true);
const getBreedsList = async() => {
  loading.value = true; 
  try {
    const { data } = await axios.get(`${api_url}/breeds`, config);
    breedsList.value = data;
    selectedBreed.value = data[0];
    // getBreedsImages(selectedBreed.value.id);
  } catch (error) {
    router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  } finally {
    loading.value = false;
  } 
}
const getBreedsImages = async(id) => {
  try {
    const { data } = await axios.get(`${api_url}/images/search?breed_ids=${id}&limit=10`, config);
    breedImgs.value = data;
  } catch (error) {
    router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  }
}
onMounted(() => getBreedsList());
watch(selectedBreed, async (newValue) => {
  getBreedsImages(newValue.id);
});
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
}
</style>
