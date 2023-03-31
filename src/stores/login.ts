import { ref, computed, Ref } from "vue";
import { defineStore } from "pinia";
import { request } from "../../axios/basic-Request/request";
import { sendUserInfoRequest } from "../../axios/api-request/user-info";
export const useLoginStore = defineStore("loginState", () => {
  let ifLogin: Ref<boolean> = ref(false);
  let userName: Ref<string> = ref("userName");
  let nickName: Ref<string> = ref("nickname");
  if (window.localStorage.getItem("token") === "testToken") {
    ifLogin.value = true;
    sendUserInfoRequest().then((suc) => {
      userName.value = suc.userName;
      nickName.value = suc.nickName;
    });
  }
  return { ifLogin, nickName, userName };
});
