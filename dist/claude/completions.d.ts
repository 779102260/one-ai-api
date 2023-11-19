/// <reference types="node" />
export interface Conversation {
    uuid: string;
    name: string;
    summary: string;
    created_at: string;
    updated_at: string;
}
/**
 * 获取历史对话列表
 * @param orgId
 * @param sessionKey
 * @returns
 */
export declare function getAll(orgId: string, sessionKey: string): Promise<Conversation[]>;
/**
 * 获取会话
 * @param orgId
 * @param conversation_id
 * @param sessionKey
 */
export declare function get(orgId: string, conversationId: string, sessionKey: string): Promise<unknown>;
/**
 * 创建会话
 */
export declare function create(orgId: string, sessionKey: string, opts?: {
    uuid?: string;
    name?: string;
}): Promise<any>;
/**
 *  删除会话
 * @param orgId
 * @param conversation_id
 * @param sessionKey
 */
export declare function del(orgId: string, conversationId: string, sessionKey: string): Promise<Response>;
