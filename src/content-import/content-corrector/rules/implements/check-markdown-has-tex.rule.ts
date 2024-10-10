import {
  ContentProperties,
  ContentType,
} from "../../../parsed-content-types/enum/content-enums";
import { IParsedContent } from "../../../parsed-content-types/parsed-content.interface";
import { CorrectionRule, ICorrectionRule } from "../rule.abstract";

export class CheckMarkdownHasTeX
  extends CorrectionRule
  implements ICorrectionRule
{
  protected ruleName: string = CheckMarkdownHasTeX.name;
  protected _onApply(content: IParsedContent[]): IParsedContent[] {
    const result = content.map((content) => {
      if (
        content.getContentType() === ContentType.MARKDOWN &&
        content.getProperties().includes(ContentProperties.HAS_TEX)
      ) {
        return content.createOverridedContent(ContentType.LATEX_INLINE);
      } else return content;
    });

    return result;
  }
}
