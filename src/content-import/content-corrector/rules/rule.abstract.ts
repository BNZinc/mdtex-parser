import { ContentProperties } from "../../parsed-content-types/enum/content-enums";
import { IParsedContent } from "../../parsed-content-types/parsed-content.interface";

export abstract class CorrectionRule implements ICorrectionRule {
  protected interestingProperties: ContentProperties[] = [
    ContentProperties.HAS_BEGINNING_BLOCK,
    ContentProperties.HAS_ENDING_BLOCK,
    ContentProperties.HAS_TEX,
  ];
  constructor() {}

  protected abstract _onApply(content: IParsedContent[]): IParsedContent[];

  apply(content: IParsedContent[]): IParsedContent[] {
    return this._onApply(content);
  }
}

export interface ICorrectionRule {
  apply(content: IParsedContent[]): IParsedContent[];
}
