import { request } from "../basic-Request/request";
export async function sendLoginRequest(data: {
  username: string;
  password: string;
}) {
  return request({
    url: "/api/auth/login",
    data: {
      username: data.username,
      password: data.password,
    },
    method: "post",
    withCredentials: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((suc) => {
    console.log(suc);
    return suc;
  });
}
