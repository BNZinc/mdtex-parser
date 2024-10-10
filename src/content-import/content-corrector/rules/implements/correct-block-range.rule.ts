import {
  ContentProperties,
  ContentType,
} from "../../../parsed-content-types/enum/content-enums";
import { IParsedContent } from "../../../parsed-content-types/parsed-content.interface";
import { CorrectionRule, ICorrectionRule } from "../rule.abstract";

export class CorrectBlockRange
  extends CorrectionRule
  implements ICorrectionRule
{
  _onApply(content: IParsedContent[]): IParsedContent[] {
    const correctingContents: IParsedContent[] = [];
    let startingIndex: number = content.length - 1;
    let endingIndex = content.length - 1;
    content.forEach((content, currentIndex) => {
      const currentProperties = content.getProperties();
      if (currentProperties.includes(ContentProperties.HAS_BEGINNING_BLOCK)) {
        startingIndex = currentIndex;
      }
      if (currentProperties.includes(ContentProperties.HAS_ENDING_BLOCK)) {
        endingIndex = currentIndex;
      }

      if (currentIndex >= startingIndex && currentIndex <= endingIndex) {
        correctingContents.push(
          content.createOverridedContent(ContentType.LATEX_BLOCK)
        );
      } else {
        correctingContents.push(content);
      }
    });

    return correctingContents;
  }
}
