<template>
  <div class="filter">
    {{ props.title }}
    <select v-model="selected">
      <option v-for="item in props.list" :value="item" :key="item.id">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  title: String,
});
const selected = ref({});
</script>
<style scoped>
.filter {
  padding: 0 1em 0 1em;
  min-width: 100px;
}
select {
  width: 50px;
}
</style>