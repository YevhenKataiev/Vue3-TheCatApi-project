<template>
  <section class="wrapper">
    <img
      v-for="img in imgArr"
      :key="img.id"
      :src="img.url"
      class="fade img"
      alt="Kitty"
    />
  </section>
</template>

<script setup>
defineProps({
  imgArr: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.wrapper {
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr 1fr;
  justify-items :center;
  align-items: center;
}
.img {
  object-fit: cover;
  width: 100%;
  height: 300px;
}
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
</style>