import * as marked from 'marked';
export interface MarkedRenderOptions {
    imports?: string;
    markedOptions?: marked.MarkedOptions;
    native?: boolean;
}
export declare function markdown2jsx(markdown: string, options: MarkedRenderOptions): {
    content: string;
};
