import OpenAI, { ClientOptions } from 'openai'
import queryString from 'query-string'
import url from 'url'

const END_POINT = process.env.END_POINT
const API_KEY = process.env.API_KEY

/**
 * 单次对话，无上下文，无stream
 */
export async function ask(prompt: string, apiKey = API_KEY, config: ClientOptions = {}) {
  try {
    if (!(config.baseURL && !END_POINT) || !apiKey) {
      throw new Error('Missing required END_POINT or API_KEY')
    }
    if (!config.baseURL) {
      config.baseURL = END_POINT
    }

    const endPoint = new url.URL(config.baseURL)
    const queryString = (await import('query-string')).default
    const parsed = queryString.parse(endPoint.search)
    const openai = new OpenAI({
      apiKey,
      defaultQuery: { 'api-version': parsed['api-version'] as string },
      defaultHeaders: { 'api-key': apiKey },
      ...config,
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
  config: ClientOptions
}

// conversation("Hello, world!").then(response => console.log(response));
