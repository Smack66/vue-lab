<script setup> import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <router-link to="/index" class="block">index</router-link> 
  <router-link to="/login" class="block">login</router-link> 
  <router-link to="/commodityList" class="block">commodityList</router-link> 
  <router-link to="/commodityDetail" class="block">commodityDetal</router-link> 
  <router-link to="/shopcar" class="block">shopcar</router-link> 
  <router-link to="/settlement" class="block">settlement</router-link>  -->
  <!-- <div class="view"> -->
    <RouterView />  
  <!-- </div> -->
</template>

<style scoped>
.view{
  position: absolute;
  left:50%;
  transform: translateX(-50%); 
}
.block {
  display: block;
}
</style>