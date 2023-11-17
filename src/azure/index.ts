import axios from 'axios'

const END_POINT = process.env.END_POINT
const API_KEY = process.env.API_KEY

/**
 * 单次对话，无上下文，无stream
 * @param prompt
 * @param endPoint
 * @param apiKey
 */
export async function ask(prompt: string, endPoint = END_POINT, apiKey = API_KEY) {
  try {
    if (!endPoint || !apiKey) {
      throw new Error('Missing required END_POINT or API_KEY')
    }

    const body = {
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 0.95,
      stop: null,
    }
    const headers = {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    }
    const { data } = await axios.post(endPoint, body, { headers })

    // 处理toomany request情况
    const content = data?.choices?.[0]?.message?.content
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
  endPoint?: string
  apiKey?: string
}

// conversation("Hello, world!").then(response => console.log(response));
