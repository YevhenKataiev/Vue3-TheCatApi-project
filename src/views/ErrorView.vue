<template>
  <div class="about">
    <h1>Sorry, app has some error</h1>
    <div>
      {{ props.error }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({error: String});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
