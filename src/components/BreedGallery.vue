<template>
  <section>
    <div class="slideshow-container">
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <img v-if="currentPhoto" :src="currentPhoto.url" class="fade" alt="Kitty"/>   
      <a class="next" @click="plusSlides(1)">&#10095;</a>
    </div>
    <br>
    <div style="text-align:center">
      <span
        v-for="(img, index) in props.imgArr"
        :key="index"
        class="dot"
        :class="{ 'active': index === photoIndex }"
        @click="setSlide(index)"
      /> 
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
const props = defineProps({
  imgArr: {
    type: Array,
    default: () => []
  }
});
const photoIndex = ref(0);
const currentPhoto = ref({});
const setSlide = (n) => {
  // const k = photoIndex.value + n;
  // if ( k > props.imgArr.length - 1 ) {
  //   setSlide(0);
  // } else if (k < 0) {
  //   setSlide(props.imgArr.length - 1);
  // } else {
  //   setSlide(photoIndex.value + n);
  // }
  photoIndex.value = n;
  currentPhoto.value =  props.imgArr[n];
};

onMounted(()=> setSlide(photoIndex.value));
watchEffect(()=>{
  setSlide(photoIndex.value);
})
const plusSlides = (n) => {
  const k = photoIndex.value + n;
  if ( k > props.imgArr.length - 1 ) {
    setSlide(0);
  } else if (k < 0) {
    setSlide(props.imgArr.length - 1);
  } else {
    setSlide(photoIndex.value + n);
  }
}

</script>

<style scoped>
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

img {
  max-height: 500px;
  width: 500px;
}
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #ff797969;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #ff6666;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
</style>