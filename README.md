## Description
Unified AI Interface
 
Supports
- OpenAI
- Azure
- Claude (web api)
- Bard (web api)

If you need to integrate other SDKs, please submit an issue or a pull request.


## Todo
⭕️ Supports streaming


## Usage
1. install
```shell
pnpm i one-ai-api
```

2. use
```typescript
import {ask} from one-ai-api

// If the OpenAI API call fails, automatically call the Azure API, and so on.
ask('hello', {
    order: ['openai', 'claude', 'bard', 'azure'], // specify the AI you want to use and the order of their usage.
    openai: {
        apiKey: 'sk-xxxxx' // get from openai
    },
    azure: {
        apiKey?: string // get from azure
        config: {
            baseURL: 'xxx' // endPoint, get from azure
            // ...
        }
    },
    claude: {
        orgId: string, // get from api [orgId]/chat_conversations
        sessionKey: string // get from cookie
    },
    bard: {
        secure1psid: string, // get from cookie
        secure1psidts: string  // get from cookie
    },
    debugger: true // enable log
})
```

## Contributing
Welcome contributions to the One AI API project. If you have suggestions or improvements, please submit a pull request with your proposed changes.
