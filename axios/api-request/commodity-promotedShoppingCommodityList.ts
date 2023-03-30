import { request } from "../basic-Request/request";
export async function sendPromotedRequset() {
  return request({
    url: "/api/commodity/promotedShoppingCommodityList",
    method: "get",
    withCredentials: true,
  }).then((suc) => {
    console.log("Promoted");
    console.log(suc.data);
    return suc.data;
  });
}
