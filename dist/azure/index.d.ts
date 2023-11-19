/**
 * 单次对话，无上下文，无stream
 * @param prompt
 * @param endPoint
 * @param apiKey
 */
export declare function ask(prompt: string, endPoint?: string, apiKey?: string): Promise<any>;
export type IAskConfig = {
    prompt: string;
    endPoint?: string;
    apiKey?: string;
};
