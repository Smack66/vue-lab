<script lang="ts" setup>
import { ref, reactive , Ref } from 'vue';
//back-end 
let price = ref("$100")
let comName = ref("Commododity Name")
let colorList = reactive(["red", "yellow", "green"])

// specific data 
//intermeddle part 
const colorLinkMap = new Map<String, String>
const reacitveColorLinkMap = reactive(colorLinkMap)
colorList.forEach((colorItem) => {reacitveColorLinkMap.set(colorItem, "/" + colorItem )});
 // user-data
let picked = ref("red");
// let picLink = ref(reacitveColorLinkMap.get(picked.value))
</script>
<template>
  <div class="common-layout">
    <el-container>
       <div class="show-container">
         <img src="" alt="" class="img"> 
         <div class="name">
            {{ comName  }}
         </div>
         <div class="price">
            price: {{  price  }} 
         </div>
         <div class="color-option">
            color : {{  picked  }}
            picture link : {{  colorLinkMap.get(picked) }}
            <div class="mb-2 flex items-center text-sm">
               <el-radio-group v-model="picked" class="ml-4">
                 <el-radio label="red" size="large">Red</el-radio>
                 <el-radio label="yellow" size="large">Yellow</el-radio>
                 <el-radio label="green" size="large">Green</el-radio>
               </el-radio-group>
            </div>
         </div>
       </div>
       <div class="bottom_group">
         <div class="add">
            <a href="">
                Add into shopcar
            </a>
         </div> 
         <div class="buy">
           <a href="">
              Buy buy buy
           </a> 
         </div>
       </div>
    </el-container>
  </div> 
</template>
<style scoped>
.img {
    width: 10rem;
    height: 10rem;
}
</style>