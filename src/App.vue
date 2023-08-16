<template>
  <header>
    <NavBar />
  </header>

  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
</script>



<style scoped>
header {
  max-height: 100vh;
}
</style>
