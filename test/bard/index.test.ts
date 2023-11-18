import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { ask } from '../../src/bard/index'
import { API_KEY, SECURE_1PSID, SECURE_1PSIDTS } from './env'

describe.only('ask function', () => {
  it('should throw an error if apiKey are missing', async () => {
    await expect(ask('hello')).rejects.toThrowError('Missing required prompt or secure1psid or secure1psidts')
  })

  //   国内调不通，超时
  it('should create a new conversation and send a request', async () => {
    const prompt = '翻译成英文：你好，世界'
    const result = await ask(prompt, SECURE_1PSID, SECURE_1PSIDTS)
    expect(/hello/i.test(result!)).toBe(true)
  }, 30000)
})
