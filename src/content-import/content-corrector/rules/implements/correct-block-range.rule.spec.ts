import {
  ContentProperties,
  ContentType,
} from "../../../parsed-content-types/enum/content-enums";
import { createParsedContent } from "../../../parsed-content-types/parsed-content.factory";
import { IParsedContent } from "../../../parsed-content-types/parsed-content.interface";
import { ICorrectionRule } from "../rule.abstract";
import { CorrectBlockRange } from "./correct-block-range.rule";

describe("CorrectionRule", () => {
  let correctionRule: ICorrectionRule;

  beforeEach(() => {
    correctionRule = new CorrectBlockRange();
  });

  it("MARKDOWN이지만 begin 문이 있는 경우와 같이 컨텐츠의 타입과 프로퍼티의 속성이 일치하지 않는 경우, 타입을 변경", () => {
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

  it("Block이 두개 이상 포함되어있을 때, 시작과 끝을 판단해서 올바른 위치만 블록으로 표시해야 함", () => {
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
        properties: [ContentProperties.HAS_BEGINNING_BLOCK],
        propertyPayload: { [ContentProperties.HAS_BEGINNING_BLOCK]: "array" },
      }),
      createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: "C",
        properties: [],
      }),
      createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: "D",
        properties: [ContentProperties.HAS_ENDING_BLOCK],
        propertyPayload: { [ContentProperties.HAS_ENDING_BLOCK]: "array" },
      }),
      createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: "E",
        properties: [ContentProperties.HAS_ENDING_BLOCK],
        propertyPayload: { [ContentProperties.HAS_ENDING_BLOCK]: "align" },
      }),
      createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: "F",
        properties: [],
      }),
      createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: "G",
        properties: [ContentProperties.HAS_BEGINNING_BLOCK],
        propertyPayload: { [ContentProperties.HAS_BEGINNING_BLOCK]: "align" },
      }),
      createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: "H",
        properties: [],
      }),
      createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: "I",
        properties: [ContentProperties.HAS_ENDING_BLOCK],
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
          properties: [ContentProperties.HAS_BEGINNING_BLOCK],
          propertyPayload: { [ContentProperties.HAS_BEGINNING_BLOCK]: "array" },
        }),
        expect.objectContaining({
          contentType: ContentType.LATEX_BLOCK,
          content: "C",
          properties: [],
        }),
        expect.objectContaining({
          contentType: ContentType.LATEX_BLOCK,
          content: "D",
          properties: [ContentProperties.HAS_ENDING_BLOCK],
          propertyPayload: { [ContentProperties.HAS_ENDING_BLOCK]: "array" },
        }),
        expect.objectContaining({
          contentType: ContentType.LATEX_BLOCK,
          content: "E",
          properties: [ContentProperties.HAS_ENDING_BLOCK],
          propertyPayload: { [ContentProperties.HAS_ENDING_BLOCK]: "align" },
        }),
      ])
    );
    expect(filteredResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          contentType: ContentType.MARKDOWN,
          content: "F",
          properties: [],
        }),
      ])
    );

    expect(filteredResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          contentType: ContentType.LATEX_BLOCK,
          content: "G",
          properties: [ContentProperties.HAS_BEGINNING_BLOCK],
          propertyPayload: { [ContentProperties.HAS_BEGINNING_BLOCK]: "align" },
        }),
        expect.objectContaining({
          contentType: ContentType.LATEX_BLOCK,
          content: "H",
          properties: [],
        }),
        expect.objectContaining({
          contentType: ContentType.LATEX_BLOCK,
          content: "I",
          properties: [ContentProperties.HAS_ENDING_BLOCK],
        }),
      ])
    );
  });
});
