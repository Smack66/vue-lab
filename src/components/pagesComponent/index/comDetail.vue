<script  setup lang="ts">
import { ref, reactive, effect, Ref  } from 'vue';
import { useRouter } from 'vue-router';
import { useDetailStore } from "../../../stores/commodityDetail.js"
import { useShopcarStore } from "../../../stores/shopcar"
import { useSettlementStore } from "../../../stores/settlment.js"
import { sendAddShopcar } from "../../../../axios/api-request/user-shopping-cart"
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
const shoppingCommodityId = commodity.shoppingCommodityId
const commodityId = commodity.commodityId 

function addShopcar(): void{
   const shopcarStore = useShopcarStore()
   let currentCommodityExitInShopcarFlag: {flag: boolean, index: number}= currentCommodityExitInShopcar(shopcarStore, nowCommodityObject) 
   // add is short 
   sendAddShopcar(commodityId, nowCommodityObject.number).then((data: any)=>{
   shopcarStore.itemList = data.cartList
   //  const status = data.status
   //  commodity.shoppingCommodityId = nowCommodityObject.commodityId 
   // //  commodity.commodityId = 
   //  data.cartList.forEach(( item: any )=> {

   //    if(commodity.shoppingCommodityId === item.shoppingCommodityId){
   //       console.log(111);
   //       commodity.commodityId = item.commodityId
   //    }  
   //  });
   //  if(currentCommodityExitInShopcarFlag.flag){
   //     const index = currentCommodityExitInShopcarFlag.index
   //     shopcarStore.itemList[index].number +=  nowCommodityObject.number 
   //  }
   //  else if(!currentCommodityExitInShopcarFlag.flag){
   //       commodity.number = nowCommodityObject.number;
   //       shopcarStore.itemList.push(commodity)
   //  }
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
  commodity.number  = nowCommodityObject.number 
  settlementStore.singleCommodity.a = commodity
  settlementStore.origin = "detail"
}
function addComNumber(index: number): void{
   nowCommodityObject.number++
}
function subComNumber(index: number): void{
   nowCommodityObject.number--
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
               <!-- <div v-for="(item, key) in commodity">
                  {{ key }}
                  {{  item }}
               </div> -->
               {{ commodity.name}}
               {{ commodity.introduce}}
            </div>
            <div class="price">
               <h1>Price</h1>
                 price:{{ commodity.currency }} {{  commodity.price  }} 
            </div>
            <div class="color-option">
               <h1>Color</h1>
               color : {{  commodity.colorName }}
               <div style="background-color: gray; width: 20px;display: inline-block">&nbsp;</div>
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