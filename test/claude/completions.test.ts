import { describe, it, expect } from 'vitest'
import { getAll, Conversation } from '../../src/claude/completions'
import { ORG_ID, SESSION_KEY } from './env'

describe.only('getAll', () => {
  it('should return an array of conversations', async () => {
    const result = await getAll(ORG_ID, SESSION_KEY)
    console.log(result)
    expect(result).toEqual(123)
  }, 30000)
  //   it('should throw an error if request fails', async () => {
  //     const orgId = 'orgId'
  //     const sessionKey = 'sessionKey'
  //     const errorMessage = 'Request failed'
  //     axios.get.mockRejectedValueOnce({ message: errorMessage })
  //     await expect(getAll(orgId, sessionKey)).rejects.toThrow(`请求错误: ${errorMessage}`)
  //   })
})
