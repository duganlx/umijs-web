export interface CMDReply<DataType> {
  code: number;
  msg: string;
  data: DataType;
}

export const getAccessToken = () => {
  // return localStorage.getItem("access_token");
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJqaGxfcXVhbnR3ZWIiLCJleHAiOjE3MDUzMDI0NTcsInN1YiI6IjE1NTk3MzA4NDg5MzA5OTIxMjgifQ.mtqZpKd_D5dIsAfvaGSDfQleJ3JP4B6WP_2BtQmsHow";
};
