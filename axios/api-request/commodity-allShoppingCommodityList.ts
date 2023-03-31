import { request } from "../basic-Request/request";
export async function sendAllCommodityListRequest() {
  return request({
    url: "/api/commodity/allShoppingCommodityList",
    method: "get",
    withCredentials: true,
  }).then((suc) => {
    return suc.data;
  });
}
