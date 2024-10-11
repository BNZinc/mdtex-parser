import {
  createContentCorrector,
  IContentCorrector,
} from "./content-corrector/content-corrector";
import { contentParser, IContentParser } from "./content-parser/content-parser";

class ContentImporter {
  constructor(
    protected readonly originalContents: string,
    protected readonly parser: IContentParser,
    protected readonly corrector: IContentCorrector
  ) {}

  exportContents(): string {
    const parsedContents = this.parser.parse(this.originalContents);
    const correctedContents = this.corrector.correct(parsedContents);
    return correctedContents.map((content) => content.getContent()).join("\n");
  }
}

export function getContentImporter(originalContents: string) {
  return new ContentImporter(
    originalContents,
    contentParser,
    createContentCorrector
  );
}
