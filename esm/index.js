import * as OpenAI from './openai/index.js'
import * as Azure from './azure/index.js'
import * as Claude from './claude/index.js'
import * as Bard from './bard/index.js'
export async function askAuto(prompt, config) {
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
//# sourceMappingURL=index.js.map