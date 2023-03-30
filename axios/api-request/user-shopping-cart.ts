import { sendOperateShopCar } from "./operate-request/sendOperateShopcar";
export const sendAddShopcar = sendOperateShopCar("add");
export const sendDeleteShopcar = sendOperateShopCar("delete");
