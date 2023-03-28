<script  setup lang="ts">
import { reactive, ref } from 'vue';
import { Store } from 'pinia';
// import { commodityList, totalLen as lenTotal } from "../../../../mock/commodityListData"
import { useDetailStore } from "../../../stores/commodityDetail.js"
import {  useRouter } from 'vue-router';
import { request } from "../../../../axios/request"
const detailStore = useDetailStore()
const totalLen = ref(1000);
const router = useRouter()
// all data above is from back-end
const currentPage = ref(1)
const pageSize3 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const commodityList:Array<any> = []
const itemItems: Array<any> = reactive(commodityList);
//request 
sendAllCommodityListRequest().then((data)=> {
  const splicedItems = spliceItems(data, 10)
  splicedItems.forEach((item)=> {
   itemItems.push(item) 
  });
  console.log(itemItems);
})


function spliceItems(data: Array<object>, singlePageNumber: number): Array<Array<object>>{
   // divide all items based on singlePageNumber
   const itemItems: Array<Array<object>> = [] 
   let onePageItem:Array<object> = []
   data.forEach((item: any, index: number, array: Array<any>)=> {
     onePageItem.push(item)
     console.log(onePageItem);
     if(( index % singlePageNumber  === 0  && index !== 0) || (index === array.length - 1) ) {
        itemItems.push(onePageItem)
        onePageItem = [] 
     }  
   });
   return itemItems
}
function changeCurrentDetail (index: number): void{
 router.push({
  path:'commodityDetail'
 })
 let currentCommodity  = (itemItems[currentPage.value - 1 ][index]);
 detailStore.currentCommodity = currentCommodity;
}
async function sendAllCommodityListRequest(){
  return request({
        url: "/api/commodity/allShoppingCommodityList",
        method: "get",
        withCredentials: true,
      }).then((suc)=>{
        // console.log("all shopping");
        // console.log(suc.data);
        return suc.data
      });
}
</script>
<template>
  <div class="common-layout">
     <el-container style="height: 50rem">
     <div class="flex-container">
       <div v-for=" (item, index) in itemItems[currentPage - 1]" class="items" @click="changeCurrentDetail(index)">
          <div v-for="(key, value) in item">{{ value}} : {{ key }} </div>
          <img src="../../../assets/commodity.jpg" alt="" class="commodity_pic"  > 
          <div class="name" >{{ item.name }}  </div>
          <div class="price">{{ item.price }}  </div>
          <div class="detail">
            <a :href="item.link">{{item.link}}</a>
          </div>
       </div>
     </div>
     <!-- Pagination -->
      <div class="pagination">
         <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize3"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="prev, pager, next, jumper"
              :total="totalLen"
            />
      </div>
    </el-container>
  </div>
</template>
<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.flex-container {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 50rem;
  flex-wrap:wrap;
}
.items {
  cursor: pointer;
  text-align: center;
  flex: 50%;
  height: 10rem;
}
.commodity_pic {
  height: 6rem;
}
.pagination{
  position: relative;
  top: 50rem;
  left: -12%;
  transform: translateX(-50%);
}
</style>