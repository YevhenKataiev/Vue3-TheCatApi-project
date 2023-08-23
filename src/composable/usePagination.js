import { ref } from 'vue'

export const usePagination = (props) => {
  const newPag = {
    currentPage: props.currentPage || 0,
    limit: 4,
    totalPages: props.totalPages || 1,
  }
  const pagination = ref(newPag);
  const changePage = (num) => {
    pagination.value.currentPage = num - 1; // api pages starts from 0
    
  }
  return {
    pagination, changePage
  }
}