import request from "./request";
import { CMDReply } from "./utils";

export function ListChat(
  params?: ListChatRequest
): Promise<CMDReply<ListChatReply>> {
  return request(`/api/openai/v1/chat/msgs`, {
    method: "POST",
    data: params || {},
  });
}

export function SendChatMsg(
  params: SendChatRequest
): Promise<CMDReply<SendChatReply>> {
  return request(`/api/openai/v1/chat/send`, {
    method: "POST",
    data: params,
  });
}

export interface ChatMsg {
  id: number;
  userId: number | string;
  msg: string;
  model: string;
  prev: number;
  reply: string;
  promptToken: number;
  completionToken: number;
  totalToken: number;
  createdAt: string;
  updatedAt: string;
  answer: string;
  question: string;
}

export interface HistoryMessage {
  question: string; // 问题
  answer: string; // 回答
}

export interface SendChatRequest {
  msg: string; //请求消息
  agentId: string;
  model?: string; //openai 的模型 可选
  system?: string;
  userId?: number | string;
  history?: HistoryMessage[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  n?: number;
}

export interface SendChatReply {
  msg: string; //回复消息
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  finishReason: string;
}

export interface ListChatRequest {
  pageSize?: number;
  pageNum?: number;
  startTime?: number; // 开始时间戳
  endTime?: number; // 结束时间戳
  userId?: number | string;
  agentId: string[];
}

export interface ListChatReply {
  pageSize?: number;
  pageNum?: number;
  result: ChatMsg[];
  total: number;
}
