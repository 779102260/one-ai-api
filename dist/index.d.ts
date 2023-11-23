import * as OpenAI from './openai';
import * as Azure from './azure';
import * as Claude from './claude';
import * as Bard from './bard';
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
    answer: any;
    ai: "bard";
}>;
