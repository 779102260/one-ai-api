import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { ask } from '../../src/bard/index'
import { API_KEY } from './env'

describe.only('ask function', () => {
  it('should throw an error if apiKey are missing', async () => {
    await expect(ask('hello')).rejects.toThrowError('Missing required API_KEY')
  })

  //   国内调不通，超时
  it('should create a new conversation and send a request', async () => {
    const prompt = '翻译成英文：你好，世界'
    const result = await ask(prompt, API_KEY)
    expect(/hello/i.test(result!)).toBe(true)
  }, 30000)
})
