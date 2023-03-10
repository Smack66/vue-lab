<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="common-layout">
       <el-container>
        <el-header>
          <RouterLink to="/login">
            <img src="" alt="" class="user-img">
            <span class="user-name">用户名</span>
          </RouterLink>
       </el-header>
     </el-container>
   </div>
</template>

<style scoped>
   header{
    background-color: rebeccapurple;
    height: 20rem;
   } 
   img.icon {
    width: 50rem;
    height: 15rem;
    background-color: sienna;
   }
   img.user-img {
    width: 15rem;
    height: 15rem;
    background-color: sienna;
   }
   span.user-name {
    font-size: 5rem;
   } 
   
</style>