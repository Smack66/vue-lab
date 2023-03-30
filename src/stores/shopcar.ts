import { ref, computed, reactive, Ref } from "vue";
import { defineStore } from "pinia";
import { Commodity } from "./public.js/Commodity";
import { sendUserInfoRequest } from "../../axios/api-request/user-info";
export const useShopcarStore = defineStore("shopcar", () => {
  // to be deleted  =================
  const itemList: Array<any> = reactive([]);
  const checked: boolean[] = reactive([]);
  // ======================
  const totalCheckedPrice: Ref<number> = ref(0);
  const everyTotalPrices: number[] = reactive([]);
  const settlementItem: Array<any> = reactive([]);
  const settlementEveryPrices: Array<any> = reactive([]);
  return {
    itemList,
    checked,
    totalCheckedPrice,
    everyTotalPrices,
    settlementItem,
    settlementEveryPrices,
  };
});
