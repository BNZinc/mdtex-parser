"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_parser_1 = require("./content-parser");
const parsed_content_abstract_1 = require("../parsed-content-types/parsed-content.abstract");
const parsed_content_implements_1 = require("../parsed-content-types/parsed-content.implements");
const content_enums_1 = require("../parsed-content-types/enum/content-enums");
const inlineDelimiter = "$";
const blockDelimiter = "$$";
const hideLog = true;
describe("ContentParser", () => {
    let parser;
    beforeEach(() => {
        parser = new content_parser_1.ContentParser();
    });
    it("should be created", () => {
        expect(parser).toBeTruthy();
    });
    it("should parse markdown content", () => {
        const content = `# Title\n\n## Subtitle\n\nSome content.`;
        const parsedContent = parser.parse(content);
        expect(parsedContent).toEqual(expect.arrayContaining([
            expect.objectContaining({
                content: "# Title",
                contentType: content_enums_1.ContentType.MARKDOWN,
                properties: [content_enums_1.ContentProperties.HAS_NEWLINE],
            }),
            expect.objectContaining({
                content: "",
                contentType: content_enums_1.ContentType.MARKDOWN,
                properties: [content_enums_1.ContentProperties.HAS_NEWLINE],
            }),
            expect.objectContaining({
                content: "## Subtitle",
                contentType: content_enums_1.ContentType.MARKDOWN,
                properties: [content_enums_1.ContentProperties.HAS_NEWLINE],
            }),
            expect.objectContaining({
                content: "",
                contentType: content_enums_1.ContentType.MARKDOWN,
                properties: [content_enums_1.ContentProperties.HAS_NEWLINE],
            }),
            expect.objectContaining({
                content: "Some content.",
                contentType: content_enums_1.ContentType.MARKDOWN,
                properties: [content_enums_1.ContentProperties.HAS_NEWLINE],
            }),
            expect.objectContaining({
                content: "",
                contentType: content_enums_1.ContentType.MARKDOWN,
                properties: [content_enums_1.ContentProperties.HAS_NEWLINE],
            }),
        ]));
    });
    it("should parse content with LaTeX", () => {
        const expectedContent = `x^2`;
        const originalContent = inlineDelimiter + expectedContent + inlineDelimiter;
        const parsedContent = parser.parse(originalContent)[0];
        expect(parsedContent).toBeInstanceOf(parsed_content_implements_1.LaTeXInlineContent);
        expect(parsedContent.getContent()).toBe(expectedContent);
    });
    it("should parse content with LaTeX block", () => {
        const expectedContent = `x^2`;
        const originalContent = blockDelimiter + expectedContent + blockDelimiter;
        const parsedContent = parser.parse(originalContent)[0];
        expect(parsedContent).toBeInstanceOf(parsed_content_implements_1.LaTeXBlockContent);
        expect(parsedContent.getContent()).toBe(expectedContent);
    });
    it("should parse content with multiple LaTeX blocks", () => {
        const expectedContent = `x^2`;
        const originalContent = `$$a+b$$ ## It's a title $$${expectedContent}$$`;
        const parsedContents = parser.parse(originalContent);
        expect(parsedContents).toEqual(expect.arrayContaining([
            expect.objectContaining({
                content: "a+b",
                contentType: content_enums_1.ContentType.LATEX_BLOCK,
            }),
            expect.objectContaining({
                content: " ## It's a title ",
                contentType: content_enums_1.ContentType.MARKDOWN,
            }),
            expect.objectContaining({
                content: "x^2",
                contentType: content_enums_1.ContentType.LATEX_BLOCK,
            }),
        ]));
    });
    it("should add property has tex if content has tex", () => {
        const expectedContent = `abcd\\frac{1}{2}`;
        const originalContent = inlineDelimiter + expectedContent + inlineDelimiter;
        const parsedContent = parser.parse(originalContent)[0];
        expect(parsedContent.getProperties()).toContain(content_enums_1.ContentProperties.HAS_TEX);
    });
    it("블록 표현식을 인라인 표현식으로 표현하는 경우 파싱 확인", () => {
        const originalContent = `$f(x)= \\begin{cases} -6\\sqrt{4-x}+12 &(x<3) \\\\ \\frac{1}{6}(x-9)^2 &(x \\ge 3) \\end{cases}$ 에 대하여 $x$ 에 대한 방정식 $|f(x)|=n-1$`;
        const parsedContents = parser.parse(originalContent);
        expect(parsedContents).toEqual(expect.arrayContaining([
            expect.objectContaining({
                content: "f(x)= \\begin{cases} -6\\sqrt{4-x}+12 &(x<3) \\\\ \\frac{1}{6}(x-9)^2 &(x \\ge 3) \\end{cases}",
                contentType: content_enums_1.ContentType.LATEX_INLINE,
            }),
            expect.objectContaining({
                content: " 에 대하여 ",
                contentType: content_enums_1.ContentType.MARKDOWN,
            }),
            expect.objectContaining({
                content: "x",
                contentType: content_enums_1.ContentType.LATEX_INLINE,
            }),
            expect.objectContaining({
                content: " 에 대한 방정식 ",
                contentType: content_enums_1.ContentType.MARKDOWN,
            }),
            expect.objectContaining({
                content: "|f(x)|=n-1",
                contentType: content_enums_1.ContentType.LATEX_INLINE,
            }),
        ]));
    });
    it("누락된 블록 표현식을 인라인 표현식으로 표현하는 경우 파싱 확인", () => {
        const originalContent = `첫째항과 공비가 같고 공비가 1보다 큰 등비수열 $\\{a_n\\}$이 있다. 다음은 모든 자연수 $n$에 대하여 
\\left( \\sum_{k=1}^{n} a_k \\right)^2 = \\sum_{k=1}^{n} \\frac{(a_2 + a_1) a_k^2 - 2a_1 a_k^2}{a_2 - a_1} \\quad \\cdots (*)
이 성립함을 수학적 귀납법으로 증명한 것이다.
등비수열 $\\{a_n\\}$의 공비를 $r$라 하면 $a_2 = a_1 r$ 이므로 $(*)$의 우변은
\\sum_{k=1}^{n} \\frac{(r+1) a_k^2 - 2a_1 a_k^2}{a_2 - a_1} = \\sum_{k=1}^{n} \\frac{(r+1) a_k^2 - 2a_1 a_k^2}{a_2 - a_1} \\quad (가)
(i) $n=1$일 때, 
(좌변)$=($우변$)=a_1^2$
따라서 $(*)$이 성립한다.
(ii) $n=m$일 때, $(*)$이 성립한다고 가정하면
\\left( \\sum_{k=1}^{m} a_k \\right)^2 = \\sum_{k=1}^{m} \\frac{(r+1) a_k^2 - 2a_1 a_k^2}{a_2 - a_1} \\quad (가)
이다.
\\begin{aligned}
\\left( \\sum_{k=1}^{m+1} a_k \\right)^2 &= \\sum_{k=1}^{m+1} \\frac{(r+1) a_k^2 - 2a_1 a_k^2}{a_2 - a_1} \\quad (가) \\\\
&= \\sum_{k=1}^{m} \\frac{(r+1) a_k^2 - 2a_1 a_k^2}{a_2 - a_1} + \\frac{(r+1) a_{m+1}^2 - 2a_{m+1} a_1}{a_2 - a_1} \\quad (가) \\\\
&= \\left( \\sum_{k=1}^{m} a_k \\right)^2 + a_{m+1}^2 + \\boxed{\\text{(나)}} \\times a_{m+1} (a_{m+1} - a_1) \\\\
&= \\left( \\sum_{k=1}^{m+1} a_k \\right)^2 
\\end{aligned}
$$
따라서 $n=m+1$일 때도 $(*)$이 성립한다.
(i), (ii)에 의하여 모든 자연수 $n$에 대하여 $(*)$이 성립한다.
위의 (가), (나)에 알맞은 식을 각각 $f(r)$, $g(r)$라 하고, (다)에 알맞은 식에 $r=2$, $m=3$을 대입한 값을 $p$라 할 때, $\\dfrac{f(p)}{g(p+1)}$ 의 값은?
① 484  ② 488  ③ 492  ④ 496  ⑤ 500`;
        const parsedContents = parser.parse(originalContent);
        hideLog ||
            console.log(parsedContents
                .map((parsedContent) => {
                const content = parsedContent.getContent();
                const contentType = (0, parsed_content_abstract_1.getEnumKeyByValue)(content_enums_1.ContentType, parsedContent.getContentType());
                const properties = parsedContent
                    .getProperties()
                    .map((property) => (0, parsed_content_abstract_1.getEnumKeyByValue)(content_enums_1.ContentProperties, property));
                return `${content},${contentType},${properties.join("|")}`;
            })
                .join("\n"));
        expect(parsedContents).toEqual(expect.arrayContaining([
            expect.objectContaining({
                content: "\\left( \\sum_{k=1}^{n} a_k \\right)^2 = \\sum_{k=1}^{n} \\frac{(a_2 + a_1) a_k^2 - 2a_1 a_k^2}{a_2 - a_1} \\quad \\cdots (*)",
                contentType: content_enums_1.ContentType.MARKDOWN,
                properties: [
                    content_enums_1.ContentProperties.HAS_TEX,
                    content_enums_1.ContentProperties.HAS_NEWLINE,
                ],
            }),
            expect.objectContaining({
                content: "\\begin{aligned}",
                contentType: content_enums_1.ContentType.MARKDOWN,
                properties: [
                    content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK,
                    content_enums_1.ContentProperties.HAS_NEWLINE,
                ],
            }),
            expect.objectContaining({
                content: "\\end{aligned}",
                contentType: content_enums_1.ContentType.MARKDOWN,
                properties: [
                    content_enums_1.ContentProperties.HAS_ENDING_BLOCK,
                    content_enums_1.ContentProperties.HAS_NEWLINE,
                ],
            }),
        ]));
    });
});
//# sourceMappingURL=content-parser.spec.js.map