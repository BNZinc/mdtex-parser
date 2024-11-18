import {
  createContentCorrector,
  IContentCorrector,
} from "./content-corrector/content-corrector";
import { ContentParser, IContentParser } from "./content-parser/content-parser";
import {
  ContentProperties,
  ContentType,
} from "./parsed-content-types/enum/content-enums";
import { IParsedContent } from "./parsed-content-types/parsed-content.interface";

class ContentImporter {
  constructor(
    protected readonly originalContents: string,
    protected readonly parser: IContentParser,
    protected readonly corrector: IContentCorrector
  ) {}

  private shouldAddSpace(currentContent: IParsedContent, lastType: ContentType): boolean {
    return [ContentType.LATEX_BLOCK, ContentType.LATEX_INLINE].includes(lastType) &&
           currentContent.getContentType() === lastType;
  }

  private formatContent(content: IParsedContent, lastContentType: ContentType | undefined): string {
    let result = content.getWrappedContent();
    
    if (content.getProperties().includes(ContentProperties.HAS_NEWLINE)) {
      result += "\n";
    }
    if (lastContentType !== undefined && this.shouldAddSpace(content, lastContentType)) {
      result = " " + result;
    }
    
    return result;
  }

  exportContents(): string {
    const parsedContents = this.parser.parse(this.originalContents);
    const correctedContents = this.corrector.correct(parsedContents);
    let lastContentType: ContentType | undefined = undefined;

    const correctedResult = correctedContents
      .map(content => {
        const formattedContent = this.formatContent(content, lastContentType);
        lastContentType = content.getContentType();
        return formattedContent;
      })
      .join("");

    return correctedResult;
  }
}

export function getCorrectedContents(originalContents: string): string {
  const delimiterOverride = originalContents
    .replace(/\\\[|\\\]/g, "$$")
    .replace(/^(\\\\\(|\\\\\))$/, "$")
    .replace(/\\\(/g, "$")
    .replace(/\\\)/g, "$");
  const result = new ContentImporter(
    delimiterOverride,
    new ContentParser(),
    createContentCorrector()
  ).exportContents();
  return result;
}
