<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="common-layout">
       <el-container>
        <el-header class="h5">
          <img src="" alt="logo" class="sienna h5 w20">
          
          <RouterLink to="/login" class="right sienna">
            <img src="" alt="" class="sienna h5 w5">
            <span class="">用户名</span>
          </RouterLink>
       </el-header>
     </el-container>
   </div>
</template>
<style scoped>
   .w5 {
    width: 5rem;
   }
   .right {
    position: absolute;
    right: 2rem;
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