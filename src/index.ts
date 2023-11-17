import * as OpenAI from './openai'
import * as Azure from './azure'
import * as Claude from './claude'
import * as Bard from './bard'

type IConfig = {
  openai: OpenAI.IAskConfig
  azure: Azure.IAskConfig
  claude: Claude.IAskConfig
  bard: Bard.IAskConfig
}

export async function askAuto(prompt: string, config: IConfig) {
  if (config.openai) {
    return OpenAI.ask(prompt, config.openai.apiKey)
  }
  if (config.azure) {
    return Azure.ask(prompt, config.azure.endPoint, config.azure.apiKey)
  }
  if (config.claude) {
    return Claude.ask(prompt, config.claude.orgId, config.claude.sessionKey)
  }
  if (config.bard) {
    return Bard.ask(prompt, config.bard.secure1psid)
  }
}
