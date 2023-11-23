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
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAuto = void 0;
const OpenAI = __importStar(require("./openai"));
const Azure = __importStar(require("./azure"));
const Claude = __importStar(require("./claude"));
const Bard = __importStar(require("./bard"));
async function askAuto(prompt, config) {
    const { order = ['openai', 'claude', 'bard', 'azure'], degguer } = config;
    for (const name of order) {
        if (name === 'openai' && config.openai) {
            const answer = await OpenAI.ask(prompt, config.openai.apiKey).catch((error) => {
                degguer && console.error(error);
                return '';
            });
            if (answer) {
                return { answer, ai: name };
            }
        }
        if (name === 'azure' && config.azure) {
            const answer = await Azure.ask(prompt, config.azure.apiKey, config.azure.config).catch((error) => {
                degguer && console.error(error);
                return '';
            });
            if (answer) {
                return { answer, ai: name };
            }
        }
        if (name === 'claude' && config.claude) {
            const answer = await Claude.ask(prompt, config.claude.orgId, config.claude.sessionKey).catch((error) => {
                degguer && console.error(error);
                return '';
            });
            if (answer) {
                return { answer, ai: name };
            }
        }
        if (name === 'bard' && config.bard) {
            const answer = await Bard.ask(prompt, config.bard.secure1psid).catch((error) => {
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