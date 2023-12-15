import * as OpenAI from './openai/index'
import * as Azure from './azure/index'
import * as Claude from './claude/index'
import * as Bard from './bard/index'

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
  const { order = ['openai', 'bard', 'claude', 'azure'], degguer, openai, azure, claude, bard } = config
  for (const name of order) {
    if (name === 'openai' && openai) {
      const answer = await OpenAI.ask(prompt, openai.apiKey, openai.config).catch((error) => {
        degguer && console.error(error)
        return ''
      })
      if (answer) {
        return { answer, ai: name }
      }
    }
    if (name === 'azure' && azure) {
      const answer = await Azure.ask(prompt, azure.apiKey, azure.config).catch((error) => {
        degguer && console.error(error)
        return ''
      })
      if (answer) {
        return { answer, ai: name }
      }
    }
    if (name === 'claude' && claude) {
      const answer = await Claude.ask(prompt, claude.orgId, claude.sessionKey).catch((error) => {
        degguer && console.error(error)
        return ''
      })
      if (answer) {
        return { answer, ai: name }
      }
    }
    if (name === 'bard' && bard) {
      const answer = await Bard.ask(prompt, bard.apiKey).catch((error) => {
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
