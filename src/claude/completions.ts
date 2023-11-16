// 对话管理

import { v1 as uuidv1 } from 'uuid'
import axios from 'axios'

interface Conversation {
  uuid: string
  name: string
  summary: string
  created_at: string
  updated_at: string
}

/**
 * 获取历史对话列表
 * @param orgId
 * @param sessionKey
 * @returns
 */
export async function getAll(orgId: string, sessionKey: string): Promise<Conversation[]> {
  const baseUrl: string = `https://claude.ai/api/organizations/${orgId}/chat_conversations`
  const { data } = await axios
    .get<Conversation[]>(baseUrl, {
      headers: {
        Accept: 'application/json',
        Cookie: `sessionKey=${sessionKey}`,
      },
    })
    .catch((err: any) => {
      throw new Error(`请求错误: ${err.messages}`)
    })
  return data
}

/**
 * 获取会话
 * @param orgId
 * @param conversation_id
 * @param sessionKey
 */
export async function get(orgId: string, conversationId: string, sessionKey: string) {
  const baseUrl: string = `https://claude.ai/api/organizations/${orgId}/chat_conversations/${conversationId}`
  const { data } = await axios
    .get(baseUrl, {
      headers: {
        Accept: 'application/json',
        Cookie: `sessionKey=${sessionKey}`,
      },
    })
    .catch((err: any) => {
      throw new Error(`请求错误: ${err.messages}`)
    })
  return data
}

/**
 * 创建会话
 */
export async function create(
  orgId: string,
  sessionKey: string,
  opts?: {
    uuid?: string
    name?: string
  },
) {
  const baseUrl: string = `https://claude.ai/api/organizations/${orgId}/chat_conversations`
  const { data } = await axios
    .post<Conversation>(
      baseUrl,
      {
        uuid: opts?.uuid || (uuidv1() as string),
        name: opts?.name || process.env.CLAUDE_DEFAULT_CONVERSATION_NAME,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Cookie: `sessionKey=${sessionKey}`,
        },
      },
    )
    .catch((err: any) => {
      throw new Error(`请求错误: ${err.messages}`)
    })
  return data
}

/**
 *  删除会话
 * @param orgId
 * @param conversation_id
 * @param sessionKey
 */
export async function del(orgId: string, conversationId: string, sessionKey: string) {
  const baseUrl: string = `https://claude.ai/api/organizations/${orgId}/chat_conversations/${conversationId}`
  const { data } = await axios
    .delete(baseUrl, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `sessionKey=${sessionKey}`,
      },
    })
    .catch((err: any) => {
      throw new Error(`请求错误: ${err.messages}`)
    })
  return data
}
