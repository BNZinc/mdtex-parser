import {
  ContentProperties,
  ContentType,
} from "../../../parsed-content-types/enum/content-enums";
import { IParsedContent } from "../../../parsed-content-types/parsed-content.interface";
import { CorrectionRule, ICorrectionRule } from "../rule.abstract";

interface Range {
  start: number;
  end: number;
}

export class CorrectBlockRange
  extends CorrectionRule
  implements ICorrectionRule
{
  protected ruleName: string = CorrectBlockRange.name;

  _onApply(content: IParsedContent[]): IParsedContent[] {
    const ranges: Range[] = [];
    const stack: number[] = [];

    content.forEach((content, currentIndex) => {
      const currentProperties = content.getProperties();
      if (currentProperties.includes(ContentProperties.HAS_BEGINNING_BLOCK)) {
        stack.push(currentIndex);
      }
      if (currentProperties.includes(ContentProperties.HAS_ENDING_BLOCK)) {
        const startIndex = stack.pop();
        if (startIndex !== undefined) {
          ranges.push({ start: startIndex, end: currentIndex });
        }
      }
    });

    const result = ranges.reduce((acc, { start, end }) => {
      return this.setBlockRange(acc, start, end);
    }, content);

    return result;
  }

  private setBlockRange(
    content: IParsedContent[],
    startingIndex: number,
    endingIndex: number
  ): IParsedContent[] {
    const correctingContents: IParsedContent[] = [];

    content.forEach((content, currentIndex) => {
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
