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
      <VoteCardBtn action="fav" :isFav="!!favoriteId" @fav="handleFavor()"/>
      <VoteCardBtn action="like" @like="handleChange('like')"/>
    </div>
  </div>
</template>

<script setup>
import VoteCardBtn from '../components/VoteCardBtn.vue';
import Loader from '@/components/Loader.vue';
import { onMounted, ref, computed} from 'vue';
import { get } from 'lodash';
import { getKity,voteKity, favorKity, loading } from '@/api';
const breed = ref({});
const favoriteId = ref('');
const getKityImg = async() => { 
  const data = await getKity();
  breed.value = data[0]; 
}
const handleFavor = async() => {
  favoriteId.value = await favorKity({
    favorId: favoriteId.value,
    id: breed.value.id
  })
}
  
onMounted(() => getKityImg());

const breedTitle = computed(() => {
  const title = get(breed.value, 'breeds[0].name');
  return title ? title : 'Mysterious Kitty';
})

const breedImg = computed(() => {
  const img = get(breed.value, 'url');
  return img ? img : null;
})
const handleChange = (payload) => {
  const id = breed.value.id;
  getKityImg();
  voteKity({payload, id});
  favoriteId.value = '';
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
  object-fit: cover;
  width: 100%;
  height: 500px;
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
