import { CorrectionRule } from "./rules";
import {} from "../../types/parsed-content.abstract";
import { CorrectingContentMap } from "../content-corrector";
import { ContentProperties, ContentType } from "../../types/enum/content-enums";

describe("CorrectionRule", () => {
  let correctionRule: CorrectionRule;

  beforeEach(() => {
    correctionRule = new CorrectionRule();
  });

  it('should log "Has beginning block" for content with HAS_BEGINNING_BLOCK property', () => {
    const content: CorrectingContentMap[] = [
      {
        properties: [ContentProperties.HAS_BEGINNING_BLOCK],
        contentType: ContentType.LATEX_INLINE,
        propertyPayload: {
          [ContentProperties.HAS_BEGINNING_BLOCK]: "align",
        },
      },
      {
        properties: [],
        contentType: ContentType.MARKDOWN,
        propertyPayload: {},
      },
      {
        properties: [],
        contentType: ContentType.MARKDOWN,
        propertyPayload: {},
      },
      {
        properties: [ContentProperties.HAS_ENDING_BLOCK],
        contentType: ContentType.LATEX_INLINE,
        propertyPayload: {},
      },
    ];

    correctionRule.apply(content);
  });
});
