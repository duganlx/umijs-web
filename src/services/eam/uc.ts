// import { jwtDecode } from "jwt-decode";
import request from "./request";
import { CMDReply, clearEamToken, getEamAuth, setEamToken } from "./utils";
import { message } from "antd";

export const PINGEAM_NORMAL = 0;
export const PINGEAM_EXCEPTION = -1;
export const PINGEAM_NOAUTH = -2;
export const PINGEAM_NOJWT = -3;

export async function PingEam() {
  clearEamToken();
  const auth = getEamAuth();
  if (auth == null) {
    // ping eam server
    const reply = await Login("", "");
    if (reply.code !== 500) {
      return PINGEAM_EXCEPTION;
    }

    return PINGEAM_NOAUTH;
  }

  const { appid, appsecret } = auth;

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
    return PINGEAM_NOJWT;
  }

  const token = reply.data.accessToken;
  setEamToken(token);
  return PINGEAM_NORMAL;
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
