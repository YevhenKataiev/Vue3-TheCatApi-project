<template>
  <div class="filter">
    <h4>{{ title.toUpperCase() }}</h4>
    <select 
      @change="$emit('update:selected', $event.target.value)">
      <option v-if="title !== 'order'" :value="''">
        All
      </option>
      <option v-for="item in list" :value="item.id" :key="item.id">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
<script setup>
defineProps(['title', 'list', 'selected'])
defineEmits(['update:selected'])
</script>
<style scoped>
.filter {
  padding: 0 1em 0 1em;
  min-width: 150px;
  max-width: 200px;
  font-weight: 600;
  font-size: 18px;
}
select {
  width: 100%;
}
h4 {
  text-align: center;
}
</style>