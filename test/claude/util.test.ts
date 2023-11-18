import { describe, it, expect } from 'vitest'
import { formatConversion, generatePrompt, openaiToClaudeRequest } from '../../src/claude/util'

describe('formatConversion', () => {
  it('should return an empty string when input is an empty string', () => {
    const result = formatConversion('')
    expect(result).toBe('')
  })

  it('should return the content when input contains a single line of data', () => {
    const result = formatConversion('data: {"completion": "Hello world"}')
    expect(result).toBe('Hello world')
  })

  it('should return the concatenated content when input contains multiple lines of data', () => {
    const result = formatConversion(`data: {"completion": "Hello"}\n\ndata: {"completion": "world"}`)
    expect(result).toBe('Helloworld')
  })

  it('should throw an error when input is not in the expected format', () => {
    expect(() => {
      formatConversion('data: {"completion": "Hello world"}\nerror: {"message": "An error occurred"}')
    }).toThrow(/^claude api 响应格式解析错误/)
  })
})

describe('generatePrompt', () => {
  it('should throw an error if messages is empty', () => {
    expect(() => generatePrompt([])).toThrowError('Request body parameter error, please check if messages is missing.')
  })

  it('should throw an error if last message is not from the user', () => {
    const messages = [
      { role: 'assistant', content: 'Please enter your name' },
      { role: 'user', content: 'John Doe' },
      { role: 'assistant', content: 'Please enter your age' },
    ]
    expect(() => generatePrompt(messages)).toThrowError(
      'Please check if there is user information in the messages, like {"role": "user", "content": "Hello!"}',
    )
  })

  it('should generate the prompt correctly when there are no system or assistant messages', () => {
    const messages = [{ role: 'user', content: 'Hello' }]
    const prompt = generatePrompt(messages)
    expect(prompt).toBe('Hello')
  })

  it('should generate the prompt correctly when there are system and assistant messages', () => {
    const messages = [
      { role: 'system', content: 'Please enter your name' },
      { role: 'assistant', content: 'Please enter your age' },
      { role: 'user', content: 'John Doe' },
    ]
    const prompt = generatePrompt(messages)
    expect(prompt).toBe(
      'Tips: Please enter your age\n \nPlease refer to the prompts above for your answer (Return the results of the question):\nJohn Doe(Please enter your name)',
    )
  })

  it('should generate the prompt correctly when there are only assistant messages', () => {
    const messages = [
      { role: 'assistant', content: 'Please enter your name' },
      { role: 'assistant', content: 'Please enter your age' },
      { role: 'user', content: 'John Doe' },
    ]
    const prompt = generatePrompt(messages)
    expect(prompt).toBe(
      'Tips: Please enter your age\n \nPlease refer to the prompts above for your answer (Return the results of the question):\nJohn Doe',
    )
  })
})
