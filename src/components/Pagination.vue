<template>
  <div class="pagination">
      <button
        type="button"
        :class="[
            'pagination-btn',
            { 'active': page === currentPage + 1 }
        ]"
        v-for="page in totalPages"
        :key="page"
        @click="$emit('changePage', page)"
      >
        {{ page }}
      </button>
  </div>
</template>
<script setup>
defineProps(['currentPage', 'totalPages']);
defineEmits(['changePage'])
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  padding-top: 1em;
}
.pagination-btn {
  color: #fff;
  height: 2em;
  width:  2em;
  margin-right: 1em;
  background-color: #FCBAAD;
  border: none;
  border-radius: 30%;
}
.pagination-btn.active {
  background-color: #E48586;
}
</style>