<script setup></script>
<template>
   <div class="common-layout">
      <el-container class="seagreen h20">
        <div class="grid-box">
          <div>1</div>
          <div>1</div>
          <div>1</div> 
        </div>
      </el-container>
   </div>
</template>
<style scoped>
.seagreen{
    background-color: seagreen;
}
.h20 { 
    height: 20rem;
}
.grid-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.grid-box div {
    flex: 30%;
    margin-left: 20rem;
    background-color: blueviolet;
}

</style>