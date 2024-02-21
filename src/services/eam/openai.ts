import request from "./request";
// import { CMDReply } from "./utils";

export async function AskGPT(question: string) {
  const params: AskGPTRequest = {
    msg: question,
    agentId: "AskGPT",
    model: "gpt-4-1106-preview",
  };

  const reply = await request(`/eam/api/openai/v1/chat/send`, {
    method: "POST",
    data: params,
  });

  if (reply.code !== 0 || reply.data.msg.len) {
    return "Sorry, GPT exception";
  }

  return reply.data.msg;
}

export interface HistoryMessage {
  question: string; // 问题
  answer: string; // 回答
}

export interface AskGPTRequest {
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

export interface AskGPTReply {
  msg: string; //回复消息
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  finishReason: string;
}
