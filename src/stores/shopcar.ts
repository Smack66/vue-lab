import { ref, computed, reactive, Ref } from "vue";
import { defineStore } from "pinia";
import { Commodity } from "./public.js/Commodity";
import { sendUserInfoRequest } from "../../axios/api-request/user-info";
export const useShopcarStore = defineStore("shopcar", () => {
  const itemList: Array<any> = reactive([]);
  // to be deleted  =================
  const checked: boolean[] = reactive([]);
  const totalCheckedPrice: Ref<number> = ref(0);
  const everyTotalPrices: number[] = reactive([]);
  // ======================
  sendUserInfoRequest().then((data: any) => {
    console.log(data);
    data.cartList.forEach((item: any) => {
      itemList.push(item);
    });
  });
  return {
    itemList,
    checked,
    totalCheckedPrice,
    everyTotalPrices,
  };
});
