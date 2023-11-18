import { v1beta2 } from '@google-ai/generativelanguage'
import { GoogleAuth } from 'google-auth-library'

const API_KEY = process.env.API_KEY || 'AIzaSyBJytIY1nfQeX_JdXF3BlDtpQ3lxJ7Zed4'

export async function ask(prompt: string, apiKey = API_KEY) {
  if (!apiKey) {
    throw new Error('Missing required API_KEY')
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
      console.log(JSON.stringify(result, null, 2))
      return result
    })

  return res[0].candidates[0].output
}
export type IAskConfig = {
  prompt: string
  apiKey?: string
}

// ask('Hello, world!').then(console.log)
