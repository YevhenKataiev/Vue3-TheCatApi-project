<template>
  <section>
    <div class="slideshow-container">
      <div
        v-for="img in imgs"
        :key="img.id"
        class="mySlides fade"
      >
        <img :src="img.url">
      </div>
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>
    </div>
    <br>
    <div style="text-align:center">
      <span
        v-for="img in imgs"
        :key="img.id"
        class="dot"
        @click="currentSlide(1)"
      /> 
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
const imgs = defineProps({imgArr: Array});
const slideIndex = ref(0);

const plusSlides = (n)=>{
  showSlides(slideIndex.value += n);
}

const currentSlide = (n)=>{
  showSlides(slideIndex.value = n);
}

const showSlides = (n) => {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex.value = 1}    
  if (n < 1) {slideIndex.value = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex.value-1].style.display = "block";  
  dots[slideIndex.value-1].className += " active";
}
watch(imgs, ()=>{
  showSlides(slideIndex.value);
})
</script>

<style scoped>
* {box-sizing:border-box}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
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

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}
/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
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