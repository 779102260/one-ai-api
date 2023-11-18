import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { ask } from '../../src/claude/index'
import { ORG_ID, SESSION_KEY } from './env'

describe.only('ask function', () => {
  it('should throw an error if prompt, orgId, or sessionKey are missing', async () => {
    await expect(ask('', 'orgId', 'sessionKey')).rejects.toThrowError('参数错误')
    await expect(ask('prompt', '', 'sessionKey')).rejects.toThrowError('参数错误')
    await expect(ask('prompt', 'orgId', '')).rejects.toThrowError('参数错误')
  })

  //   国内调不通，超时
  it('should create a new conversation and send a request', async () => {
    const prompt = '翻译成英文：你好，世界'
    const result = await ask(prompt, ORG_ID, SESSION_KEY)
    expect(result).toBe(/hello/)
  })
})
