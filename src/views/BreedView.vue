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
        <BreedCarousel v-if="!isEmpty(breedImgs)" :img-arr="breedImgs"/>
      </div>
    </div>   
  </main>
</template>
<script setup>
import Loader from '@/components/Loader.vue'
import { onMounted, ref, watch } from 'vue';
import { isEmpty } from 'lodash';
import BreedCarousel from '@/components/BreedCarousel.vue';
import{ getBreeds, getBreedsImages, loading } from '@/api';
const breedsList = ref([]);
const selectedBreed = ref({});
const breedImgs = ref([]);

onMounted(async () => {
  breedsList.value = await getBreeds();
  selectedBreed.value = breedsList.value[0];
});
watch(selectedBreed, async (newValue) => {
  breedImgs.value = await getBreedsImages(newValue.id);
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
