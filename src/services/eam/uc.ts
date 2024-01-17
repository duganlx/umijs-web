import request from "./request";
import { CMDReply } from "./utils";

export async function Login(data: LoginRequest): Promise<CMDReply<LoginReply>> {
  return request(`/api/uc/v1/login`, {
    method: "POST",
    data: data || {},
  });
}

export interface LoginRequest {
  account: string;
  accountType: string;
  pwd: string;
  code: string;
}

export interface LoginReply {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  scrope: string;
  uid: string | number;
}
