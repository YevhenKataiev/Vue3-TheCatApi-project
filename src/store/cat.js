import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCatStore = defineStore('cat', () => {
  const count = ref({})

  const doubleCount = computed(() => count.value * 2)
  async function increment() {
    count.value++
  }

  return { count,  doubleCount, increment }
})