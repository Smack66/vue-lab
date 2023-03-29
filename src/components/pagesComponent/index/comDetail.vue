<script  setup lang="ts">
import { ref, reactive, effect, Ref  } from 'vue';
import { useDetailStore } from "../../../stores/commodityDetail.js"
import {  useShopcarStore } from "../../../stores/shopcar"
import { useSettlementStore } from "../../../stores/settlment.js"
import { useRouter } from 'vue-router';
import {request } from "../../../../axios/request"
const detailStore = useDetailStore()
const router = useRouter()

let picked = ref("red");
const commodity = detailStore.currentCommodity
let nowCommodityObject = reactive({commodityId: commodity.commodityId  , name:commodity.name , price:commodity.price, number: 1, })
let minCountDisabled: Ref<boolean> =  ref(false) 

effect(()=>{
  if(nowCommodityObject.number <=1) {
   minCountDisabled.value = true
  }else {
   minCountDisabled.value = false 
  }
})
const commodityId = commodity.shoppingCommodityId
const sendAddShopcar = sendOperateShopCar("add") 

function addShopcar(): void{
   const shopcarStore = useShopcarStore()
   let currentCommodityExitInShopcarFlag: {flag: boolean, index: number}= currentCommodityExitInShopcar(shopcarStore, nowCommodityObject) 
   sendAddShopcar(commodityId, nowCommodityObject.number).then((data)=>{
    const status = data.status
    if(currentCommodityExitInShopcarFlag.flag){
       const index = currentCommodityExitInShopcarFlag.index
       shopcarStore.itemList[index].number +=  nowCommodityObject.number 
    }
    else if(!currentCommodityExitInShopcarFlag.flag){
         commodity.number = nowCommodityObject.number;
         shopcarStore.itemList.push(commodity)
    }
   })
   
   
}
function currentCommodityExitInShopcar(shopcarStore: any, currentCommodity: any): {flag: boolean, index: number}{
   let flag: boolean = false; 
   let index: number = -1
   // judge by ID 
   for(index=0; index<shopcarStore.itemList.length ; index++){
         if(shopcarStore.itemList[index].commodityId === nowCommodityObject.commodityId){
            flag = true
            break;
         }
      }
   return {
      flag,
      index
   };
}
function settlement(): void{
  router.push({
     path:"/settlement"
  })
  const settlementStore = useSettlementStore()
  const commodity = detailStore.currentCommodity
  settlementStore.singleCommodity.a = commodity
  settlementStore.origin = "detail"
}
function addComNumber(index: number): void{
   nowCommodityObject.number++
}
function subComNumber(index: number): void{
   nowCommodityObject.number--
}
function sendOperateShopCar(operation: string): Function {
  return async function (id: number, count: number) : Promise<any>{
    let method: string = "";
    if(operation === "add") method = "post" 
    else if(operation === "delete") method = "delete" 
    else {
      throw "wrong operation"
    }
    return request({
      url:`/api/user/shopping/cart/${id}/${count}`,
      method: method,
      withCredentials: true,
    }).then((suc) => {
      console.log(suc.data);
      return suc.data;
    });  
  }
}
</script>
<template>
  <div class="common-layout outer">
    <el-container>
       <div class="show-container">
         <img src="@/assets/mobile-icon.jpg" alt="" class="img"> 
         <div class="info-box">
            <div class="name">
               <h1>Name</h1>
               <div v-for="(item, key) in commodity">
                  {{ key }}
                  {{  item }}
               </div>
               {{ commodity.name}}
            </div>
            <div class="price">
               <h1>Price</h1>
                 price: {{  commodity.price  }} 
            </div>
            <div class="color-option">
               <h1>Color</h1>
               color : {{  picked  }}
               <div class="mb-2 flex items-center text-sm">
                  <el-radio-group v-model="picked" class="ml-4">
                    <!-- <el-radio v-for="colorItem in colorList" :label="colorItem" size="large">{{ colorItem}} </el-radio> -->
                  </el-radio-group>
               </div>
            </div>
         </div>
       </div>
       <div style="position: absolute; top: 25rem; left: 34rem">
         <el-button @click="subComNumber" style="height: 1.5rem" :disabled="minCountDisabled">-</el-button>
           <div class="number" style="display: inline-block"> &nbsp;&nbsp;{{nowCommodityObject.number}}&nbsp;&nbsp;</div>
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