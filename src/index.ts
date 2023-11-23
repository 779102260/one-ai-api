import * as OpenAI from './openai'
import * as Azure from './azure'
import * as Claude from './claude'
import * as Bard from './bard'
import { error } from 'console'

export type IConfig = {
  order?: ('openai' | 'claude' | 'bard' | 'azure')[]
  openai?: Partial<OpenAI.IAskConfig>
  azure?: Partial<Azure.IAskConfig>
  claude?: Partial<Claude.IAskConfig>
  bard?: Partial<Bard.IAskConfig>
  /** 开启错误日志 */
  degguer?: boolean
}

export async function askAuto(prompt: string, config: IConfig) {
  const { order = ['openai', 'claude', 'bard', 'azure'], degguer } = config
  for (const name of order) {
    if (name === 'openai' && config.openai) {
      const answer = await OpenAI.ask(prompt, config.openai.apiKey).catch((error) => {
        degguer && console.error(error)
        return ''
      })
      if (answer) {
        return { answer, ai: name }
      }
    }
    if (name === 'azure' && config.azure) {
      const answer = await Azure.ask(prompt, config.azure.apiKey, config.azure.config).catch((error) => {
        degguer && console.error(error)
        return ''
      })
      if (answer) {
        return { answer, ai: name }
      }
    }
    if (name === 'claude' && config.claude) {
      const answer = await Claude.ask(prompt, config.claude.orgId, config.claude.sessionKey).catch((error) => {
        degguer && console.error(error)
        return ''
      })
      if (answer) {
        return { answer, ai: name }
      }
    }
    if (name === 'bard' && config.bard) {
      const answer = await Bard.ask(prompt, config.bard.secure1psid).catch((error) => {
        degguer && console.error(error)
        return ''
      })
      if (answer) {
        return { answer, ai: name }
      }
    }
  }
  return Promise.reject('全部失败')
}
