import { ContentProperties, ContentType } from "../parsed-content-types/enum/content-enums";
import { IParsedContent } from "../parsed-content-types/parsed-content.interface";
export interface IContentParser {
    appendResult(parsedContent: IParsedContent): void;
    parse(fullContents: string): IParsedContent[];
}
declare class ContentBuffer {
    constructor(params: {
        defaultMode?: ContentType;
    });
    protected buffer: string;
    protected mode: ContentType;
    protected defaultMode: ContentType;
    append(content: string): void;
    isDefaultMode(): boolean;
    flush(properties?: ContentProperties[]): IParsedContent;
    toggleMode(mode: ContentType): void;
}
type ParserParams = {
    inlineMathDelimiter: string;
    blockMathDelimiter: string;
};
export declare class ContentParser implements IContentParser {
    buffer: ContentBuffer;
    inlineMathDelimiter: string;
    blockMathDelimiter: string;
    toExportContents: IParsedContent[];
    constructor(ParserParams?: ParserParams);
    appendResult(parsedContent: IParsedContent): void;
    parse(fullContents: string): IParsedContent[];
}
export {};
