import { IParsedContent } from "../parsed-content-types/parsed-content.interface";
import { CheckMarkdownHasTeX } from "./rules/implements/check-markdown-has-tex.rule";
import { CorrectBlockRange } from "./rules/implements/correct-block-range.rule";
import { ICorrectionRule } from "./rules/rule.abstract";
export class ContentCorrector implements IContentCorrector {
  rules: ICorrectionRule[];
  constructor(rules: ICorrectionRule[]) {
    this.rules = rules;
  }
  correct(contents: IParsedContent[]): IParsedContent[] {
    return this.rules.reduce((acc, rule) => {
      return rule.apply(acc);
    }, contents);
  }
}

export interface IContentCorrector {
  correct(contents: IParsedContent[]): IParsedContent[];
}

export const createContentCorrector = new ContentCorrector([
  new CorrectBlockRange(),
  new CheckMarkdownHasTeX(),
]);
