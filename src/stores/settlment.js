import { ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'

export const useSettlementStore = defineStore('settlement', () => {
  let origin = ref("")
  let singleCommodity = reactive({a:{}})
  return {origin, singleCommodity }
})
