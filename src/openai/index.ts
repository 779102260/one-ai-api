import OpenAI from 'openai'

const API_KEY = process.env.API_KEY

/**
 * 单次对话，无上下文，无stream
 * @param prompt 问题
 * @param apiKey API_KEY 应该从环境变量中获取
 */
export async function ask(prompt: string, apiKey = API_KEY) {
  try {
    if (!apiKey) {
      throw new Error('Missing required API_KEY')
    }
    const openai = new OpenAI({
      apiKey: apiKey || API_KEY,
    })
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    })

    // 处理toomany request情况
    const content = chatCompletion?.choices?.[0]?.message?.content
    if (!content || /^.429/.test(content)) {
      throw new Error(content)
    }

    return content
  } catch (error) {
    console.error('Error in fetching response: ', error)
    return Promise.reject(error)
  }
}
export type IAskConfig = {
  prompt: string
  apiKey?: string
}

// conversation("Hello, world!").then(response => console.log(response));
