<template>
  <div>
    <div class="title">
      {{ breedTitle }}
    </div>
    <div class="img">
      <img :src="breedImg" alt="Kitty">
    </div>
    <div class="panel">
      <div role="button">Dislike</div>
      <div role="button">Add to fav</div>
      <div role="button">Like</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { get } from 'lodash';

const breed = ref({});
onMounted(async() => {
  const config = {
    headers: { 'x-api-key' : 'live_4A66sBHfE3ydx7n3QVnwlRVK4wQIgzzp30fRsxRLBl3aKNLgdEyUHigpRcjfprB9' }
  };
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search', config);
    breed.value = data[0]
});
const breedTitle = computed(() => {
  const title = get(breed.value, 'breeds[0].name');
  return title ? title : 'Mysterious Kitty';
})
const breedImg = computed(() => {
  const img = get(breed.value, 'url');
  return img ? img : '';
})
</script>

<style scoped>
.img {
  display: flex;
  align-items: center;
  justify-content: center;
  
}
img {
  height: 500px;
}
.panel {
  display: flex;
  justify-content: space-evenly;
}
.title {
  text-align: center;
  font-weight: 700;
  font-size: 18px;
}
</style>