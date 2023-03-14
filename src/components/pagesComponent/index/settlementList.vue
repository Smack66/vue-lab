<script lang="ts" setup>
import { Ref, ref, reactive, effect } from 'vue';
import { useShopcarStore  } from "../../../stores/shopcar.js"
const store = useShopcarStore()
const itemList = store.itemList
const checked = store.checked 
const totalCheckedPrice = store.totalCheckedPrice
const  everyTotalPrices = store.everyTotalPrices

const shopcarItem = itemList
//filter the data from 
// one time , don't need to be reactive 
const settlementItem = shopcarItem.filter((item, index)=>{
   return checked[index];
})
const settlementEveryPrices = everyTotalPrices.filter((item, index) => {
    return checked[index];
})
console.log(everyTotalPrices);
console.log(settlementEveryPrices);
  

const addressList = [{value: 'China', label:'China'},{value: 'USA', label:'USA'}]
let selectedAddress = ref(addressList[0].value)
</script>
<template>
    <div v-for="(item,index) in settlementItem" class="item">
        <div class="main-box">
           data content:{{ item }} 
           index: {{  index  }}
        </div>
        <div class="right-box">
            the total price of that item is: {{  settlementEveryPrices[index] }}
        </div>
    </div>  
    <div class="address">
        <h1>Please select your address</h1>
        {{  selectedAddress }}
        <el-select v-model="selectedAddress" placeholder="Select">
            <el-option
              v-for="item in addressList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
    </div>
    <div sum-box>
        total Price is : {{  totalCheckedPrice  }}
    </div>
    <button class="settle">settle</button>
</template>
<style scoped>
.item {
    display: flex;
    width: 100%;
    height: 8rem;
    flex-wrap: wrap;
}
.item .main-box {
    background-color: cadetblue;
    flex : 80%;
}
.item .right-box{
    background-color: aquamarine;
    flex : 20%;
}
</style>
