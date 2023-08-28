import { ref } from 'vue'
import { get } from 'lodash'

export const usePagination = (props) => {
  const pagination = ref({
    page: get(props, 'currentPage', 0),
    limit: get(props, 'limit', 1),
    totalPages: get(props, 'totalPages', 1),
  });
  // const totalPages = get(props, 'totalPages', 1),
  const changePage = (num) => {
    pagination.value.page = num - 1; // api pages starts from 0  
  }
  debugger
  return {
    pagination, changePage, currentPage:pagination.value.page 
  }
}