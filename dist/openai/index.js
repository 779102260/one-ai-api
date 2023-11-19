"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = void 0;
const openai_1 = __importDefault(require("openai"));
const API_KEY = process.env.API_KEY;
/**
 * 单次对话，无上下文，无stream
 * @param prompt 问题
 * @param apiKey API_KEY 应该从环境变量中获取
 */
async function ask(prompt, apiKey = API_KEY) {
    var _a, _b, _c;
    try {
        if (!apiKey) {
            throw new Error('Missing required API_KEY');
        }
        const openai = new openai_1.default({
            apiKey: apiKey || API_KEY,
        });
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
        });
        // 处理toomany request情况
        const content = (_c = (_b = (_a = chatCompletion === null || chatCompletion === void 0 ? void 0 : chatCompletion.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
        if (!content || /^.429/.test(content)) {
            throw new Error(content);
        }
        return content;
    }
    catch (error) {
        console.error('Error in fetching response: ', error);
        return Promise.reject(error);
    }
}
exports.ask = ask;
// ask('Hello, world!').then((response) => console.log(response))
//# sourceMappingURL=index.js.map