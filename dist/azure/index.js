"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = void 0;
const openai_1 = __importDefault(require("openai"));
const url_1 = __importDefault(require("url"));
const END_POINT = process.env.END_POINT;
const API_KEY = process.env.API_KEY;
/**
 * 单次对话，无上下文，无stream
 */
async function ask(prompt, apiKey = API_KEY, config = {}) {
    try {
        if (!config.baseURL) {
            config.baseURL = END_POINT;
        }
        if (!config.baseURL || !apiKey) {
            throw new Error('Missing required END_POINT or API_KEY');
        }
        const endPoint = new url_1.default.URL(config.baseURL);
        const queryString = (await Promise.resolve().then(() => __importStar(require('query-string')))).default;
        const parsed = queryString.parse(endPoint.search);
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
            throw new Error(content || '未知错误');
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