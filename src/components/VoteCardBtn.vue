<template>
  <div class="btn-wrapper">
    <button @click="emit(props.action)">
      <font-awesome-icon :icon="btnIcon" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faHeart, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
const props = defineProps({
  action: String,
  isFav: {
    type: Boolean,
    default: false,
  }
});
const emit = defineEmits(['like','dislike','fav']);
const btnIcon = computed(() => {
  let icon;
  switch(props.action) {
    case 'like': icon = faHeart;break;
    case 'dislike': icon = faXmark;break;
    case 'fav': props.isFav ? icon = solidStar : icon = faStar;break;
  }
  return icon;
})
</script>

<style scoped>
button {
  background-color: #fff;
  border: none;
  border-radius: 70%;
  padding: 5px;
  height: 4em;
  width: 4em;
  box-shadow: 0 2px 4px rgb(219, 186, 212);
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-wrapper {
  padding-left: 2em;
  padding-right: 2em;
}
.svg-inline--fa {
  height: 2em;
}
.fa-star {
  color: #4083f7;
  fill:#4083f7 
}
.fa-xmark {
  color: #ff6666;
}
.fa-heart {
  color:#3bff86;
}
</style>