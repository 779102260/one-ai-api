import { v1 as uuidv1 } from 'uuid'

/**
 * 将 claude web api 返回格式转为正常文本内容
 */
export function formatConversion(result: any) {
  try {
    let content: string = ''
    const lines = result.split('\n\n')
    lines
      .map((line) => line.replace(/^data: /, '').trim())
      .filter((line) => line !== '')
      .forEach((line) => {
        const te = JSON.parse(line)
        content += te.completion ? te.completion : ''
      })
    return content
  } catch (err: any) {
    throw new Error(result.error.message)
  }
}

interface Message {
  role: string
  content: string
  name?: string
  function_call?: object
}

/**
 * openai 请求体格式转为 cluade 请求体格式
 */
export const openaiToClaudeRequest = (
  messages: Message[],
  orgId: string,
  conversationId: string,
  sessionKey: string,
) => {
  const prompt: string = generatePrompt(messages)
  return {
    method: 'POST',
    headers: {
      Cookie: `sessionKey=${sessionKey}`,
    },
    redirect: 'follow',
    body: JSON.stringify({
      completion: {
        prompt: prompt,
        timezone: 'Asia/Shanghai',
        model: 'claude-2',
      },
      organization_uuid: orgId,
      conversation_uuid: conversationId,
      text: prompt,
      attachments: [],
    }),
  }
}

/**
 * 生成的 prompt 格式，可参考下述例子 
 * 
 * example 1: "messages": [ 
 * {"role": "system", "content":"请输出 json 格式"}, 
 * {"role": "user", "content":"今天日期是？"}, 
 * {"role": "assistant", "content":"今天是 5 月 30 日。"}, 
 * {"role": "user", "content":"今天天气怎么样？"}, 
 * {"role": "assistant", "content":"今天是晴天。"}, 
 * {"role": "user", "content":"你好"}]
 * ```
    Tips:
    今天日期是？
    今天是 5 月 30 日。
    今天天气怎么样？
    今天是晴天。
    Please refer to the prompts above for your answer (Return the results of the question):
    今天的日期，天气如何？（请输出 json 格式）
 ```
 * example 2: "messages": [ {"role": "user", "content":"你好，介绍下自己"} ] 
 * ```
    你好，介绍下自己
 ```
 */
const generatePrompt = (messages: Message[]) => {
  if (messages.length < 1) {
    throw new Error('Request body parameter error, please check if messages is missing.')
  }

  let systemPrompt: string = ''
  let assistantPrompt: string = ''
  let userPrompt: string = ''
  const lastMessage: Message = messages.pop()!
  if ('user' != lastMessage.role) {
    throw new Error(
      'Please check if there is user information in the messages, like {"role": "user", "content": "Hello!"}',
    )
  }

  userPrompt = lastMessage.content
  for (const msg of messages) {
    switch (msg.role) {
      case 'system':
        systemPrompt = msg.content
        break
      case 'user':
      case 'assistant':
        assistantPrompt = `${msg.content}\n`
        break
    }
  }

  let prompt: string = ''
  if (assistantPrompt) {
    prompt = `Tips: ${assistantPrompt} \nPlease refer to the prompts above for your answer (Return the results of the question):\n`
  }
  prompt += userPrompt
  prompt += systemPrompt ? `(${systemPrompt})` : ''
  return prompt
}

/**
 * claude 结果转为 openai api 响应体格式
 */
const claudeToOpenaiResponse = (content: string) => {
  return JSON.stringify({
    id: uuidv1().toString(),
    object: 'chat.completion',
    created: Date.parse(new Date().toString()),
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content: content,
        },
        finish_reason: 'stop',
      },
    ],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    },
  })
}

export async function readerStream(response: any) {
  const decoder = new TextDecoder('utf-8')
  const reader = response.body?.getReader()
  let content: string = ''

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { done, value }: any = await reader?.read()
    content += decoder.decode(value)
    if (done) {
      break
    }
  }

  return claudeToOpenaiResponse(content)
}
