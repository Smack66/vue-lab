<script lang="ts" setup>
import { Ref, ref, reactive, effect } from 'vue';
import { useRouter } from 'vue-router';
import { useShopcarStore  } from "../../../stores/shopcar.js"
import { useSettlementStore } from "../../../stores/settlment.js"


const router = useRouter()
const settlementStore = useSettlementStore()
const store = useShopcarStore()
let itemList = store.itemList
let checked = store.checked 
let totalCheckedPrice = store.totalCheckedPrice
let everyTotalPrices = store.everyTotalPrices
let shopcarItem = itemList
//filter the data from 
// one time , don't need to be reactive 
let settlementItem = shopcarItem.filter((item, index)=>{
   return checked[index];
})
let settlementEveryPrices = everyTotalPrices.filter((item, index) => {
    return checked[index];
})


if(settlementStore.origin === "detail"){
   let commodity = settlementStore.singleCommodity.a;
   settlementItem = reactive([commodity])
   settlementEveryPrices = reactive([commodity.price]) 
   totalCheckedPrice = commodity.price
}
const addressList = [{value: 'China ZhejiangProvince Ningbo Binjiang', label:'China'},{value: 'USA Sanfranscico Morolgo', label:'USA'}]
let selectedAddress = ref(addressList[0].value)

function removeItem(){
  // after filter, remove the corresponding item
  store.itemList = itemList.filter((item, index)=>{
  return !checked[index] 
})
}
function settleSuccess(){
    removeItem()
    const path = "/index"
    alert("付款成功")
    window.setTimeout(()=>{
      router.push({path}) 
    },3000)
}
const addressStyle = reactive({animatedUp : false,"address": true})
let selected = ref(true) 
function confirm(){
  addressStyle.animatedUp= true;
  selected.value = false 
}
function selectAddress(){
  addressStyle.animatedUp = false;
  selected.value = true 
}
</script>
<template>
    <div v-for="(item,index) in settlementItem" class="item">
        <div class="main-box">
            <img src="../../../assets/com.webp" alt="" style="width: 6rem">
           data content:{{ item }} 
           <!-- index: {{  index  }} -->
        </div>
        <div class="right-box">
            the total price of that item is: {{  settlementEveryPrices[index] }}
        </div>
    </div>  
    {{ selectedAddress }}
    <el-button @click="selectAddress" :disabled="selected">Select the address</el-button>
    <div style="overflow:hidden">
    <div :class="addressStyle" >
        <h1>Please select your address</h1>
        <div class="mb-2 flex items-center text-sm slideup">
          <el-radio-group v-model="selectedAddress" class="ml-4">
             <el-radio :label="item.value" size="large" v-for="item in addressList"  :value="item.value" >
                {{ item.value}}
             </el-radio>
          </el-radio-group>
          <el-button @click="confirm" class="Confirm">确认</el-button>
        </div> 
    </div>
    </div>

    <div sum-box>;
        total Price is : {{  totalCheckedPrice  }}
    </div>
    <button class="settle" @click="settleSuccess">settle</button>
 
</template>
<style scoped>
.item {
    display: flex;
    width: 100%;
    height: 8rem;
    flex-wrap: wrap;
}
.item .main-box {
    flex : 80%;
}
.item .right-box{
    flex : 20%;
}

 
.animatedUp{
  animation-duration: 3s;
  animation-name: upslide;
  animation-fill-mode: forwards;
}
@keyframes upslide{
  0%{
     
  }
  100%{
   overflow:hidden;
   transform: translateY(-250%);
   height: 0;
  }
}
</style>
