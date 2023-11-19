Combines multiple AI interfaces into one, support openai/azure/claude/bard.

Currently does not support streaming. If you are interested, you can submit a merge request (MR). 

## useage

1. install
```shell
pnpm i one-ai-api
```

2. use
```typescript
import {ask} from one-ai-api

// If the OpenAI API call fails, automatically call the Azure API, and so on.
ask('hello', {
    openai: {
        apiKey: 'sk-xxxxx' // get from openai
    },
    azure: {
        endPoint?: string, // get from azure
        apiKey?: string // get from azure
    },
    claude: {
        orgId: string, // get from api [orgId]/chat_conversations
        sessionKey: string // get from cookie
    },
    bard: {
        secure1psid: string, // get from cookie
        secure1psidts: string  // get from cookie
    }
})
```