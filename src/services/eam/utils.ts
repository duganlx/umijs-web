export interface CMDReply<DataType> {
  code: number;
  msg: string;
  data: DataType;
}

export const KEY_AccessToken = "access_token";
export const KEY_SecretPair = "secret_pair";

export function setAccessToken(token: string) {
  localStorage.setItem(KEY_AccessToken, token);
}

export function getAccessToken(): null | string {
  return localStorage.getItem(KEY_AccessToken);
}

export function clearAccessToken() {
  localStorage.removeItem(KEY_AccessToken);
}

export function setSecretPair(appid: string, appsecret: string) {
  const obj = { appid, appsecret };
  const objstr = JSON.stringify(obj);

  localStorage.setItem(KEY_SecretPair, objstr);
}

export function getSecretPair(): null | { appid: string; appsecret: string } {
  const data = localStorage.getItem(KEY_SecretPair);
  if (data === null) {
    return data;
  }

  const obj = JSON.parse(data);

  return obj;
}

export function clearSecretPair() {
  localStorage.removeItem(KEY_SecretPair);
}
