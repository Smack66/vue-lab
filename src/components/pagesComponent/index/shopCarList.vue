<script  lang="ts" setup>
import { reactive, effect } from 'vue';
import { useShopcarStore } from "../../../stores/shopcar.js"
import { useSettlementStore } from "../../../stores/settlment.js"
import { RouterLink } from 'vue-router';
import { sendAddShopcar, sendDeleteShopcar } from "../../../../axios/api-request/user-shopping-cart"
import { sendUserInfoRequest } from "../../../../axios/api-request/user-info";
const store = useShopcarStore()
const settlementStore = useSettlementStore()
const itemList: Array<any> = store.itemList 
const checked: Array<boolean> = store.checked 

//reactive 
for(let i=0; i < itemList.length; i++){
  checked[i] = false;
}
let totalCheckedPrice = store.totalCheckedPrice
let everyTotalPrices = store.everyTotalPrices 
let disabled: Array<boolean> = reactive([])
// bind
effect(() => {
  // init
  totalCheckedPrice = 0
  everyTotalPrices = []
  //every Item price
  itemList.forEach((item, index) => {
    const price = item.price;
    const number = item.number;
    everyTotalPrices.push(price * number) ;
    if(number<=1){
     disabled[index]= true;
    }else {
     disabled[index]= false;
    }
  })
  //filter item list by the checked array 
  let filteredEveryPrice = everyTotalPrices.filter((item, index) => {
    return checked[index]
  }) 
  totalCheckedPrice = filteredEveryPrice.reduce((preValue, nowValue)=>{
    return preValue + nowValue
  }, 0) 
})
//method 
function addComNumber(index: number){
  // add is long
  // const commodityId = itemList[index].commodityId
  const shopcarCommodityId = itemList[index].shoppingCommodityId
  sendAddShopcar(shopcarCommodityId, 1).then((data: any) =>{
    itemList[index].number ++;
    console.log("Add Successfully");
  })
}
function subComNumber(index: number){
  // sub is short
  const commodityId = itemList[index].commodityId
  // const shopcarCommodityId = itemList[index].shoppingCommodityId
  sendDeleteShopcar(commodityId, 1)
  itemList[index].number --; 
}
function deleteItem(index: number): void{
  const commodityId = itemList[index].commodityId
  sendDeleteShopcar(commodityId, itemList[index].number).then((suc: any)=>{
     bias = reactive([])
     itemList.splice(index, 1)
     checked.splice(index, 1)  
  })
  
}
function buy(): void{
  // update the store
  settlementStore.origin = "" 
  store.checked = checked
  store.itemList = itemList
  store.totalCheckedPrice = totalCheckedPrice 
  store.everyTotalPrices =  everyTotalPrices
}


let bias: Array<number|string> = reactive([]) ; 
let flag: Array<boolean> = [];
let downX: number;

// the function that handle the event 
function touchdown(index: number, e: any): void{
//  console.log("down", e.touches[0].screenX);
 flag[index] = true;
 downX = e.touches[0].screenX
}
function touchmove(index: number,e: any): void{
// console.log("moving", e.clientX);
  if(flag[index]){
    const nowX = e.touches[0].screenX
    bias[index] = ( nowX - downX );
    if(bias[index] < -200){
      bias[index] = -200
    }else if(bias[index]> 0){
      bias[index] = 0
    }
    bias[index] += 'px' 
    // console.log("bias:",bias);
  }
}
function touchup(index: number, ): void{
  if(flag){
    flag[index]= false;
  }
}
</script>
<template>
   <ul class="listContainer">
    <h2>购物车列表</h2>
    <div v-for="item in itemList">
        <!-- {{  item  }} -->
    </div>
    <h2 class="empty" v-if="itemList.length===0">请选择至少一个商品</h2>
    <div v-for="(item,index) in itemList" class="item" >
        <div class="main-box" :style="{marginLeft:bias[index]}"
        @touchstart="touchdown(index, $event)" @touchmove="touchmove(index, $event)" @touchend="touchup(index, $event)">
           <el-checkbox v-model="checked[index]" :label="item.name" size="large" />
           <img src="../../../assets/com.webp" alt="" style="width: 5rem; height: 5rem; transform: translateY(30%) ">
           <div class="container" style="transform: translate(30%, 10%)">
            <div class="name" style="">
              {{ item.introduce }}
              {{ item.name}}
              <br>
              {{item.currency}}{{ item.price }} 
            </div>
            </div>
            </div>
        <div class="button-group" style="text-align:center;">
           <el-button @click="deleteItem(index)">delete</el-button> 
           <br>
           <br> 
           <el-button @click="addComNumber(index)">+</el-button>
           <div class="number" style="display: inline-block">&nbsp;&nbsp; {{item.number}} &nbsp;&nbsp;</div>
           <el-button @click="subComNumber(index)" :disabled="disabled[index]">-</el-button>
           {{ item.currency }} 
           {{ everyTotalPrices[index] }}
        </div>
    </div>
    <div class="sum-box" style="position: relative; right: 0;color: red; height: 10rem;font-size: 2rem; text-align: right">
    总计：     ${{ totalCheckedPrice }}
    </div>
    <div class="buy-box" style="text-align: center" >
      <router-link to="/settlement" @click="buy" style="text-decoration: none">
        <el-button style="width: 10rem; height: 5rem; font-size: 2rem; " :disabled="!checked.some((item)=>item)">Buy </el-button>
      </router-link>
    </div>  
   </ul>
</template>
<style scoped>

ul.listContainer{
    margin: 0;
    padding: 0;
}
.listContainer .item {
    flex: 100%;
    width: 100%;
    height: 8rem;
    display: flex;
    flex-wrap: wrap;
}
.listContainer .main-box {
    flex : 80%;
}
.listContainer .button-group{
    flex : 20%;
}
.container{
   position: relative;
   width: 10rem;
   top: -4rem;
   left: 8rem;
}
</style>