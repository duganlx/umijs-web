export interface CMDReply<DataType> {
  code: number;
  msg: string;
  data: DataType;
}

export const KEY_AccessToken = "access_token";

export const setAccessToken = (token: string) => {
  localStorage.setItem(KEY_AccessToken, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(KEY_AccessToken);
};

export const clearAccessToken = () => {
  return localStorage.removeItem(KEY_AccessToken);
};
