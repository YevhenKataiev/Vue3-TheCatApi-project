<template>
  <section>
    <div class="slideshow-container">
      <div class="slide-wrapper">
        <button class="prev" @click="plusSlides(-1)">&#10094;</button>
        <div class="img-wrapper">
          <img v-if="currentPhoto" :src="currentPhoto.url" class="fade" alt="Kitty"/>
        </div>   
        <button class="next" @click="plusSlides(1)">&#10095;</button>
      </div>    
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
  photoIndex.value = n;
  currentPhoto.value =  props.imgArr[n];
};

onMounted(()=> setSlide(photoIndex.value));
watchEffect(()=>{
  photoIndex.value < props.imgArr.length ? setSlide(photoIndex.value) : setSlide(0);
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
  object-fit: cover;
  width: 100%;
  height: 500px;
}
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: #916DB3;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border: none;
  user-select: none;
  background-color: #e9d2ff00;
}

.next {
  right: 0;
}

.prev:hover, .next:hover {
  background-color: #FDE5EC;
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #FCBAAD;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #E48586;
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