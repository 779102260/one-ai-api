import { v1beta2 } from '@google-ai/generativelanguage'
import { GoogleAuth } from 'google-auth-library'
import { Bard } from 'googlebard'

const SECURE_1PSID = process.env.SECURE_1PSID
const SECURE_1PSIDTS = process.env.SECURE_1PSIDTS

export async function ask(prompt: string, secure1psid = SECURE_1PSID, secure1psidts = SECURE_1PSIDTS) {
  if (!prompt || !secure1psid) {
    throw new Error('Missing required prompt or secure1psid')
  }

  const cookies = `__Secure-1PSID=${secure1psid}; __Secure-1PSIDTS=${secure1psidts}`
  const bot = new Bard(cookies)

  // 使用lodash生成随机字符串充当会话id (如果需要记忆会话，需要携带id)
  const conversationId = Math.random().toString(36).slice(2)
  const res = await bot.ask(prompt, conversationId)
  console.log(res)
  return res
}
export type IAskConfig = {
  prompt: string
  secure1psid?: string
}

// 不支持中文
// const API_KEY = process.env.API_KEY
// export async function ask(prompt: string, apiKey = API_KEY) {
//   if (!prompt || !apiKey) {
//     throw new Error('Missing required prompt or API_KEY')
//   }

//   const client = new v1beta2.TextServiceClient({
//     authClient: new GoogleAuth().fromAPIKey(apiKey),
//   })

//   const res = await client
//     .generateText({
//       model: 'models/text-bison-001',
//       prompt: {
//         text: prompt,
//       },
//     })
//     .then((result) => {
//       return result
//     })

//   return res[0].candidates[0].output
// }
// export type IAskConfig = {
//   prompt: string
//   apiKey?: string
// }

// ask('Hello, world!').then(console.log)
