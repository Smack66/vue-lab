<script  lang="ts" setup>
import { Ref, ref, reactive, effect } from 'vue';
import { useShopcarStore  } from "../../../stores/shopcar.js"
import { RouterLink } from 'vue-router';
import { every } from 'lodash';
const store = useShopcarStore()

//datasource 
//backend or store 
const itemList = store.itemList
const checked = store.checked
//reactive 

for(let i=0; i < itemList.length; i++){
  checked[i] = false;
}
let totalCheckedPrice = store.totalCheckedPrice
let everyTotalPrices = store.everyTotalPrices 
// bind
effect(() => {
  // init
  totalCheckedPrice = 0
  everyTotalPrices = []
  //every Item price
  itemList.forEach((item) => {
    const price = item.price;
    const number = item.number;
    everyTotalPrices.push(price * number) ;
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

function buy(){
  console.log("go to settlment");
  store.checked = checked
  store.itemList = itemList
  store.totalCheckedPrice = totalCheckedPrice 
  store.everyTotalPrices =  everyTotalPrices
  
}
</script>
<template>
   <ul class="listContainer">
    <!-- <h2>Commodity Object List</h2>
    <div v-for="item in itemList">
        {{  item  }}
    </div> -->
    
    <div v-for="(item,index) in itemList" class="item">
      
        <div class="main-box">
           <el-checkbox v-model="checked[index]" label="Option 1" size="large" />
           data content:{{ item }} 
           <br>
           index: {{  index  }}
        </div>
        <div class="button-group">
           {{ everyTotalPrices[index] }}
           <button @click="addComNumber(index)">+</button>
           <button @click="subComNumber(index)">-</button>
        </div>
    </div>
    <div  class="addCom" >
        <button class="add-icon">ADD</button>
        <div class="add-text">Please add</div>
    </div>
    
    <div class="sum-box">
     The total price that is checked : {{ totalCheckedPrice }}
    </div>
    <div class="buy-box">
      <router-link to="/settlement" @click="buy">
        <button>Buy Buy Buy</button>
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
    background-color: cadetblue;
    flex : 80%;
}
.listContainer .button-group{
    background-color: aquamarine;
    flex : 20%;
}
</style>