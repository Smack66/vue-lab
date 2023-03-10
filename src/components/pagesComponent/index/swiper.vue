<script setup></script>
<!-- <template>
    <section class="swiper">Swiper</section>
</template> -->
<style scoped>
.swiper{ 
    font-size: 15rem;
    text-align: center;
    line-height: 50rem;
    width: 300rem;
    height: 50rem;
    background-color: sandybrown;
}
</style>

<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
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
</style>