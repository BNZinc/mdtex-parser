export const enum ContentType {
  "LATEX-INLINE",
  "LATEX-BLOCK",
  "MARKDOWN",
}

export abstract class ParsedContent {
  constructor(params: { content: string }) {
    this.content = params.content;
  }
  content: string;
  abstract contentType: ContentType;
}
