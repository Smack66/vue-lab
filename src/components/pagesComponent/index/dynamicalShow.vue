<script lang="ts" setup >
import { sendPromotedRequset } from "../../../../axios/api-request/commodity-promotedShoppingCommodityList"
import { reactive } from "vue";
import { useDetailStore } from "../../../stores/commodityDetail";
import {  useRouter } from 'vue-router';
const detailStore = useDetailStore()
const router = useRouter()
const itemList: Array<any> = reactive([]) 
sendPromotedRequset().then((data: any)=>{
 data.forEach((item: any)=> {
   itemList.push(item) 
 }); 
})

function changeCurrentCommodity(index: number): void{
 const clickedCommodity =  itemList[index]
 detailStore.currentCommodity = clickedCommodity;
 router.push({
  path:'commodityDetail'
 })
}





</script>
<template>
   <div class="common-layout">
      <el-container class="seagreen h20">
        <div class="grid-box">
            <div class="item" v-for="(item, index) in itemList">
              <div @click="changeCurrentCommodity(index)">
                 <img :src='item.src.replace("@", "../../src")'  style="width: 25rem" alt="">
                  <h4 style="text-align: center">
                    {{ item.introduce }}  
                    {{  item.name }}
                  </h4>     
              </div>
            </div>
        </div>
      </el-container>
   </div>
</template>
<style scoped>
.seagreen{
    overflow: hidden;
}
.h20 { 
    height: 20rem;
}
.grid-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.grid-box div.item{
    flex: 100; 
}
.item {
   cursor:pointer;
   overflow: hidden;
}

.item h2 {
  text-align: center;
}

</style>