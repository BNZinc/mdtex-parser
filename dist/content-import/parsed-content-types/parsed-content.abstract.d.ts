import { ContentProperties, ContentPropertyPayload, ContentType } from "./enum/content-enums";
import { IParsedContent } from "./parsed-content.interface";
export declare function getEnumKeyByValue(enumObj: any, value: any): string | undefined;
export declare abstract class ParsedContent implements IParsedContent {
    overridingContent?: ParsedContent;
    protected properyPayload: ContentPropertyPayload;
    protected properties: ContentProperties[];
    protected content: string;
    protected abstract contentType: ContentType;
    constructor(params: {
        content: string;
    }, override?: ParsedContent);
    addProperty(property: ContentProperties, payload?: string): void;
    getProperties(): ContentProperties[];
    getPayload(): ContentPropertyPayload;
    hasAnyPayload(): boolean;
    getContentLength(): number;
    getContent(): string;
    getContentType(): ContentType;
    getWrappedContent(): string;
    protected abstract _onGetWrappedContent(): string;
    createOverridedContent(contentType: ContentType): IParsedContent;
}
