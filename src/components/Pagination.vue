<template>
  <div class="pagination">
      <button
        type="button"
        :class="[
            'pagination-btn',
            { 'active': page === pagination.currentPage + 1 }
        ]"
        v-for="page in pagination.totalPages"
        :key="page"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
  </div>
</template>
<script setup>
import { pagination } from '@/api'

const changePage = (num) => {
  pagination.value.currentPage = num -1; // api pages starts from 0
  
}
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
  background-color: rgba(255, 0, 255, 0.614);
  border: none;
  border-radius: 30%;
}
.pagination-btn.active {
  background-color: rgb(255, 0, 157);
}
</style>