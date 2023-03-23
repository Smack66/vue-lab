// import { ref, computed, reactive} from 'vue'
// import { defineStore } from 'pinia'
// import { Commodity } from './public.js/Commodity'


// // construct the fake data 
// let list: Array<Commodity> = []
// for(let i=0; i<10; i++){
//   let commodity: 
//   list.push(new Commodity(`Phone${i}`, i*100,'red', i, `/${i}`)) 
// }

// export const useShopcarStore = defineStore('shopcar', () => {
//   const itemList = reactive(list)
//   const checked = reactive([])
//   const totalCheckedPrice = ref(0)
//   const everyTotalPrices = reactive([])
//   return { itemList, checked, totalCheckedPrice, everyTotalPrices, }
// })

import { ref, computed, reactive, Ref, } from 'vue'
import { defineStore } from 'pinia'
import { Commodity } from './public.js/Commodity.ts'


// construct the fake data 
let list:Commodity[] = []
for(let i=0; i<10; i++){
  let commodity:Commodity = new Commodity(
    `Phone${i}`,
     i*100,'red', 
     i, 
     `/${i}`)
  list.push(commodity)
  // directly assgin will throw an error 
}

export const useShopcarStore = defineStore('shopcar', () => {
  const itemList: Commodity[] = reactive(list)
  const checked:boolean[] = reactive([])
  const totalCheckedPrice: Ref<number> = ref(0)
  const everyTotalPrices: number[] = reactive([])
  return { itemList, checked, totalCheckedPrice, everyTotalPrices, }
})