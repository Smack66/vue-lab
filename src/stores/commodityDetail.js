import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useDetailStore = defineStore('detail', () => {
  let currentCommodity = ref(1)
  return { currentCommodity}
})