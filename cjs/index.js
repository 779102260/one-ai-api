"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAuto = void 0;
const OpenAI = require("./openai/index");
const Azure = require("./azure/index");
const Claude = require("./claude/index");
const Bard = require("./bard/index");
async function askAuto(prompt, config) {
    const { order = ['openai', 'bard', 'claude', 'azure'], degguer, openai, azure, claude, bard } = config;
    for (const name of order) {
        if (name === 'openai' && openai) {
            const answer = await OpenAI.ask(prompt, openai.apiKey, openai.config).catch((error) => {
                degguer && console.error(error);
                return '';
            });
            if (answer) {
                return { answer, ai: name };
            }
        }
        if (name === 'azure' && azure) {
            const answer = await Azure.ask(prompt, azure.apiKey, azure.config).catch((error) => {
                degguer && console.error(error);
                return '';
            });
            if (answer) {
                return { answer, ai: name };
            }
        }
        if (name === 'claude' && claude) {
            const answer = await Claude.ask(prompt, claude.orgId, claude.sessionKey).catch((error) => {
                degguer && console.error(error);
                return '';
            });
            if (answer) {
                return { answer, ai: name };
            }
        }
        if (name === 'bard' && bard) {
            const answer = await Bard.ask(prompt, bard.apiKey).catch((error) => {
                degguer && console.error(error);
                return '';
            });
            if (answer) {
                return { answer, ai: name };
            }
        }
    }
    return Promise.reject('全部失败');
}
exports.askAuto = askAuto;
//# sourceMappingURL=index.js.map