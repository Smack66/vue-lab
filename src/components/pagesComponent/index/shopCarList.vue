<script  lang="ts" setup>
import { Ref, ref, reactive, effect } from 'vue';
import { useShopcarStore } from "../../../stores/shopcar.js"
import { useSettlementStore } from "../../../stores/settlment.js"
import { RouterLink } from 'vue-router';
import { every } from 'lodash';
const store = useShopcarStore()
const settlementStore = useShopcarStore()

//datasource 
//backend or store 
const itemList = store.itemList
const checked = store.checked
//reactive 
const a: string = "123";
console.log(a);
for(let i=0; i < itemList.length; i++){
  checked[i] = false;
}
let totalCheckedPrice = store.totalCheckedPrice
let everyTotalPrices = store.everyTotalPrices 
let disabled = reactive([])
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
  itemList[index].number ++;
}
function subComNumber(index: number){
  itemList[index].number --; 
}
function deleteItem(index){
  bias = reactive([])
  itemList.splice(index, 1)
  checked.splice(index, 1)
}
function buy(){
  settlementStore.origin = "" 
  store.checked = checked
  store.itemList = itemList
  store.totalCheckedPrice = totalCheckedPrice 
  store.everyTotalPrices =  everyTotalPrices
}


let bias = reactive([]) ; 
let flag = [];
let scrollLeft ;
let downX;


function touchdown(index, e){
//  console.log("down", e.touches[0].screenX);
 flag[index] = true;
 downX = e.touches[0].screenX
 scrollLeft = e.scrollLeft 
}
function touchmove(index,e){
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
function touchup(index, e){
  // console.log("up", e.clientX);
  if(flag){
    flag[index]= false;
  }
}
</script>
<template>
   <ul class="listContainer">
    <!-- <h2>Commodity Object List</h2>
    <div v-for="item in itemList">
        {{  item  }}
    </div> -->
        <!-- @mousedown="down(index, $event)" @mousemove="move(index, $event)" @mouseup="up(index, $event)" -->

    <h2 class="empty" v-if="itemList.length===0">Please add at least one commodity</h2>
    <div v-for="(item,index) in itemList" class="item" >
        <div class="main-box" :style="{marginLeft:bias[index]}"
        @touchstart="touchdown(index, $event)" @touchmove="touchmove(index, $event)" @touchend="touchup(index, $event)">
           <el-checkbox v-model="checked[index]" :label="item.name" size="large" />
           <!-- {{ item }}  -->
           <!-- {{ bias}} -->
           <img src="../../../assets/com.webp" alt="" style="width: 5rem; height: 5rem; transform: translateY(30%) ">
           <div class="container" style="transform: translate(4%, 55%)">
            <div class="name">name:{{item.name}}</div>
            <div class="price">Price: {{item.price}}</div>
           </div>
           <!-- index: {{  index  }} -->
        </div>
        <div class="button-group" style="text-align:center;">
           <el-button @click="deleteItem(index)">delete</el-button> 
           <br>
           <br> 
           <el-button @click="addComNumber(index)">+</el-button>
           <div class="number" style="display: inline-block">&nbsp;&nbsp; {{item.number}} &nbsp;&nbsp;</div>
           <el-button @click="subComNumber(index)" :disabled="disabled[index]">-</el-button>
           {{ everyTotalPrices[index] }}
        </div>
    </div>
    <!-- <div  class="addCom" >
        <button class="add-icon" >ADD</button>
        <div class="add-text">Please add</div>
    </div> -->
    
    <div class="sum-box" style="background-color: orange; color: white; height: 10rem;font-size: 4rem; text-align: center">
     The total price that is checked : {{ totalCheckedPrice }}
    </div>
    <div class="buy-box" >
      <router-link to="/settlement" @click="buy">
        <button style="width: 15rem; height: 10rem; font-size: 2rem; " :disabled="!checked.some((item)=>item)">Buy Buy Buy</button>
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