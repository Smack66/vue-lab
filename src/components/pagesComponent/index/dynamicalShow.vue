<script lang="ts" setup >
import {request} from "../../../../axios/request"
import { reactive } from "vue";
const itemList: Array<any> = reactive([]) 
sendPromotedRequset().then((data: any)=>{
 data.forEach((item: any)=> {
   itemList.push(item) 
 }); 
})
async function sendPromotedRequset(){
  return request({
        url: "/api/commodity/promotedShoppingCommodityList",
        method: "get",
        withCredentials: true,
      }).then((suc)=>{
        console.log("Promoted");
        console.log(suc.data);
        return suc.data
      });
}
</script>
<template>
   <div class="common-layout">
      <el-container class="seagreen h20">
        <div class="grid-box">
            <div class="item" v-for="item in itemList">
              <router-link :to='"com"+5'>
                <img src="../../../assets/commodity.webp" style="width: 25rem" alt="">
              {{  item }}
              </router-link>
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