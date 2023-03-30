import { request } from "../../basic-Request/request";
export function sendOperateShopCar(operation: string): Function {
  return async function (id: number, count: number): Promise<any> {
    let method: string = "";
    if (operation === "add") method = "post";
    else if (operation === "delete") method = "delete";
    else {
      throw "wrong operation";
    }
    return request({
      url: `/api/user/shopping/cart/${id}/${count}`,
      method: method,
      withCredentials: true,
    }).then((suc) => {
      console.log(suc.data);
      return suc.data;
    });
  };
}
