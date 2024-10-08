import { ContentType, ParsedContent } from "./parsed-content.abstract";

export class LaTeXInlineContent extends ParsedContent {
  constructor(params: { content: string }) {
    super(params);
  }
  contentType = ContentType["LATEX-INLINE"];
}

export class LaTeXBlockContent extends ParsedContent {
  constructor(params: { content: string }) {
    super(params);
  }
  contentType = ContentType["LATEX-BLOCK"];
}

export class MarkdownContent extends ParsedContent {
  constructor(params: { content: string }) {
    super(params);
  }
  contentType = ContentType["MARKDOWN"];
}

export function createParsedContent(params: {
  contentType: ContentType;
  content: string;
}) {
  switch (params.contentType) {
    case ContentType["LATEX-INLINE"]:
      return new LaTeXInlineContent(params);
    case ContentType["LATEX-BLOCK"]:
      return new LaTeXBlockContent(params);
    case ContentType["MARKDOWN"]:
      return new MarkdownContent(params);
    default:
      throw new Error(`Unknown content type: ${params.contentType}`);
  }
}
