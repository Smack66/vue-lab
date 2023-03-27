<script setup> 
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios"
axios({
        url: "/api/auth/login",
        data:{
           username:"dev",
           password:"dev"
        },
        method: "post",
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((suc)=>{
        console.log(suc);
      });

const res = await axios({
        url: "/api/commodity/promotedShoppingCommodityList",
        method: "get",
        withCredentials: true,
        headers: {
        },
      }).then((suc)=>{
        console.log(suc);
      });
console.log(res); 

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