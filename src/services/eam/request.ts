/**
 * https://github.com/umijs/umi-request
 */
// import moment from "moment";
import type { Context } from "umi-request";
import request from "umi-request";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "./utils";

request.use(
  async (_ctx: Context, next) => {
    const { options, url } = _ctx.req;
    let { headers } = options;
    headers = {
      ClientId: "jhl_quantweb",
      ...headers,
    };
    const access_token = getAccessToken();
    const decoded: { exp: number } = jwtDecode(access_token || "");
    console.log("exp", decoded.exp);

    if (access_token && access_token.length > 0) {
      headers = {
        Authorization: `Bearer ${access_token}`,
        ...headers,
      };
    }
    _ctx.req.options.headers = headers;
    await next();

    // const { res } = _ctx;
    // const { code, msg } = res;
    // if (code !== 0 && code !== 200) {
    //   notification.error({
    //     description: '请求失败',
    //     message: msg,
    //   });
    // }
  },
  {
    global: true,
  }
);

export default request;
