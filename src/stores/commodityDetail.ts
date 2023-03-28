import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useDetailStore = defineStore('detail', () => {
  let currentCommodity = {
    name: "1",
    color: [],
    link: "/",
    price: 1
  } 
  return { currentCommodity}
})