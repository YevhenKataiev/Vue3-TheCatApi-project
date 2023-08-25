import { ref } from 'vue'
import { get } from 'lodash'

export const usePagination = (props = {}) => {
  const newPag = {
    currentPage: get(props, 'currentPage', 0),
    limit: get(props, 'limit', 1),
    totalPages: get(props, 'totalPages', 1),
  }
  const pagination = ref(newPag);
  const changePage = (num) => {
    pagination.value.currentPage = num - 1; // api pages starts from 0
    
  }
  return {
    pagination, changePage
  }
}