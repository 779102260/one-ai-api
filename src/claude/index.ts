import * as Completions from './completions'
import initCycleTLS from 'cycletls'
import * as Util from './util'

const ORG_ID = process.env.ORG_ID
const SESSION_KEY = process.env.SESSION_KEY
const CLAUDE_DEFAULT_CONVERSATION_NAME = 'claude'

export async function ask(prompt: string, orgId = ORG_ID, sessionKey = SESSION_KEY) {
  if (!prompt || !orgId || !sessionKey) {
    throw new Error('参数错误')
  }

  //   获取所有对话
  const all = await Completions.getAll(orgId, sessionKey)
  //   删除所有之前生成的对话
  const old = all.filter((m) => m.name.startsWith(CLAUDE_DEFAULT_CONVERSATION_NAME))
  const p = old.map((m) => Completions.del(orgId, m.uuid, sessionKey))
  await Promise.all(p)
  //   创建新的对话
  const { uuid } = await Completions.create(orgId, sessionKey, {
    name: `${CLAUDE_DEFAULT_CONVERSATION_NAME}-${new Date().getTime()}`,
  })

  //   发送请求
  const options = Util.openaiToClaudeRequest(
    [
      {
        role: 'user',
        content: prompt,
      },
    ],
    orgId,
    uuid,
    sessionKey,
  )
  const cycleTLS = await initCycleTLS() // 模拟浏览器请求
  const response = await cycleTLS
    .post(`https://claude.ai/api/append_message`, options)
    .then((res) => res.body)
    .then((res) => Util.formatConversion(res))
    .catch((err) => {
      throw new Error(err)
    })
  cycleTLS.exit()

  const answer = Util.readerStream(response)

  return answer
}
