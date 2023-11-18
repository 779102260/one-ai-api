import { v1beta2 } from '@google-ai/generativelanguage'
import { GoogleAuth } from 'google-auth-library'

const API_KEY = process.env.API_KEY

export async function ask(prompt: string, apiKey = API_KEY) {
  if (!prompt || !apiKey) {
    throw new Error('Missing required prompt or API_KEY')
  }

  const client = new v1beta2.TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(apiKey),
  })

  const res = await client
    .generateText({
      model: 'models/text-bison-001',
      prompt: {
        text: prompt,
      },
    })
    .then((result) => {
      return result
    })

  return res[0].candidates[0].output
}
export type IAskConfig = {
  prompt: string
  apiKey?: string
}

// ask('Hello, world!').then(console.log)
