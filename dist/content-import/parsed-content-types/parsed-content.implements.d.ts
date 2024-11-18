import { ContentType } from "./enum/content-enums";
import { ParsedContent } from "./parsed-content.abstract";
export declare class LaTeXInlineContent extends ParsedContent {
    contentType: ContentType;
    protected _onGetWrappedContent(): string;
}
export declare class LaTeXBlockContent extends ParsedContent {
    contentType: ContentType;
    protected _onGetWrappedContent(): string;
}
export declare class MarkdownContent extends ParsedContent {
    contentType: ContentType;
    protected _onGetWrappedContent(): string;
}
