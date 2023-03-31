<script lang="ts" setup>
import { Ref, ref, reactive, effect } from 'vue';
import { useRouter } from 'vue-router';
import { useShopcarStore  } from "../../../stores/shopcar.js"
import { useSettlementStore } from "../../../stores/settlment.js"
import { sendUserInfoRequest} from "../../../../axios/api-request/user-info"
import { sendDeleteShopcar} from "../../../../axios/api-request/user-shopping-cart"
const router = useRouter()
const settlementStore = useSettlementStore()
const store = useShopcarStore()
let itemList = store.itemList
let checked = store.checked 
let totalCheckedPrice = store.totalCheckedPrice
let everyTotalPrices = store.everyTotalPrices
let shopcarItem = itemList
let settlementItem = shopcarItem.filter((item, index)=>{
   return checked[index];
})
let settlementEveryPrices = everyTotalPrices.filter((item, index) => {
    return checked[index];
})

if(settlementStore.origin === "detail"){
   let commodity = settlementStore.singleCommodity.a;
   settlementItem = reactive([commodity])
   settlementEveryPrices = reactive([commodity.number * commodity.price])
   totalCheckedPrice = settlementEveryPrices[0]
}

const addressList: Array<any> = reactive([]) 
sendUserInfoRequest().then((data)=>{
  data.addressList.forEach((item: any)=> {
   addressList.push(item) 
  });
})


let selectedAddress = ref(addressList[0])
function settleSuccess(): void{
    removeItem()
    const path = "/index"
    alert("付款成功")
    window.setTimeout(()=>{
      router.push({path}) 
    },3000)
}
function removeItem(): void{
  // after filter, remove the corresponding item
  store.itemList = itemList.filter((item, index)=>{
  if(checked[index]){
    const commodityId = item.commodityId
    const number = item.number
    // const shopcarCommodityId = itemList[index].shoppingCommodityId
    sendDeleteShopcar(commodityId, number)
  }
  return !checked[index] 
})
}
const addressStyle = reactive({animatedUp : false,"address": true})
let selected = ref(true) 
function confirm(): void{
  addressStyle.animatedUp = true;
  selected.value = false 
}
function selectAddress(): void{
  addressStyle.animatedUp = false;
  selected.value = true 
}
</script>
<template>
    <div v-for="(item,index) in settlementItem" class="item">
        <div class="main-box">
            <img src="../../../assets/com.webp" alt="" style="width: 6rem">
           {{  item.name + item.introduce }}
           {{ item.colorName }}
        </div>
        <div class="right-box">
            ${{  settlementEveryPrices[index] }}
        </div>
    </div>  
    <el-button @click="selectAddress" :disabled="selected">请选择地址</el-button>
    <div style="overflow:hidden">
    <div :class="addressStyle" style="position: relative; left: 27%;" >
        <h2>请选择地址</h2>
        <div class="mb-2 flex items-center text-sm slideup">
          <el-radio-group v-model="selectedAddress" class="ml-4">
          <el-radio :label="item.addressId" size="large" v-for="item in addressList"  :value="item.addressId" >
              {{ item.firstName + item.lastName  }}
              <br>
              {{  item.address }}
              <br>
              {{  item.phone }}
             </el-radio>
          </el-radio-group>
          <br>
          <br>
          <el-button @click="confirm" class="Confirm">确认</el-button>
        </div> 
    </div>
    </div>
    <h2 sum-box style="text-align:center" >
        ${{  totalCheckedPrice  }}
    </h2>
    <el-button class="settle" @click="settleSuccess" style="position: relative; left: 48%" >结算</el-button>
 
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
