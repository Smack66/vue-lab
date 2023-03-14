<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { commodityList, totalLen as lenTotal } from "../../../../mock/commodityListData"
const itemItems = reactive(commodityList);
const totalLen = ref(lenTotal);
// all data above is from back-end
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