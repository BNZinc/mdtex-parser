import { expectContent } from "../../../../utils/jest/expect-content-containing";
import {
  ContentProperties,
  ContentType,
} from "../../../parsed-content-types/enum/content-enums";
import { createParsedContent } from "../../../parsed-content-types/parsed-content.factory";
import { IParsedContent } from "../../../parsed-content-types/parsed-content.interface";
import { ICorrectionRule } from "../rule.abstract";
import { CheckMarkdownHasTeX } from "./check-markdown-has-tex.rule";

describe("CorrectionRule", () => {
  let correctionRule: ICorrectionRule;

  beforeEach(() => {
    correctionRule = new CheckMarkdownHasTeX();
  });

  it("MARKDOWN이지만 begin 문이 있는 경우와 같이 컨텐츠의 타입과 프로퍼티의 속성이 일치하지 않는 경우, 타입을 변경", () => {
    const content: IParsedContent[] = [
      createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: "A",
        properties: [ContentProperties.HAS_TEX],
      }),
      createParsedContent({
        contentType: ContentType.LATEX_INLINE,
        content: "B",
        properties: [
          ContentProperties.HAS_BEGINNING_BLOCK,
          ContentProperties.HAS_TEX,
        ],
        propertyPayload: { [ContentProperties.HAS_BEGINNING_BLOCK]: "align" },
      }),
      createParsedContent({
        contentType: ContentType.LATEX_INLINE,
        content: "C",
        properties: [ContentProperties.HAS_ENDING_BLOCK],
        propertyPayload: { [ContentProperties.HAS_ENDING_BLOCK]: "align" },
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

    expectContent(filteredResult, ContentType.LATEX_INLINE, "A", [
      ContentProperties.HAS_TEX,
    ]);

    expectContent(
      filteredResult,
      ContentType.LATEX_INLINE,
      "B",
      [ContentProperties.HAS_BEGINNING_BLOCK, ContentProperties.HAS_TEX],
      { [ContentProperties.HAS_BEGINNING_BLOCK]: "align" }
    );

    expectContent(
      filteredResult,
      ContentType.LATEX_INLINE,
      "C",
      [ContentProperties.HAS_ENDING_BLOCK],
      { [ContentProperties.HAS_ENDING_BLOCK]: "align" }
    );

    expectContent(filteredResult, ContentType.MARKDOWN, "D", []);
  });
});
