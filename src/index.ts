import * as OpenAI from './openai'
import * as Azure from './azure'
import * as Claude from './claude'
import * as Bard from './bard'

export type IConfig = {
  openai?: Partial<OpenAI.IAskConfig>
  azure?: Partial<Azure.IAskConfig>
  claude?: Partial<Claude.IAskConfig>
  bard?: Partial<Bard.IAskConfig>
}

export async function askAuto(prompt: string, config: IConfig) {
  let answer = ''
  let ai: keyof IConfig | '' = ''
  if (config.openai) {
    ai = 'openai'
    answer = await OpenAI.ask(prompt, config.openai.apiKey).catch((e) => {
      console.error(`OpenAI error: ${e?.message}`, e)
      return ''
    })
  }
  if (!answer && config.azure) {
    ai = 'azure'
    answer = await Azure.ask(prompt, config.azure.apiKey, config.azure.config).catch((e) => {
      console.error(`Azure error: ${e?.message}`, e)
      return ''
    })
  }
  if (!answer && config.claude) {
    ai = 'claude'
    answer = await Claude.ask(prompt, config.claude.orgId, config.claude.sessionKey).catch((e) => {
      console.error(`Claude error: ${e?.message}`, e)
      return ''
    })
  }
  if (!answer && config.bard) {
    ai = 'bard'
    answer = await Bard.ask(prompt, config.bard.secure1psid).catch((e) => {
      console.error(`Bard error: ${e?.message}`, e)
      return ''
    })
  }
  return {
    answer,
    ai,
  }
}
