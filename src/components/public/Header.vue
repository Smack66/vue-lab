<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="common-layout">
       <el-container>
        <el-header class="h5">
          <RouterLink to="/index" class="sienna">
            <img src="" alt="logo" class="sienna h5 w20">
          </RouterLink>
          <RouterLink to="/login" class="right2 sienna">
            <img src="" alt="" class="sienna h5 w5">
            <span class="">用户名</span>
          </RouterLink>
          <RouterLink to="/shopcar" class="right5">
            <img src="" alt="" class="sienna h5 w5">
            <span class="">购物车</span>
          </RouterLink> 
       </el-header>
     </el-container>
   </div>
</template>
<style scoped>
   .w5 {
    width: 5rem;
   }
   .right2 {
    position: absolute;
    right: 2rem;
   }
   .right5 {
    position: absolute;
    right: 10rem;
   }
   .h5 {
    height: 5rem;
   }
   .w20{
    width: 20rem;
   }
   .sienna {
    background-color: sienna;
   }
</style>