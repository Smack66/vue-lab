import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
interface Commodity {
  color: string;
  colorName: string;
  commodityId: number;
  currency: string;
  introduce: string;
  maxNumber: number;
  name: string;
  number: number | null;
  price: number;
  promoted: boolean;
  shoppingCommodityId: number | null;
  snapshot: boolean;
  src: string;
}
export const useDetailStore = defineStore("detail", () => {
  let currentCommodity: Commodity = {
    color: "#707070",
    colorName: "Gray",
    commodityId: 1,
    currency: "$",
    introduce: "Intel 第13代CPU",
    maxNumber: 9991,
    name: "13900K",
    number: null,
    price: 10798,
    promoted: true,
    shoppingCommodityId: null,
    snapshot: false,
    src: "@/assets/mobile-icon.jpg",
  };

  //  settlementEveryPrices = reactive([commodity.price])
  //  totalCheckedPrice = commodity.price
  return { currentCommodity };
});
