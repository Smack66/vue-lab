<script  setup>
import { ref, reactive, effect  } from 'vue';
import { RouterLink  } from 'vue-router';
import { useDetailStore } from "../../../stores/commodityDetail.js"
import {  useShopcarStore } from "../../../stores/shopcar.js"
import { useSettlementStore } from "../../../stores/settlment.js"
import { useRoute, useRouter } from 'vue-router';
import { formItemValidateStates } from 'element-plus';

const store = useShopcarStore()
const detailStore = useDetailStore()
const router = useRouter()

const commodity = detailStore.currentCommodity
//back-end 
let price = commodity.price 
let comName = commodity.name
let colorList = commodity.color
// specific data 
//intermeddle part 
const colorLinkMap = new Map()
const reacitveColorLinkMap = reactive(colorLinkMap)
colorList.forEach((colorItem) => {reacitveColorLinkMap.set(colorItem, "/" + colorItem )});
 // user-data
let picked = ref("red");
// let picLink = ref(reacitveColorLinkMap.get(picked.value))
const commodityInShopcar = reactive({name: comName, price: price, color: picked, number: 1, src: commodity.link })

let minCountDisabled = ref(false) 
effect(()=>{
  if(commodityInShopcar.number <=0) {
   minCountDisabled = true
  }else {
   minCountDisabled = false 
  }
  console.log(minCountDisabled);
})

function addShopcar(){
   const shopcarStore = useShopcarStore()
   let flag = false 
   for(let i=0; i<shopcarStore.itemList.length ; i++){
      if(shopcarStore.itemList[i].name === commodityInShopcar.name){
         shopcarStore.itemList[i].number +=   commodityInShopcar.number 
         flag = true
         break;
      }
   }
   console.log(flag);
   if(!flag) shopcarStore.itemList.push(commodityInShopcar)
}
function settlement(){
  console.log(router);
  router.push({
     path:"/settlement"
  })
  const settlementStore = useSettlementStore()
  const commodity = detailStore.currentCommodity
  settlementStore.singleCommodity.a = commodity
  settlementStore.origin = "detail"
}
function addComNumber(index){
   commodityInShopcar.number++
}
function subComNumber(index){
   commodityInShopcar.number--
}
</script>
<template>
  <div class="common-layout outer">
    <el-container>
       <div class="show-container">
         <img src="../../../assets/commodity.webp" alt="" class="img"> 
         <div class="info-box">
            <div class="name">
               <h1>Name</h1>
               {{ comName  }}
            </div>
            <div class="price">
               <h1>Price</h1>
                 price: {{  price  }} 
            </div>
            <div class="color-option">
               <h1>Color</h1>
               color : {{  picked  }}
               picture link : {{  colorLinkMap.get(picked) }}
               <div class="mb-2 flex items-center text-sm">
                  <el-radio-group v-model="picked" class="ml-4">
                    <el-radio v-for="colorItem in colorList" :label="colorItem" size="large">{{ colorItem}} </el-radio>
                  </el-radio-group>
               </div>
            </div>
         </div>
       </div>
       <div style="position: absolute; top: 25rem; left: 34rem">
         <el-button @click="subComNumber" style="height: 1.5rem" :disabled="minCountDisabled">-</el-button>
           <div class="number" style="display: inline-block"> &nbsp;&nbsp;{{commodityInShopcar.number}}&nbsp;&nbsp;</div>
         <el-button @click="addComNumber" style="height: 1.5rem">+</el-button>
       </div>
       <div class="button-group">
         <div class="add">
                <el-button @click="addShopcar">
                  addInShopcar
                </el-button>
         </div> 
         <div class="buy">
             <el-button @click="settlement">
                Buy buy buy
             </el-button>
         </div>
       </div>
    </el-container>
  </div> 
</template>
<style scoped>
.img {
   position: relative;
   left: -15rem;
   top: -5rem;;
    width: 40rem;
    height: 40rem;
}
.outer{
   position: relative;
   left: 30%;
}
.button-group {
   position: absolute;
   top: 25rem;
   left: 23rem;
}
.info-box{
   position: absolute;
   top:  6rem;
   left: 23rem;
}
</style>