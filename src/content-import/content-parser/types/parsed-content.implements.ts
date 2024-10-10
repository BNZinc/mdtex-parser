import {
  ContentProperties,
  ContentType,
  ParsedContent,
} from "./parsed-content.abstract";

export class LaTeXInlineContent extends ParsedContent {
  constructor(params: { content: string }) {
    super(params);
  }
  contentType = ContentType.LATEX_INLINE;
}

export class LaTeXBlockContent extends ParsedContent {
  constructor(params: { content: string }) {
    super(params);
  }
  contentType = ContentType.LATEX_BLOCK;
}

export class MarkdownContent extends ParsedContent {
  constructor(params: { content: string }) {
    super(params);
  }
  contentType = ContentType["MARKDOWN"];
}

const typeMap = {
  [ContentType.LATEX_INLINE]: LaTeXInlineContent,
  [ContentType.LATEX_BLOCK]: LaTeXBlockContent,
  [ContentType.MARKDOWN]: MarkdownContent,
};

export function createParsedContent(params: {
  contentType: ContentType;
  content: string;
  properties?: ContentProperties[];
}): ParsedContent {
  const { contentType, content, properties } = params;
  const ParsedContent = typeMap[contentType];
  if (!ParsedContent) {
    throw new Error(`Unknown content type: ${contentType}`);
  }
  const parsedContent = new ParsedContent({ content });
  (properties ?? []).forEach((property) => parsedContent.addProperty(property));
  return parsedContent;
}
