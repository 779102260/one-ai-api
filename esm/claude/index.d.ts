/**
 * 单次对话，无上下文，无stream
 * @param prompt 问题
 * @param orgId ORG_ID 应该从环境变量中获取
 * @param sessionKey SESSION_KEY 应该从环境变量中获取
 */
export declare function ask(prompt: string, orgId?: string | undefined, sessionKey?: string | undefined): Promise<string>;
export type IAskConfig = {
    prompt: string;
    orgId?: string;
    sessionKey?: string;
};
