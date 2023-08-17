<template>
  <div>
    <div class="title">
      {{ breedTitle }}
    </div>
    <div class="content">
      <Loader v-if="loading" />
      <img v-else :src="breedImg" alt="Kitty">
    </div>
    <div class="panel">
      <VoteCardBtn action="dislike" @dislike="handleChange('dislike')"/>
      <VoteCardBtn action="fav" :isFav="!!favoriteId" @fav="favorKity()"/>
      <VoteCardBtn action="like" @like="handleChange('like')"/>
    </div>
  </div>
</template>

<script setup>
import VoteCardBtn from '../components/VoteCardBtn.vue';
import Loader from '@/components/Loader.vue';
import router from '../router';
import { onMounted, ref, computed} from 'vue';
import axios from 'axios';
import { get } from 'lodash';
import { api_url, config } from '../help';
const breed = ref({});
const favoriteId = ref('');
const loading = ref(true);
const getKity = async() => {
  loading.value = true; 
  try {
    const { data } = await axios.get(`${api_url}/images/search`, config);
    breed.value = data[0]
    const fav = await axios.get(
      `${api_url}/favorites?image_id=${breed.value.id}`, config);
    favoriteId.value = get(fav, 'id','');
  } catch (error) {
    // router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  } finally {
    loading.value = false;
  }  
}
const voteKity = async (prop) => {
  const body = {
    image_id: breed.value.id,
    value: prop === 'like' ? 1: -1,
  };
  try {
    await axios.post(`${api_url}/votes`, body, config);    
  } catch (error) {
    router.push({ name: 'error', params: { error: get(error, 'response.data') } })
  }
}
const favorKity = async() => {
  let end,body;
  if(favoriteId.value) {
    end = `/${favoriteId.value}`;
    const { data } = await axios.delete(`${api_url}/favourites${end}`, config);
    if (data.message === 'SUCCESS') {
      favoriteId.value = data.id;
    }
  } else {
    body = {
      image_id: breed.value.id,
    };
    const {data } = await axios.post(`${api_url}/favourites`, body, config);
    if (data.message === 'SUCCESS') {
      favoriteId.value = data.id;
    }
  }; 
};
  
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
  getKity();
  voteKity(e);
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
</style>
