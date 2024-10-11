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
        if (ContentProperties.HAS_NEWLINE in content.getProperties()) {
          return content.getWrappedContent() + "\n";
        } else return content.getWrappedContent();
      })
      .join("");
  }
}

export function getContentImporter(originalContents: string): string {
  return new ContentImporter(
    originalContents,
    contentParser,
    createContentCorrector
  ).exportContents();
}
