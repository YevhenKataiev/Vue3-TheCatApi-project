<template>
  <div class="content-wrapper">
    <div class="title">
      {{ breedTitle }}
    </div>
    <div class="content">
      <Loader v-if="loading" />
      <div v-if="breedImg"  class="img-wrapper">
        <img :src="breedImg" alt="Kitty" />
      </div>
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
import { loading } from '@/api';
import { useFavoriteStore } from "../store/favorite";
import { useCatStore } from "../store/cat";
const favoriteStore = useFavoriteStore();
const catStore = useCatStore();

const breed = ref({});
const favoriteId = ref('');
const getKityImg = async() => {
  loading.value = true
  await catStore.getCatData()
  breed.value = catStore.catData[0]
  loading.value = false
}
const handleFavor = async() => {
  favoriteId.value = await favoriteStore.postOrDeleteFavorite({
    favorId: favoriteId.value,
    imgId: breed.value.id
  })
}
  
onMounted(async() => getKityImg());

const breedTitle = computed(() => {
  const title = get(breed.value, 'breeds[0].name')
  return title ? title : 'Mysterious Kitty'
})

const breedImg = computed(() => {
  const img = get(breed.value, 'url')
  return img ? img : null;
})
const handleChange = async (payload) => {
  const imgId = breed.value.id
  loading.value = true
  await catStore.voteForCat({payload, imgId})
  await getKityImg()
  favoriteId.value = ''
  loading.value = false
}
</script>

<style scoped>
.content-wrapper {
  min-width: 400px;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  
}
.img-wrapper {
  display: block;
  max-width: 500px;
  width: 100%;
}
img {
  display: block;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  
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
  color: #E48586;
}
</style>
