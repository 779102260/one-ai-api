import { Bard } from 'googlebard'

const SECURE_1PSID = process.env.SECURE_1PSID

export async function ask(prompt: string, secure1psid = SECURE_1PSID) {
  const cookies = `__Secure-1PSID=${secure1psid}`
  const bot = new Bard(cookies)

  // 使用lodash生成随机字符串充当会话id (如果需要记忆会话，需要携带id)
  const conversationId = Math.random().toString(36).slice(2)
  return await bot.ask(prompt, conversationId)
}
