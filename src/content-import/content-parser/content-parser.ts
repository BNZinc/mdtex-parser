import {
  ContentProperties,
  ContentType,
  ParsedContent,
} from "./types/parsed-content.abstract";
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
  isDefaultMode(): boolean {
    return this.mode === this.defaultMode;
  }
  flush(properties?: ContentProperties[]): ParsedContent {
    const content = this.buffer;
    const mode = this.mode;

    this.buffer = "";

    return createParsedContent({
      contentType: mode,
      content: content,
      properties,
    });
  }
  toggleMode(mode: ContentType): void {
    if (this.mode === mode) {
      this.mode = this.defaultMode;
    } else this.mode = mode;
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
    if (parsedContent.hasAnyPayload()) {
      this.toExportContents.push(parsedContent);
    }
  }

  parse(fullContents: string): ParsedContent[] {
    const lineSplitContents = fullContents.split("\n");

    lineSplitContents.forEach((line) => {
      let charIndex = 0;
      while (charIndex < line.length) {
        if (
          line.substring(charIndex, charIndex + 2) === this.blockMathDelimiter
        ) {
          this.appendResult(this.buffer.flush());
          this.buffer.toggleMode(ContentType.LATEX_BLOCK);
          charIndex += 2;
        } else if (line[charIndex] === this.inlineMathDelimiter) {
          this.appendResult(this.buffer.flush());
          this.buffer.toggleMode(ContentType.LATEX_INLINE);
          charIndex += 1;
        } else {
          this.buffer.append(line[charIndex]);
          charIndex += 1;
        }
      }
      if (this.buffer.isDefaultMode()) {
        this.appendResult(this.buffer.flush([ContentProperties.HAS_NEWLINE]));
      }
    });
    this.appendResult(this.buffer.flush([ContentProperties.HAS_NEWLINE]));

    return this.toExportContents;
  }
}

const parser = new ContentParser();
