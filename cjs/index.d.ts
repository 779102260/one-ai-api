import * as OpenAI from './openai/index';
import * as Azure from './azure/index';
import * as Claude from './claude/index';
import * as Bard from './bard/index';
export type IConfig = {
    order?: ('openai' | 'claude' | 'bard' | 'azure')[];
    openai?: Partial<OpenAI.IAskConfig>;
    azure?: Partial<Azure.IAskConfig>;
    claude?: Partial<Claude.IAskConfig>;
    bard?: Partial<Bard.IAskConfig>;
    /** 开启错误日志 */
    degguer?: boolean;
};
export declare function askAuto(prompt: string, config: IConfig): Promise<{
    answer: string;
    ai: "openai";
} | {
    answer: string;
    ai: "azure";
} | {
    answer: string;
    ai: "claude";
} | {
    answer: string;
    ai: "bard";
}>;
