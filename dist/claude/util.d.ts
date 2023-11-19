/**
 * 将 claude web api 返回格式转为正常文本内容
 */
export declare function formatConversion(result: any): string;
/**
 * openai 请求体格式转为 cluade 请求体格式
 */
export declare const openaiToClaudeRequest: (messages: Message[], orgId: string, conversationId: string, sessionKey: string) => {
    completion: {
        prompt: string;
        timezone: string;
        model: string;
    };
    organization_uuid: string;
    conversation_uuid: string;
    text: string;
    attachments: any[];
};
/**
 * 生成的 prompt 格式，可参考下述例子
 *
 * example 1: "messages": [
 * {"role": "system", "content":"请输出 json 格式"},
 * {"role": "user", "content":"今天日期是？"},
 * {"role": "assistant", "content":"今天是 5 月 30 日。"},
 * {"role": "user", "content":"今天天气怎么样？"},
 * {"role": "assistant", "content":"今天是晴天。"},
 * {"role": "user", "content":"你好"}]
 * ```
    Tips:
    今天日期是？
    今天是 5 月 30 日。
    今天天气怎么样？
    今天是晴天。
    Please refer to the prompts above for your answer (Return the results of the question):
    今天的日期，天气如何？（请输出 json 格式）
 ```
 * example 2: "messages": [ {"role": "user", "content":"你好，介绍下自己"} ]
 * ```
    你好，介绍下自己
 ```
 */
export declare const generatePrompt: (messages: Message[]) => string;
export declare function readerStream(response: any): Promise<string>;
interface Message {
    role: string;
    content: string;
    name?: string;
    function_call?: object;
}
export {};
