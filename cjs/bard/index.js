"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = void 0;
const SECURE_1PSID = process.env.SECURE_1PSID;
const SECURE_1PSIDTS = process.env.SECURE_1PSIDTS;
async function ask(prompt, secure1psid = SECURE_1PSID, secure1psidts = SECURE_1PSIDTS) {
    if (!prompt || !secure1psid || !secure1psidts) {
        throw new Error('Missing required prompt or secure1psid or secure1psidts');
    }
    const cookies = `__Secure-1PSID=${secure1psid}, __Secure-1PSIDTS=${secure1psidts}`;
    // 这是个esm模块
    const { Bard } = await Promise.resolve().then(() => require('googlebard'));
    const bot = new Bard(cookies, {
    // proxy: {
    //   host: '127.0.0.1',
    //   port: 7890,
    // },
    });
    // 使用lodash生成随机字符串充当会话id (如果需要记忆会话，需要携带id)
    const res = await bot.ask(prompt, 'default');
    console.log(res);
    return res;
}
exports.ask = ask;
// 不支持中文
// const API_KEY = process.env.API_KEY
// export async function ask(prompt: string, apiKey = API_KEY) {
//   if (!prompt || !apiKey) {
//     throw new Error('Missing required prompt or API_KEY')
//   }
//   const client = new v1beta2.TextServiceClient({
//     authClient: new GoogleAuth().fromAPIKey(apiKey),
//   })
//   const res = await client
//     .generateText({
//       model: 'models/text-bison-001',
//       prompt: {
//         text: prompt,
//       },
//     })
//     .then((result) => {
//       return result
//     })
//   return res[0].candidates[0].output
// }
// export type IAskConfig = {
//   prompt: string
//   apiKey?: string
// }
// ask('Hello, world!').then(console.log)
//# sourceMappingURL=index.js.map