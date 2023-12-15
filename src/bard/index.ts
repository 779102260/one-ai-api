import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = process.env.API_KEY

export async function ask(prompt: string, apiKey = API_KEY) {
  if (!prompt) {
    throw new Error('Missing required prompt or apiKey')
  }
  const genAI = new GoogleGenerativeAI(apiKey!)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()
  return text
}
export type IAskConfig = {
  prompt: string
  apiKey?: string
}
