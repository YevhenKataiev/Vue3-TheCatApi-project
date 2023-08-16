<template>
  <div>
    <div class="title">
      {{ breedTitle }}
    </div>
    <div class="content">
      <div v-if="loading" class="loader" />
      <img v-else :src="breedImg" alt="Kitty">
    </div>
    <div class="panel">
      <VoteCardBtn action="dislike" @dislike="handleChange('dislike')"/>
      <VoteCardBtn action="fav" @fav="handleChange('fav')"/>
      <VoteCardBtn action="like" @like="handleChange('like')"/>
    </div>
  </div>
</template>

<script setup>
import VoteCardBtn from './VoteCardBtn.vue';
import router from '../router';
import { onMounted, ref, computed} from 'vue';
import axios from 'axios';
import { get } from 'lodash';

const breed = ref({});
const loading = ref(true);
const getKity = async() => {
  loading.value = true;
  const config = {
    headers: { 'x-api-key' : 'live_4A66sBHfE3ydx7n3QVnwlRVK4wQIgzzp30fRsxRLBl3aKNLgdEyUHigpRcjfprB9' }
  };
  try {
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search', config);
    breed.value = data[0]
  } catch (error) {
    router.push({ name: 'error', params: { error: error.response.data } })
  } finally {
    loading.value = false;
  }
  
} 
onMounted(() =>getKity());
const breedTitle = computed(() => {
  const title = get(breed.value, 'breeds[0].name');
  return title ? title : 'Mysterious Kitty';
})
const breedImg = computed(() => {
  const img = get(breed.value, 'url');
  return img ? img : null;
})
const handleChange = (e) => {
  if (e !== 'fav') {
    getKity();
  }
}
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  
}
img {
  height: 500px;
  max-width: 1024px;
  border-radius: 1.5rem;
}
.panel {
  display: flex;
  justify-content: space-evenly;
  padding-top: 0.5em;
}
.title {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  color: #fff;
}
.loader {
  border: 16px solid #e369d554; 
  border-top: 16px solid #ff6666;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>