import { ref, computed } from 'vue'
import { get } from 'lodash'

export const usePagination = (props) => {
  const pagination = ref({
    page: get(props, 'currentPage', 0),
    limit: get(props, 'limit', 1),
  });
  const total = ref(get(props, 'total', 1));
  const totalPages = computed(()=>{
    return pageCount.value > 10 ?  10 : pageCount.value
  });
  const changePage = (num) => {
    pagination.value.page = num - 1; // api pages starts from 0  
  }
  const pageCount = computed(()=>{
    return Math.ceil(total.value/pagination.value.limit)
  })
  return {
    pagination, changePage, totalPages, total
  }
}