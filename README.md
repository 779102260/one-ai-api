## Description
Unified AI Interface
 
Supports
- OpenAI
- Azure
- Claude (web api)
- Bard (web api)

If you need to integrate other SDKs, please submit an issue or a pull request.


## Todo
✅ Supports cloudflare ai gateway

⭕️ Supports streaming


## Usage
1. install
```shell
pnpm i one-ai-api
```

2. use
```typescript
import {askAuto} from one-ai-api

// If the OpenAI API call fails, automatically call the Azure API, and so on.
askAuto('hello', {
    order: ['openai', 'bard', 'claude', 'azure'], // specify the AI you want to use and the order of their usage.
    openai: {
        apiKey: 'sk-xxxxx', // get from openai
        config: { // openai sdk config
            // ...
        }
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
        apiKey: 'xxxxx', // get from https://makersuite.google.com/app/apikey
    },
    debugger: true // enable log
})
```

You can also use it separately
```typescript
import {ask} from "one-ai-api/openai";
const prompt = 'hello'
const result = await ask(prompt, 'sk-xxx')
```

## Contributing
Welcome contributions to the One AI API project. If you have suggestions or improvements, please submit a pull request with your proposed changes.
