export declare function ask(prompt: string, secure1psid?: string | undefined, secure1psidts?: string | undefined): Promise<any>;
export type IAskConfig = {
    prompt: string;
    secure1psid?: string;
    secure1psidts?: string;
};
