import { request } from "../basic-Request/request";
export async function sendUserInfoRequest(): Promise<any> {
  return request({
    url: "/api/user/info",
    method: "get",
    withCredentials: true,
  }).then((suc) => {
    return suc.data;
  });
}
