import * as OpenAI from './openai';
import * as Azure from './azure';
import * as Claude from './claude';
import * as Bard from './bard';
export type IConfig = {
    openai?: Partial<OpenAI.IAskConfig>;
    azure?: Partial<Azure.IAskConfig>;
    claude?: Partial<Claude.IAskConfig>;
    bard?: Partial<Bard.IAskConfig>;
};
export declare function askAuto(prompt: string, config: IConfig): Promise<{
    answer: string;
    ai: "" | keyof IConfig;
}>;
