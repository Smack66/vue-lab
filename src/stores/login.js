import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore= defineStore('loginState', () => {
   let ifLogin = ref(false)
   let userName = ref('用户名')  
  if(window.localStorage.getItem("token") === "testToken"){
    //从后端得
    ifLogin = true; 
    userName = "adminadmin"
  }
    return { ifLogin , userName} 
})
