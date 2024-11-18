"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_content_containing_1 = require("../../../../utils/jest/expect-content-containing");
const content_enums_1 = require("../../../parsed-content-types/enum/content-enums");
const parsed_content_factory_1 = require("../../../parsed-content-types/parsed-content.factory");
const check_markdown_has_tex_rule_1 = require("./check-markdown-has-tex.rule");
describe("CorrectionRule", () => {
    let correctionRule;
    beforeEach(() => {
        correctionRule = new check_markdown_has_tex_rule_1.CheckMarkdownHasTeX();
    });
    it("MARKDOWN이지만 begin 문이 있는 경우와 같이 컨텐츠의 타입과 프로퍼티의 속성이 일치하지 않는 경우, 타입을 변경", () => {
        const content = [
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.MARKDOWN,
                content: "A",
                properties: [content_enums_1.ContentProperties.HAS_TEX],
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.LATEX_INLINE,
                content: "B",
                properties: [
                    content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK,
                    content_enums_1.ContentProperties.HAS_TEX,
                ],
                propertyPayload: { [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK]: "align" },
            }),
            (0, parsed_content_factory_1.createParsedContent)({
                contentType: content_enums_1.ContentType.LATEX_INLINE,
                content: "C",
                properties: [content_enums_1.ContentProperties.HAS_ENDING_BLOCK],
                propertyPayload: { [content_enums_1.ContentProperties.HAS_ENDING_BLOCK]: "align" },
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
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_INLINE, "A", [
            content_enums_1.ContentProperties.HAS_TEX,
        ]);
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_INLINE, "B", [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK, content_enums_1.ContentProperties.HAS_TEX], { [content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK]: "align" });
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.LATEX_INLINE, "C", [content_enums_1.ContentProperties.HAS_ENDING_BLOCK], { [content_enums_1.ContentProperties.HAS_ENDING_BLOCK]: "align" });
        (0, expect_content_containing_1.expectContent)(filteredResult, content_enums_1.ContentType.MARKDOWN, "D", []);
    });
});
//# sourceMappingURL=check-markdown-has-tex.rule.spec.js.map