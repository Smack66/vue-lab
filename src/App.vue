<script setup> 
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <RouterView />  
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