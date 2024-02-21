import { jwtDecode } from "jwt-decode";
import request from "./request";
import {
  CMDReply,
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "./utils";
import dayjs from "dayjs";

export async function PingEam() {
  const localtoken = getAccessToken();
  if (localtoken != null) {
    const decoded: { exp: number } = jwtDecode(localtoken || "");
    const nowunix = dayjs().unix();

    if (nowunix < decoded.exp) {
      return true;
    }

    clearAccessToken();
  }

  // todo 需要做成配置
  const appid = "gogsfbackend";
  const appsecret = "FczxZ7VJMFJRrioil3ghdRQv06dPPHnnRFSTOWuYD5PxmpivYt";

  const data: LoginRequest = {
    accountType: "authcode",
    appId: appid,
    appSecret: appsecret,
  };

  const reply = await Login(data);
  if (reply.code !== 0) {
    return false;
  }

  const token = reply.data.accessToken;
  setAccessToken(token);
  return true;
}

async function Login(data: LoginRequest): Promise<CMDReply<LoginReply>> {
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
