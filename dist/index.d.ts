import * as OpenAI from './openai';
import * as Azure from './azure';
import * as Claude from './claude';
import * as Bard from './bard';
type IConfig = {
    openai: OpenAI.IAskConfig;
    azure: Azure.IAskConfig;
    claude: Claude.IAskConfig;
    bard: Bard.IAskConfig;
};
export declare function askAuto(prompt: string, config: IConfig): Promise<any>;
export {};
