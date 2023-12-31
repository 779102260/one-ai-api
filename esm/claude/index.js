import * as Completions from './completions.js'
import initCycleTLS from 'cycletls';
import * as Util from './util.js'
const ORG_ID = process.env.ORG_ID; // 从Claude官网中的/ORG_ID/chat_conversations接口中获取
const SESSION_KEY = process.env.SESSION_KEY; // 从cookie中获取
const CLAUDE_DEFAULT_CONVERSATION_NAME = 'claude';
/**
 * 单次对话，无上下文，无stream
 * @param prompt 问题
 * @param orgId ORG_ID 应该从环境变量中获取
 * @param sessionKey SESSION_KEY 应该从环境变量中获取
 */
export async function ask(prompt, orgId = ORG_ID, sessionKey = SESSION_KEY) {
    if (!prompt || !orgId || !sessionKey) {
        throw new Error('参数错误');
    }
    //   获取所有对话
    const all = await Completions.getAll(orgId, sessionKey);
    //   删除所有之前生成的对话
    const old = all.filter((m) => m.name.startsWith(CLAUDE_DEFAULT_CONVERSATION_NAME));
    const p = old.map((m) => Completions.del(orgId, m.uuid, sessionKey));
    await Promise.all(p);
    //   创建新的对话
    const { uuid } = await Completions.create(orgId, sessionKey, {
        name: `${CLAUDE_DEFAULT_CONVERSATION_NAME}-${new Date().getTime()}`,
    });
    //   发送请求
    const body = Util.openaiToClaudeRequest([
        {
            role: 'user',
            content: prompt,
        },
    ], orgId, uuid, sessionKey);
    const cycleTLS = await initCycleTLS(); // 模拟浏览器请求
    const response = await cycleTLS
        .post(`https://claude.ai/api/append_message`, {
        headers: {
            Accept: 'text/event-stream, text/event-stream',
            Cookie: `sessionKey=${sessionKey}`,
        },
        body: JSON.stringify(body),
        timeout: 120,
    })
        .then((res) => {
        return res.body;
    })
        .then((res) => Util.formatConversion(res))
        .catch((err) => {
        throw new Error(err);
    });
    cycleTLS.exit();
    return response;
}
//# sourceMappingURL=index.js.map