import { ContentType } from "../enum/content-enums";
import { ParsedContent } from "../parsed-content.abstract";

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
