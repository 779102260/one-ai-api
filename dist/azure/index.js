"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = void 0;
const openai_1 = __importDefault(require("openai"));
const query_string_1 = __importDefault(require("query-string"));
const url_1 = __importDefault(require("url"));
const END_POINT = process.env.END_POINT;
const API_KEY = process.env.API_KEY;
/**
 * 单次对话，无上下文，无stream
 */
async function ask(prompt, apiKey = API_KEY, config = {}) {
    try {
        if (!(config.baseURL && !END_POINT) || !apiKey) {
            throw new Error('Missing required END_POINT or API_KEY');
        }
        if (!config.baseURL) {
            config.baseURL = END_POINT;
        }
        const endPoint = new url_1.default.URL(config.baseURL);
        const parsed = query_string_1.default.parse(endPoint.search);
        const openai = new openai_1.default({
            apiKey,
            defaultQuery: { 'api-version': parsed['api-version'] },
            defaultHeaders: { 'api-key': apiKey },
            ...config,
        });
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
        });
        // 处理toomany request情况
        const content = chatCompletion?.choices?.[0]?.message?.content;
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
// conversation("Hello, world!").then(response => console.log(response));
//# sourceMappingURL=index.js.map