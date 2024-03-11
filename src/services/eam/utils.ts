export interface CMDReply<DataType> {
  code: number;
  msg: string;
  data: DataType;
}

export const KEY_EAM_Token = "eam_token";
export const KEY_EAM_AUTH = "eam_auth";

export function setEamToken(token: string) {
  localStorage.setItem(KEY_EAM_Token, token);
}

export function getEamToken(): null | string {
  return localStorage.getItem(KEY_EAM_Token);
}

export function clearEamToken() {
  localStorage.removeItem(KEY_EAM_Token);
}

export function setEamAuth(appid: string, appsecret: string) {
  const obj = { appid, appsecret };
  const objstr = JSON.stringify(obj);

  localStorage.setItem(KEY_EAM_AUTH, objstr);
}

export function getEamAuth(): null | { appid: string; appsecret: string } {
  const data = localStorage.getItem(KEY_EAM_AUTH);
  if (data === null) {
    return data;
  }

  const obj = JSON.parse(data);

  return obj;
}

export function clearEamAuth() {
  localStorage.removeItem(KEY_EAM_AUTH);
}
