import { ContentType } from "./enum/content-enums";
import { ParsedContent } from "./parsed-content.abstract";

export class LaTeXInlineContent extends ParsedContent {
  contentType = ContentType.LATEX_INLINE;
  protected _onGetWrappedContent(): string {
    return `$${super.getContent()}$`;
  }
}

export class LaTeXBlockContent extends ParsedContent {
  contentType = ContentType.LATEX_BLOCK;
  protected _onGetWrappedContent(): string {
    return `$$${super.getContent()}$$`;
  }
}

export class MarkdownContent extends ParsedContent {
  contentType = ContentType["MARKDOWN"];
  protected _onGetWrappedContent(): string {
    return super.getContent();
  }
}
