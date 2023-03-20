import { ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import { Commodity } from './public.js/Commodity'

// construct the fake data 
let list = [] 
for(let i=0; i<10; i++){
   list.push(new Commodity(`Phone${i}`, i*100,'red', i, `/${i}`)) 
}

export const useShopcarStore = defineStore('shopcar', () => {
  const itemList = reactive(list)
  const checked = reactive([])
  const totalCheckedPrice = ref(0)
  const everyTotalPrices = reactive([])
  return { itemList, checked, totalCheckedPrice, everyTotalPrices, }
})