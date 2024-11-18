import { IParsedContent } from "../../parsed-content-types/parsed-content.interface";

export abstract class CorrectionRule implements ICorrectionRule {
  protected abstract ruleName: string;

  protected abstract _onApply(content: IParsedContent[]): IParsedContent[];

  apply(content: IParsedContent[]): IParsedContent[] {
    return this._onApply(content);
  }
}

export interface ICorrectionRule {
  apply(content: IParsedContent[]): IParsedContent[];
}
