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
  protected editedIndexes: Set<number> = new Set();

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

    const result = ranges
      .reduce((acc, { start, end }) => {
        return this.setBlockRange(acc, start, end);
      }, content)
      .map((content, index) => {
        const contentProps = content.getProperties();
        if (
          !this.editedIndexes.has(index) &&
          content.getContentType() === ContentType.LATEX_BLOCK
        ) {
          if (
            contentProps.includes(ContentProperties.HAS_BLOCK_ONLY_CONTENT) ===
            false
          ) {
            if (contentProps.includes(ContentProperties.HAS_TEX)) {
              return content.createOverridedContent(ContentType.LATEX_INLINE);
            } else {
              return content.createOverridedContent(ContentType.MARKDOWN);
            }
          }
        }

        return content;
      });

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
        this.editedIndexes.add(currentIndex);
      } else {
        correctingContents.push(content);
      }
    });

    return correctingContents;
  }
}
