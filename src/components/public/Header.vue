<script  lang="ts" setup >
import { ref, effect, Ref } from 'vue';
import { RouterLink , useRouter, Router } from 'vue-router';
import { Store } from 'pinia';
import {useLoginStore} from "../../stores/login.js"
import {useShopcarStore} from "../../stores/shopcar"
// Router
const router: Router = useRouter()
// Shopcar Store
const shopcarStore = useShopcarStore()
// Login Store
const loginStore = useLoginStore()
const ifLogin = loginStore.ifLogin

//interactive methods
function clickShopcar(): void{
 if(ifLogin) {
  to("/shopcar")
  return;
 }
 alert("Please Login")
 console.log("hahha");
 to("/login")
}

function to(path:string): void{
  router.push({path})
}
function logout(): void{
  loginStore.ifLogin = false; 
  window.localStorage.clear()
  to("/index")
}
</script>
<template>
    <div class="common-layout">
       <el-container>
        <el-header class="h5" style="margin-bottom: 2px;">
          <RouterLink to="/index" class="">
            <img src="../../assets/logo.svg" alt="logo" class="h5 w20">
          </RouterLink>
          <!-- left -->
          <RouterLink to="/commodityList" class="linkNoUnderLine h5 text-vertical-center">
            <span class="" style="font-size: 2rem; height: 5rem; margin-left: 2rem;" >List </span>
          </RouterLink>
          <!-- right -->
          <el-menu
           class="el-menu-demo"
           mode="horizontal"
           >
             <el-menu-item index="1" v-if="ifLogin">
               <RouterLink to="/shopcar" style="text-decoration: none;" @click="clickShopcar">
                 <span  v-if="loginStore.ifLogin" class="" >购物车{{ shopcarStore.itemList.length}} </span>
               </RouterLink>
              </el-menu-item>
             <el-sub-menu index="2">
               <template #title>
                <RouterLink v-if="loginStore.ifLogin" to="/index"  style="text-decoration: none;">
                  <span  class="" >{{ loginStore.userName }}</span>
                </RouterLink>
                <RouterLink v-else to="/login" style="text-decoration: none;">
                  <span class="" >用户名</span>
                </RouterLink>
              </template>
               <el-menu-item  v-if="loginStore.ifLogin" index="2-2" >{{loginStore.nickName}}</el-menu-item>
               <el-menu-item  v-if="loginStore.ifLogin" index="2-1" @click="logout">Log out</el-menu-item>
               <el-menu-item  v-else index="2-3">用户名</el-menu-item>
             </el-sub-menu>
             <el-menu-item index="4">Orders</el-menu-item>
         </el-menu>
       </el-header>
     </el-container>
   </div>
</template>
<style scoped>
   .w5 {
    width: 5rem;
   }
  
   .right2 {
    position: absolute;
    right: 2rem;
   }
   .right5 {
    position: absolute;
    right: 15rem;
   }
   .h5 {
    height: 5rem;
   }
   .text-vertical-center {
    line-height: 5rem;
   }
   .w20{
    width: 20rem;
   }
   .sienna {
    background-color: sienna;
   }
   .linkNoUnderLine {
    text-decoration: none; 
    
   }
   .navigation {
    display: inline-block; 
    width: 5rem;
   }
   .hover-menu {
     
   }
   .el-menu-demo {
     position: absolute;
     top: 2rem;
     right: 0;
   }

</style>