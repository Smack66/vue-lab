<script setup>
import { reactive } from 'vue';
window.onscroll = function (){
  const position = document.documentElement.scrollTop
  if(position > 40){
      fontAnimation['animated-up'] = true
      bottomAnimation['animated-up'] = true
      upAnimation['animated-down'] = true
      rightAnimation['animated-left'] = true
  }else{
      fontAnimation['animated-up'] = false 
      bottomAnimation['animated-up'] = false 
      upAnimation['animated-down'] = false 
      rightAnimation['animated-left'] = false 
  }
}
const fontAnimation = reactive({['animated-up']: false})
const bottomAnimation = reactive({['animated-up']: false})
const upAnimation =reactive({['animated-down']: false})
const rightAnimation = reactive({['animated-left']: false})
</script>
<template>
 <!-- <section class="staticShow">static show</section> -->
 <div class="common-layout" @scroll="scrollDown" style="position:relative;overflow:hidden; height: 40rem">
  <el-container class="" style="">
    <div class="staticShow" style="overflow: hidden">
      <router-link :to='"com"+1'>
        <img src="../../../assets/font.svg" :class="fontAnimation" style="width: 18rem;position: absolute; top: 20rem; left: 15rem;" alt="">
      </router-link>
      <router-link :to='"com"+2'>
        <img src="../../../assets/bottom.png" :class="bottomAnimation" style="width: 40rem;position: absolute; top: 37rem; left: 29rem;" alt="">
      </router-link>
      <router-link :to='"com"+3'>
        <img src="../../../assets/up.png" :class="upAnimation" style="width: 20rem;position: absolute; top: 6rem;left: 39rem" alt="">
      </router-link>
      <router-link :to='"com"+4'>
        <img src="../../../assets/right.png" :class="rightAnimation" style="width: 6rem;position: absolute; top: 11rem; left: 62rem" alt="">
      </router-link>
    </div> 
  </el-container>
 </div>
</template>
<style scoped>
.salmon {
    background-color: salmon;
}
.h20 { 
    height: 27rem;
}
.staticShow {
  cursor:pointer;
  overflow: hidden;
}
.animated-down, .animated-left, .animated-up {
  animation-fill-mode: forwards;
}
.animated-left{
 animation-duration: 3s;
  animation-name: leftslide 
}
.animated-down{
 animation-duration: 3s;
  animation-name: downslide; 
}
.animated-up{
 animation-duration: 3s;
  animation-name: upslide; 
}
@keyframes leftslide{
  to {
   transform: translateX(-36px)
  }
}
@keyframes downslide{
  to {
   transform: translateY(22px)
  }
}
@keyframes upslide{
  to {
   transform: translateY(-50px)
  }
}
@keyframes slidein {
  from {
    margin-left: 100%;
    width: 100%;
  }
  to {
    margin-left: 0%;
    width: 100%;
  }
}
</style>