// 对话管理
import { v1 as uuidv1 } from 'uuid';
/**
 * 获取历史对话列表
 * @param orgId
 * @param sessionKey
 * @returns
 */
export async function getAll(orgId, sessionKey) {
    const baseUrl = `https://claude.ai/api/organizations/${orgId}/chat_conversations`;
    console.log(baseUrl);
    // TODO 为啥axios不行
    // const { data } = await axios
    //   .get<Conversation[]>(baseUrl, {
    //     headers: {
    //       // Accept: 'application/json',
    //       Cookie: `sessionKey=${sessionKey}`,
    //     },
    //     // proxy: {
    //     //   host: '127.0.0.1',
    //     //   port: 8899,
    //     // },
    //   })
    //   .catch((err: any) => {
    //     console.error(111, err)
    //     throw new Error(`请求错误: ${err.messages}`)
    //   })
    const data = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Cookie: `sessionKey=${sessionKey}`,
        },
    })
        .then((res) => {
        return res.json();
    })
        .catch((err) => {
        console.error(111, err);
        throw new Error(`请求错误: ${err.messages}`);
    });
    return data;
}
/**
 * 获取会话
 * @param orgId
 * @param conversation_id
 * @param sessionKey
 */
export async function get(orgId, conversationId, sessionKey) {
    const baseUrl = `https://claude.ai/api/organizations/${orgId}/chat_conversations/${conversationId}`;
    // const { data } = await axios
    //   .get(baseUrl, {
    //     headers: {
    //       Accept: 'application/json',
    //       Cookie: `sessionKey=${sessionKey}`,
    //     },
    //   })
    //   .catch((err: any) => {
    //     throw new Error(`请求错误: ${err.messages}`)
    //   })
    // return data
    const data = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Cookie: `sessionKey=${sessionKey}`,
        },
    })
        .then((res) => res.json())
        .catch((err) => {
        throw new Error(`请求错误: ${err.messages}`);
    });
    return data;
}
/**
 * 创建会话
 */
export async function create(orgId, sessionKey, opts) {
    const baseUrl = `https://claude.ai/api/organizations/${orgId}/chat_conversations`;
    // const { data } = await axios
    //   .post<Conversation>(
    //     baseUrl,
    //     {
    //       uuid: opts?.uuid || (uuidv1() as string),
    //       name: opts?.name || process.env.CLAUDE_DEFAULT_CONVERSATION_NAME,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Accept: '*/*',
    //         Cookie: `sessionKey=${sessionKey}`,
    //       },
    //     },
    //   )
    //   .catch((err: any) => {
    //     throw new Error(`请求错误: ${err.messages}`)
    //   }
    const data = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Cookie: `sessionKey=${sessionKey}`,
        },
        body: JSON.stringify({
            uuid: opts?.uuid || uuidv1(),
            name: opts?.name || process.env.CLAUDE_DEFAULT_CONVERSATION_NAME,
        }),
    })
        .then((res) => res.json())
        .catch((err) => {
        throw new Error(`请求错误: ${err.messages}`);
    });
    return data;
}
/**
 *  删除会话
 * @param orgId
 * @param conversation_id
 * @param sessionKey
 */
export async function del(orgId, conversationId, sessionKey) {
    const baseUrl = `https://claude.ai/api/organizations/${orgId}/chat_conversations/${conversationId}`;
    // const { data } = await axios
    //   .delete(baseUrl, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Cookie: `sessionKey=${sessionKey}`,
    //     },
    //   })
    //   .catch((err: any) => {
    //     throw new Error(`请求错误: ${err.messages}`)
    //   })
    const data = await fetch(baseUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Cookie: `sessionKey=${sessionKey}`,
        },
        // cache: 'no-cache',
    }).catch((err) => {
        throw new Error(`请求错误: ${err.messages}`);
    });
    return data;
}
//# sourceMappingURL=completions.js.map