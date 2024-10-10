import {
  ContentProperties,
  ContentType,
} from "../../../parsed-content-types/enum/content-enums";
import { createParsedContent } from "../../../parsed-content-types/parsed-content.factory";
import { IParsedContent } from "../../../parsed-content-types/parsed-content.interface";
import { ICorrectionRule } from "../rule.abstract";
import { CoorectBlockRange } from "./correct-block-range.rule";

describe("CorrectionRule", () => {
  let correctionRule: ICorrectionRule;

  beforeEach(() => {
    correctionRule = new CoorectBlockRange();
  });

  it('should log "Has beginning block" for content with HAS_BEGINNING_BLOCK property', () => {
    const content: IParsedContent[] = [
      createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: "A",
        properties: [ContentProperties.HAS_BEGINNING_BLOCK],
        propertyPayload: { [ContentProperties.HAS_BEGINNING_BLOCK]: "align" },
      }),
      createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: "B",
        properties: [],
      }),
      createParsedContent({
        contentType: ContentType.LATEX_BLOCK,
        content: "C",
        properties: [ContentProperties.HAS_ENDING_BLOCK],
      }),
      createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: "D",
        properties: [],
      }),
    ];

    const result = correctionRule.apply(content);
    const filteredResult = result.map((content) => {
      return {
        contentType: content.getContentType(),
        content: content.getContent(),
        properties: content.getProperties(),
        propertyPayload: content.getPayload(),
      };
    });

    expect(filteredResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          contentType: ContentType.LATEX_BLOCK,
          content: "A",
          properties: [ContentProperties.HAS_BEGINNING_BLOCK],
          propertyPayload: { [ContentProperties.HAS_BEGINNING_BLOCK]: "align" },
        }),
        expect.objectContaining({
          contentType: ContentType.LATEX_BLOCK,
          content: "B",
          properties: [],
        }),
        expect.objectContaining({
          contentType: ContentType.LATEX_BLOCK,
          content: "C",
          properties: [ContentProperties.HAS_ENDING_BLOCK],
        }),
      ])
    );
    expect(filteredResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          contentType: ContentType.MARKDOWN,
          content: "D",
          properties: [],
        }),
      ])
    );
  });
});
