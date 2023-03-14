import { ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'

class Commodity {
 constructor(name, price, number){
    this.name = name 
    this.price= price 
    this.number = number 
 }
}
// construct the fake data 
let list = [] 
for(let i=0; i<10; i++){
   list.push(new Commodity(i+"", i*100, i)) 
}


export const useShopcarStore = defineStore('shopcar', () => {
  const itemList = reactive(list)
  const checked = reactive([])
  const totalCheckedPrice = ref(0)
  const everyTotalPrices = reactive([])
  return { itemList, checked, totalCheckedPrice, everyTotalPrices }
})