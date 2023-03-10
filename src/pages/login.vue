<script setup>
import { ref } from 'vue'
const input = ref(1)
</script>
<template>
 <div class="common-layout">
  <el-input v-model="input" placeholder="Please input" clearable />
  {{ input}}
 </div>
</template>
<style scoped>
 
</style>