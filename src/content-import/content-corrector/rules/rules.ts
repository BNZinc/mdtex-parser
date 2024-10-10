import { ContentProperties } from "../../types/enum/content-enums";
import { CorrectingContentMap } from "../content-corrector";

export class CorrectionRule {
  protected interestingProperties: ContentProperties[] = [
    ContentProperties.HAS_BEGINNING_BLOCK,
    ContentProperties.HAS_ENDING_BLOCK,
    ContentProperties.HAS_TEX,
  ];
  constructor() {}

  apply(content: CorrectingContentMap[]): void {
    const ruleMap = [];
    content.forEach((content, index) => {
      if (content.properties.includes(ContentProperties.HAS_BEGINNING_BLOCK)) {
        console.log(index, "Has beginning block");
      }
      if (content.properties.includes(ContentProperties.HAS_ENDING_BLOCK)) {
        console.log(index, "Has ending block");
      }
    });
  }
}
