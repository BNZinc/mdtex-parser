import { ContentType, ParsedContent } from "./types/parsed-content.abstract";
import { createParsedContent } from "./types/parsed-content.implements";

class ContentBuffer {
  constructor(params: { defaultMode?: ContentType }) {
    this.mode = params.defaultMode ?? ContentType["MARKDOWN"];
    this.defaultMode = params.defaultMode ?? ContentType["MARKDOWN"];
  }
  protected buffer: string = "";
  protected mode: ContentType;
  protected defaultMode: ContentType;

  append(content: string): void {
    this.buffer += content;
  }
  flush(): ParsedContent {
    const content = this.buffer;
    const mode = this.mode;

    this.mode = this.defaultMode;
    this.buffer = "";

    return createParsedContent({
      contentType: mode,
      content: content,
    });
  }
  toggleMode(mode: ContentType): void {
    if (this.mode === mode) {
      this.mode = ContentType["MARKDOWN"];
    }
    this.mode = mode;
  }
}

type ParserParams = {
  inlineMathDelimiter: string;
  blockMathDelimiter: string;
};
export class ContentParser {
  buffer: ContentBuffer;
  inlineMathDelimiter: string;
  blockMathDelimiter: string;
  toExportContents: ParsedContent[] = [];

  constructor(
    ParserParams: ParserParams = {
      inlineMathDelimiter: "$",
      blockMathDelimiter: "$$",
    }
  ) {
    this.buffer = new ContentBuffer({});
    this.inlineMathDelimiter = ParserParams.inlineMathDelimiter;
    this.blockMathDelimiter = ParserParams.blockMathDelimiter;
  }
  appendResult(parsedContent: ParsedContent) {
    if (parsedContent.getContentLength() > 0) {
      this.toExportContents.push(parsedContent);
    }
  }

  parse(content: string): ParsedContent[] {
    let charIndex = 0;

    while (charIndex < content.length) {
      if (
        content.substring(charIndex, charIndex + 2) === this.blockMathDelimiter
      ) {
        this.appendResult(this.buffer.flush());
        this.buffer.toggleMode(ContentType["LATEX-BLOCK"]);
        charIndex += 2;
      } else if (content[charIndex] === this.inlineMathDelimiter) {
        this.appendResult(this.buffer.flush());
        this.buffer.toggleMode(ContentType["LATEX-INLINE"]);
        charIndex += 1;
      } else {
        this.buffer.append(content[charIndex]);
        charIndex += 1;
      }
    }

    this.appendResult(this.buffer.flush());

    return this.toExportContents;
  }
}

const parser = new ContentParser();
