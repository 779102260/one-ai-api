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
const OpenAI = __importStar(require("./openai/index"));
const Azure = __importStar(require("./azure/index"));
const Claude = __importStar(require("./claude/index"));
const Bard = __importStar(require("./bard/index"));
async function askAuto(prompt, config) {
    const { order = ['openai', 'claude', 'bard', 'azure'], degguer, openai, azure, claude, bard } = config;
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
            const answer = await Bard.ask(prompt, bard.secure1psid, bard.secure1psidts).catch((error) => {
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