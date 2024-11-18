import { ContentType, ContentProperties } from "../enum/content-enums";
import { ParsedContent } from "../parsed-content.abstract";


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
