<script setup></script>
<template>
   <div class="common-layout">
      <el-container class="seagreen h20">
        <div class="grid-box">
          <div class="item">
            <router-link :to='"com"+5'>
              <img src="../../../assets/commodity.webp" style="width: 25rem" alt="">
            </router-link>
            <h2>商品</h2> 
          </div>
          <div class="item">
            <router-link :to='"com"+6'>
              <img src="../../../assets/pad.webp" style="width: 25rem" alt="">
            </router-link>
            <h2>商品</h2> 
          </div>
          <div class="item">
           <router-link :to='"com"+7'>
            <img src="../../../assets/phone.webp" style="width: 25rem" alt="">
            </router-link>
            <h2>商品</h2> 
          </div>
        </div>
      </el-container>
   </div>
</template>
<style scoped>
.seagreen{
    overflow: hidden;
}
.h20 { 
    height: 20rem;
}
.grid-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.grid-box div.item{
    flex: 100; 
}
.item {
   cursor:pointer;
   overflow: hidden;
}

.item h2 {
  text-align: center;
}

</style>