<script setup lang="ts">
</script>


<template>
    <el-carousel 
      :interval="5000" 
      arrow="always" 
      height="30rem"
    >
       <el-carousel-item v-for="item in 4" :key="item" class="item">
          <router-link :to='"com"+item'>
            <img src="../../../assets/carousel.webp" alt="" style="width:150%; margin-left:-40%">
          </router-link>
       </el-carousel-item>
    </el-carousel>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.item{
 cursor: pointer; 
} 
</style>