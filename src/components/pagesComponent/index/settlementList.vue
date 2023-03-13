<script lang="ts" setup>
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

//backend-data from shopCar 
const orderItemList: any[]  = []
for(let i=0; i<10; i++){
   orderItemList.push(new Commodity(i+"", i*100, i)) 
}
const addressList = [{value: 'China', label:'China'},{value: 'USA', label:'USA'}]
let selectedAddress = ref(addressList[0].value)
// reactive
let reactiveOrderItemList = reactive(orderItemList)

console.log(this);

</script>
<template>
    <div v-for="(item,index) in orderItemList" class="item">
        <div class="main-box">
           data content:{{ item }} 
           index: {{  index  }}
        </div>
        <div class="right-box">
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
              :disabled="item.disabled"
            />
          </el-select>
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
