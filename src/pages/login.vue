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

<script setup lang="ts">
import { ref, reactive} from 'vue'
import { RouterLink , useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import {useLoginStore} from "../../src/stores/login.js"
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

//backend to frontend 
//settoken
function login(){
 const account = ruleForm.account
 const password = ruleForm.password
 if(account==="adminadmin" && password === "adminadmin"){
  alert("login successfully")
  updateState(store);
  window.localStorage.setItem("token","testToken")
  router.push({path: "/index"})
 }else {
  alert("login failed")
 }
}
function updateState(store){
 store.ifLogin = true; 
 
 store.userName = ruleForm.account; 
 console.log(store.userName);
}

// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   formEl.resetFields()
// }

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//   value: `${idx + 1}`,
//   label: `${idx + 1}`,
// }))
</script>

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