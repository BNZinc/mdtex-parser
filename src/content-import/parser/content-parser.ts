import { ContentType, ParsedContent } from "./types/parsed-content.abstract";
import { createParsedContent } from "./types/parsed-content.implements";

export class ContentParser {
  constructor() {}
  parse(content: string): ParsedContent[] {
    return [
      createParsedContent({
        contentType: ContentType["MARKDOWN"],
        content,
      }),
    ];
  }
}

const parser = new ContentParser();
