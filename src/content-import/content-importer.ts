import {
  createContentCorrector,
  IContentCorrector,
} from "./content-corrector/content-corrector";
import { contentParser, IContentParser } from "./content-parser/content-parser";
import { ContentProperties } from "./parsed-content-types/enum/content-enums";

class ContentImporter {
  constructor(
    protected readonly originalContents: string,
    protected readonly parser: IContentParser,
    protected readonly corrector: IContentCorrector
  ) {}

  exportContents(): string {
    const parsedContents = this.parser.parse(this.originalContents);
    const correctedContents = this.corrector.correct(parsedContents);
    return correctedContents
      .map((content) => {
        if (content.getProperties().includes(ContentProperties.HAS_NEWLINE)) {
          return content.getWrappedContent() + "\n";
        } else return content.getWrappedContent();
      })
      .join("");
  }
}

export function getCorrectedContents(originalContents: string): string {
  const delimiterOverride = originalContents
    .replace(/\\\[|\\\]/g, "$$")
    .replace(/^(\\\\\(|\\\\\))$/, "$")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")");
  const result = new ContentImporter(
    delimiterOverride,
    contentParser,
    createContentCorrector
  ).exportContents();
  return result;
}
