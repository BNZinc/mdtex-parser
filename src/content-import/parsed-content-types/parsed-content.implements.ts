import { ContentProperties, ContentType } from "./enum/content-enums";
import { ParsedContent } from "./parsed-content.abstract";

export class LaTeXInlineContent extends ParsedContent {
  contentType = ContentType.LATEX_INLINE;
  protected _onGetWrappedContent(): string {
    const content = super.getContent();
    const lastHashIndex = content.lastIndexOf("#");
    if (lastHashIndex !== -1) {
      return `$${content.slice(lastHashIndex + 1).trim()}$`;
    }
    return `$${content.trim()}$`;
  }
}

export class LaTeXBlockContent extends ParsedContent {
  contentType = ContentType.LATEX_BLOCK;
  protected _onGetWrappedContent(): string {
    const headding = this.getProperties().includes(
      ContentProperties.HAS_BEGINNING_BLOCK
    )
      ? "$$"
      : "";
    const tail = this.getProperties().includes(
      ContentProperties.HAS_ENDING_BLOCK
    )
      ? "$$"
      : "";
    return `${headding}${super.getContent()}${tail}`;
  }
}

export class MarkdownContent extends ParsedContent {
  contentType = ContentType["MARKDOWN"];
  protected _onGetWrappedContent(): string {
    return super.getContent();
  }
}
