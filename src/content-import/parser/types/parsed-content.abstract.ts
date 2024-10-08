export const enum ContentType {
  "LATEX-INLINE",
  "LATEX-BLOCK",
  "MARKDOWN",
}

export abstract class ParsedContent {
  constructor(params: { content: string }) {
    this.content = params.content;
  }
  protected content: string;
  abstract contentType: ContentType;

  getContentLength(): number {
    return this.content.length;
  }
  getContent(): string {
    return this.content;
  }
}
