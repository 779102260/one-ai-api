import { ClientOptions } from 'openai';
/**
 * 单次对话，无上下文，无stream
 */
export declare function ask(prompt: string, apiKey?: string, config?: ClientOptions): Promise<string>;
export type IAskConfig = {
    prompt: string;
    apiKey?: string;
    config: ClientOptions;
};
