import { ContentProperties, ContentPropertyPayload, ContentType } from "./enum/content-enums";
import { ParsedContent } from "./parsed-content.abstract";
import { IParsedContent } from "./parsed-content.interface";
export declare function createParsedContent(params: {
    contentType: ContentType;
    content: string;
    properties?: ContentProperties[];
    propertyPayload?: ContentPropertyPayload;
    overridingContent?: ParsedContent;
}): IParsedContent;
