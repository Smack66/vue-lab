<script lang="ts" setup>
import { reactive, ref } from 'vue';
class Commodity{
  link = '/';
  price = '$'
  constructor(price: number, link: number){
    this.price += price; 
    this.link += link;
  }
}


// Initialize the data
const commodityList: Commodity[][]  = []
for(let i=0; i<10 ;i++){
  const list: Commodity[] = [];
  for(let j=0; j<10; j++){
    list.push(new Commodity(i*10+j, i*10+j));
  }
  commodityList.push(list);
}
//
const itemItems = reactive(commodityList);
const totalLen = ref(1000);
const currentPage = ref(1)
const pageSize3 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
<template>
  <div class="common-layout">
     <el-container>
     <div class="flex-container">
       <div v-for="item in itemItems[currentPage - 1]" class="items">
          <img src="" alt="" class="commodity_class" > 
          <div class="price">{{ item.price }}  </div>
          <div class="detail">
            <a :href="item.link">{{item.link}}</a>
          </div>
       </div>
     </div>
     <!-- Pagination -->
      <div>
         <div class="demonstration">Jump to</div>
         <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize3"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="prev, pager, next, jumper"
              :total="totalLen"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
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
  display: flex;
  width: 50rem;
  flex-wrap:wrap;
}
.items {
  flex: 50%;
  height: 10rem;
}
</style>