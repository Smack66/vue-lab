<!-- <script setup>
import { ref, reactive} from "vue"
import { useShopcarStore} from "@/stores/shopcar.js"
const store = useCounterStore()
console.log(store.count);
store.$patch({count: 100})

</script>
<template>
    storeTest 1222
    a:{{  store.count }}
    
</template>
<style scoped></style> -->

<script setup>
import {reactive, ref}from "vue"
let a = ref(true)



// window.setInterval(()=>{
//    console.log("trigger");
//    a.value = !a.value 
   
// }, 1000)
</script>
<template>
{{ a }}
  <div v-if="a"> block 1</div>
  <div v-if="!a"> block 2</div>

</template>