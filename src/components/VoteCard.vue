<template>
  <div>
    <div class="title">
      {{ breed }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
const breed = ref({});
onMounted(async() => {
  const config = {
    headers: { 'x-api-key' : 'live_4A66sBHfE3ydx7n3QVnwlRVK4wQIgzzp30fRsxRLBl3aKNLgdEyUHigpRcjfprB9' }
  };
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search', config);
    breed.value = data[0]
});

</script>
