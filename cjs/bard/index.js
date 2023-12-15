"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = void 0;
const generative_ai_1 = require("@google/generative-ai");
const API_KEY = process.env.API_KEY;
async function ask(prompt, apiKey = API_KEY) {
    if (!prompt) {
        throw new Error('Missing required prompt or apiKey');
    }
    const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}
exports.ask = ask;
//# sourceMappingURL=index.js.map