<script lang="ts" setup >
import { ref, reactive} from 'vue'
import {  useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
import {useLoginStore} from "../stores/login.js"
import { sendLoginRequest }  from "../../axios/api-request/auth-login"
import {sendUserInfoRequest} from "../../axios/api-request/user-info"
const store = useLoginStore()
const router = useRouter()
const localStorage = window.localStorage
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  account:'',
  password: '',
  region: '',
})
const rules = reactive<FormRules>({
  password: [
    { required: true, message: 'Please input password name', trigger: 'blur' },
  ],
  account: [
    {
      type: "string",
      required: true, 
      message: 'Please input valid number', 
      trigger: 'blur' 
    },
    { 
      min: 7,
      max: 20,
      message: 'The length of the account shouldn\'t be less than 7', 
      trigger: 'blur'
    },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
})



//backend to frontend 
//settoken
async function login(){
 const username = ruleForm.account
 const password = ruleForm.password
 sendLoginRequest({username: username, password: password})
  .then((suc)=>{
    return suc.status
  }).then((status)=>{
   if(status === 200){
     alert("login successfully")
     sendUserInfoRequest().then((data)=>{
        console.log("======");
        updateState(data);
        updateLocalStorage(data)
     })
     router.push({path: "/index"})   
   }else{
     alert("login failed")
   }
  })
}
// update the state in the store
function updateState(data: any){
    store.ifLogin = true; 
    store.userName = data.userName;
    store.nickName = data.nickName;
}

function updateLocalStorage(data: any){
  localStorage.setItem("token","testToken")
}
</script>

<template>
  <Header></Header>  
  <div class="form">
    <h3>账号登录</h3>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        :size="formSize"
        style="position: relative; "> 
       <el-form-item prop="account>" class="w20">
           <el-input disabled placeholder="Country or Area" class="w20">
               <template #append>
               <el-button style="width:100px">China</el-button>
               </template>
           </el-input>
        </el-form-item>
        
        <el-form-item  prop="account" class="w20">
          <el-input v-model="ruleForm.account" placeholder="Phone/Account/UserName" />
        </el-form-item>
        <el-form-item  prop="password" class="w20" placeholder="Password">
          <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button style="color:blue;">Phone Login</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="color:blue;" @click="login">Login</el-button>
        </el-form-item>
        {{  localStorage.getItem("token") }}
    </el-form>
  </div>  
  <Footer></Footer>
</template>
<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
.w20{
    width: 20rem;
}
.form {
  position: relative;
  left: 40%;
}
</style>