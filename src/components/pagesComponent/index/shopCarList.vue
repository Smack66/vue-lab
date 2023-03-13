<script  lang="ts" setup>
import { Ref, ref, reactive, effect } from 'vue';
class Commodity {
 name: string
 price: number
 number: number
 constructor(name:string, price:number, number: number){
    this.name = name 
    this.price= price 
    this.number = number 
 }
}
//backend or store 
//datasource 
let itemList: Commodity[]  = [] 
for(let i=0; i<10; i++){
   itemList.push(new Commodity(i+"", i*100, i)) 
}
itemList = reactive(itemList)
// //reactive 
let totalCheckedPrice: number; 
let everyTotalPrices: number[] = []
let test: number = 123
let checked :any =  reactive([])
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
// TEST FOR REACTIVE 
// console.log(totalPrice);
// itemList[1].number += 100;
// console.log(totalPrice);


for(let i=0; i < itemList.length; i++){
  checked[i] = false;
}
checked = reactive(checked)
// checked[5] = true;

function addComNumber(index: number){
  itemList[index].number ++;
}
function subComNumber(index: number){
  itemList[index].number --; 
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
      <button>Buy BUy BUy</button>
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