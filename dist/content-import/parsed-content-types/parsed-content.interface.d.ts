import { ContentProperties, ContentPropertyPayload, ContentType } from "./enum/content-enums";
export interface IParsedContent {
    addProperty(property: ContentProperties, payload?: string): void;
    getProperties(): ContentProperties[];
    getPayload(): ContentPropertyPayload;
    hasAnyPayload(): boolean;
    getContentLength(): number;
    getContent(): string;
    getContentType(): ContentType;
    getWrappedContent(): string;
    createOverridedContent(contentType: ContentType): IParsedContent;
}
