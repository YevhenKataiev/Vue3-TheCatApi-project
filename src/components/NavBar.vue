<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/">Find</RouterLink>
      <RouterLink to="/breeds">Breeds</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
      <RouterLink to="/favorites">Favorites</RouterLink>
      <RouterLink to="/upload">Upload</RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
nav {
  width: 100%;
  text-align: center;
  font-size: 1rem;
  padding: 1rem 0;
  margin-top: 1rem;
  /* margin-top: 2rem; */
}

nav a.router-link-exact-active {
  color: #fff;
  border-radius: 12px;
  background-color: #FCBAAD;
}

/* nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

nav a {
  display: inline-block;
  padding: 0 1rem;
  /* border-left: 1px solid var(--color-border); */
}

nav a:first-of-type {
  border: 0;
}


header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}


</style>
