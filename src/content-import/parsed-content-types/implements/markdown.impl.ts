import { ContentType } from "../enum/content-enums";
import { ParsedContent } from "../parsed-content.abstract";


export class MarkdownContent extends ParsedContent {
  contentType = ContentType["MARKDOWN"];
  protected _onGetWrappedContent(): string {
    return super.getContent();
  }
}
