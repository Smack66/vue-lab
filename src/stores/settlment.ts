import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useSettlementStore = defineStore("settlement", () => {
  let origin = ref("");
  let singleCommodity: { a: any } = reactive({ a: {} });
  return { origin, singleCommodity };
});
