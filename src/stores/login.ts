import { ref, computed, Ref } from "vue";
import { defineStore } from "pinia";
import { request } from "../../axios/request";
export const useLoginStore = defineStore("loginState", () => {
  let ifLogin: Ref<boolean> = ref(false);
  let userName: Ref<string> = ref("userName");
  let nickName: Ref<string> = ref("nickname");

  if (window.localStorage.getItem("token") === "testToken") {
    ifLogin.value = true;
    sendUserInfoRequest().then((suc) => {
      userName.value = suc.data.userName;
      nickName.value = suc.data.nickName;
    });
  }
  return { ifLogin, nickName, userName };
});

async function sendUserInfoRequest(): Promise<any> {
  return request({
    url: "/api/user/info",
    method: "get",
    withCredentials: true,
  }).then((suc) => {
    return suc;
  });
}
