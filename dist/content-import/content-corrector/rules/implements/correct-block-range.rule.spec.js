"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_content_containing_1 = require("../../../../utils/jest/expect-content-containing");
const content_enums_1 = require("../../../parsed-content-types/enum/content-enums");
const parsed_content_factory_1 = require("../../../parsed-content-types/parsed-content.factory");
const correct_block_range_rule_1 = require("./correct-block-range.rule");
describe("CorrectionRule", () => {
    let correctionRule;
    beforeEach(() => {
        correctionRule = new correct_block_range_rule_1.CorrectBlockRange();
    });
    it("블록에 대한 단서가 없는 블록 구문은 HAS_TEX 구문에 따라 마크다운 또는 Inline으로 변경", () => {
        const content = [
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "A",
                properties: [],
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.LATEX_BLOCK,
                content: "B",
                properties: [],
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.LATEX_BLOCK,
                content: "C",
                properties: [content_enums_1.ContentProperties.HAS_TEX],
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
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.MARKDOWN, "A", []);
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.MARKDOWN, "B", []);
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_INLINE, "C", [
            content_enums_1.ContentProperties.HAS_TEX,
        ]);
    });
    it("MARKDOWN이지만 begin 문이 있는 경우와 같이 컨텐츠의 타입과 프로퍼티의 속성이 일치하지 않는 경우, 타입을 변경", () => {
        const content = [
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "A",
                properties: [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK],
                propertyPayload: { [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK]: "align" },
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "B",
                properties: [],
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.LATEX_BLOCK,
                content: "C",
                properties: [content_enums_1.ContentProperties.HAS_ENDING_BLOCK],
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
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
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_BLOCK, "A", [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK], { [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK]: "align" });
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_BLOCK, "B", []);
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_BLOCK, "C", [
            content_enums_1.ContentProperties.HAS_ENDING_BLOCK,
        ]);
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.MARKDOWN, "D", []);
    });
    it("Block이 두개 이상 포함되어있을 때, 시작과 끝을 판단해서 올바른 위치만 블록으로 표시해야 함", () => {
        const content = [
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "A",
                properties: [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK],
                propertyPayload: { [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK]: "align" },
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "B",
                properties: [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK],
                propertyPayload: { [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK]: "array" },
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "C",
                properties: [],
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "D",
                properties: [content_enums_1.ContentProperties.HAS_ENDING_BLOCK],
                propertyPayload: { [content_enums_1.ContentProperties.HAS_ENDING_BLOCK]: "array" },
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "E",
                properties: [content_enums_1.ContentProperties.HAS_ENDING_BLOCK],
                propertyPayload: { [content_enums_1.ContentProperties.HAS_ENDING_BLOCK]: "align" },
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "F",
                properties: [],
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "G",
                properties: [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK],
                propertyPayload: { [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK]: "align" },
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "H",
                properties: [],
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "I",
                properties: [content_enums_1.ContentProperties.HAS_ENDING_BLOCK],
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
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_BLOCK, "A", [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK], { [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK]: "align" });
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_BLOCK, "B", [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK], { [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK]: "array" });
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_BLOCK, "C", []);
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_BLOCK, "D", [content_enums_1.ContentProperties.HAS_ENDING_BLOCK], { [content_enums_1.ContentProperties.HAS_ENDING_BLOCK]: "array" });
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_BLOCK, "E", [content_enums_1.ContentProperties.HAS_ENDING_BLOCK], { [content_enums_1.ContentProperties.HAS_ENDING_BLOCK]: "align" });
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.MARKDOWN, "F", []);
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_BLOCK, "G", [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK], { [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK]: "align" });
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_BLOCK, "H", []);
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_BLOCK, "I", [
            content_enums_1.ContentProperties.HAS_ENDING_BLOCK,
        ]);
    });
});
//# sourceMappingURL=correct-block-range.rule.spec.js.map