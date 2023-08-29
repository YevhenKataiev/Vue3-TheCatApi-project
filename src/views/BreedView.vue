<template>
  <main class="card">
    <Loader v-if="loading" />
    <div v-else>
      <div class="title">
        BREEDS:
        <select v-model="selectedBreed">
          <option v-for="item in breedsList" :value="item" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="container">
        <BreedCarousel v-if="!isEmpty(breedsImgsList)" :img-arr="breedsImgsList"/>
      </div>
    </div>   
  </main>
</template>
<script setup>
import Loader from '@/components/Loader.vue'
import { onMounted, ref, watch } from 'vue';
import { isEmpty } from 'lodash';
import BreedCarousel from '@/components/BreedCarousel.vue';
import{ loading } from '@/api';
import { useBreedStore } from "../store/breed";
import { storeToRefs } from 'pinia'

const breedStore = useBreedStore();
const { breedsList, breedsImgsList } = storeToRefs(breedStore);
const selectedBreed = ref({});

onMounted(async () => {
  loading.value = true
  await breedStore.getBreedList()
  selectedBreed.value = breedsList.value[0]
  loading.value = false
});
watch(selectedBreed, async (newValue) => {
  loading.value = true
  await breedStore.getBreedImgList(newValue.id);
  loading.value = false
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
