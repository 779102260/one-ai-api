/**
 * 单次对话，无上下文，无stream
 * @param prompt 问题
 * @param apiKey API_KEY 应该从环境变量中获取
 */
export declare function ask(prompt: string, apiKey?: string): Promise<string>;
export type IAskConfig = {
    prompt: string;
    apiKey?: string;
};
