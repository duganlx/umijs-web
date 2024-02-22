// import { jwtDecode } from "jwt-decode";
import request from "./request";
import {
  CMDReply,
  clearAccessToken,
  getSecretPair,
  setAccessToken,
} from "./utils";
import { message } from "antd";

export async function PingEam() {
  clearAccessToken();
  const secretpair = getSecretPair();
  if (secretpair == null) {
    // ping eam server
    const reply = await Login("", "");
    if (reply.code !== 500) {
      return -1;
    }

    return -2;
  }

  const { appid, appsecret } = secretpair;

  // const localtoken = getAccessToken();
  // if (localtoken != null) {
  //   const decoded: { exp: number } = jwtDecode(localtoken || "");
  //   const nowunix = dayjs().unix();
  //   if (nowunix < decoded.exp) {
  //     return 0;
  //   }
  //   clearAccessToken();
  // }

  const reply = await Login(appid, appsecret);
  if (reply.code !== 0) {
    message.warning(`generate eam jwt token failed: ${reply.msg}`);
    return -3;
  }

  const token = reply.data.accessToken;
  setAccessToken(token);
  return 0;
}

export async function Login(
  appid: string,
  appsecret: string
): Promise<CMDReply<LoginReply>> {
  const data: LoginRequest = {
    accountType: "authcode",
    appId: appid,
    appSecret: appsecret,
  };

  return request(`/eam/api/uc/v1/login`, {
    method: "POST",
    data: data || {},
  });
}

interface LoginRequest {
  accountType: string;
  appId: string;
  appSecret: string;
}

interface LoginReply {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  scrope: string;
  uid: string | number;
}
