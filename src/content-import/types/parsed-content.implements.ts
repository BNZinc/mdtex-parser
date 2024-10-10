import { ContentType } from "./enum/content-enums";
import { ParsedContent } from "./parsed-content.abstract";

export class LaTeXInlineContent extends ParsedContent {
  contentType = ContentType.LATEX_INLINE;
}

export class LaTeXBlockContent extends ParsedContent {
  contentType = ContentType.LATEX_BLOCK;
}

export class MarkdownContent extends ParsedContent {
  contentType = ContentType["MARKDOWN"];
}
