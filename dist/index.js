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
    if (config.openai) {
        return OpenAI.ask(prompt, config.openai.apiKey);
    }
    if (config.azure) {
        return Azure.ask(prompt, config.azure.endPoint, config.azure.apiKey);
    }
    if (config.claude) {
        return Claude.ask(prompt, config.claude.orgId, config.claude.sessionKey);
    }
    if (config.bard) {
        return Bard.ask(prompt, config.bard.secure1psid, config.bard.secure1psidts);
    }
}
exports.askAuto = askAuto;
//# sourceMappingURL=index.js.map