import { request } from "../basic-Request/request";
export async function sendAllCommodityListRequest() {
  return request({
    url: "/api/commodity/allShoppingCommodityList",
    method: "get",
    withCredentials: true,
  }).then((suc) => {
    // console.log("all shopping");
    // console.log(suc.data);
    return suc.data;
  });
}
