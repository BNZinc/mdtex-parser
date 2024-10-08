import { ContentParser } from "./content-parser";
import { ContentType } from "./types/parsed-content.abstract";
import {
  LaTeXBlockContent,
  LaTeXInlineContent,
  MarkdownContent,
} from "./types/parsed-content.implements";

const inlineDelimiter = "$";
const blockDelimiter = "$$";
describe("ContentParser", () => {
  let parser: ContentParser;

  beforeEach(() => {
    parser = new ContentParser();
  });

  it("should be created", () => {
    expect(parser).toBeTruthy();
  });

  it("should parse markdown content", () => {
    const content = `# Title\n\n## Subtitle\n\nSome content.`;
    const parsedContent = parser.parse(content);
    expect(parsedContent).toEqual([]);
  });

  it("should parse content with LaTeX", () => {
    const expectedContent = `x^2`;
    const originalContent = inlineDelimiter + expectedContent + inlineDelimiter;
    const parsedContent = parser.parse(originalContent)[0];
    expect(parsedContent).toBeInstanceOf(LaTeXInlineContent);
    expect(parsedContent.getContent()).toBe(expectedContent);
  });

  it("should parse content with LaTeX block", () => {
    const expectedContent = `x^2`;
    const originalContent = blockDelimiter + expectedContent + blockDelimiter;
    const parsedContent = parser.parse(originalContent)[0];
    expect(parsedContent).toBeInstanceOf(LaTeXBlockContent);
    expect(parsedContent.getContent()).toBe(expectedContent);
  });

  it("should parse content with multiple LaTeX blocks", () => {
    const expectedContent = `x^2`;
    const originalContent = `$$a+b$$ ## It's a title $$${expectedContent}$$`;
    const parsedContents = parser.parse(originalContent);
    expect(parsedContents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content: "a+b",
          contentType: ContentType.LATEX_BLOCK,
        }),
        expect.objectContaining({
          content: " ## It's a title ",
          contentType: ContentType.MARKDOWN,
        }),
        expect.objectContaining({
          content: "x^2",
          contentType: ContentType.LATEX_BLOCK,
        }),
      ])
    );
  });

  it("블록 표현식을 인라인 표현식으로 표현하는 경우 파싱 확인", () => {
    const originalContent = `$f(x)= \\begin{cases} -6\\sqrt{4-x}+12 &(x<3) \\\\ \\frac{1}{6}(x-9)^2 &(x \\ge 3) \\end{cases}$ 에 대하여 $x$ 에 대한 방정식 $|f(x)|=n-1$`;
    const parsedContents = parser.parse(originalContent);
    expect(parsedContents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content:
            "f(x)= \\begin{cases} -6\\sqrt{4-x}+12 &(x<3) \\\\ \\frac{1}{6}(x-9)^2 &(x \\ge 3) \\end{cases}",
          contentType: ContentType.LATEX_INLINE,
        }),
        expect.objectContaining({
          content: " 에 대하여 ",
          contentType: ContentType.MARKDOWN,
        }),
        expect.objectContaining({
          content: "x",
          contentType: ContentType.LATEX_INLINE,
        }),
        expect.objectContaining({
          content: " 에 대한 방정식 ",
          contentType: ContentType.MARKDOWN,
        }),
        expect.objectContaining({
          content: "|f(x)|=n-1",
          contentType: ContentType.LATEX_INLINE,
        }),
      ])
    );
  });

  it("누락된 블록 표현식을 인라인 표현식으로 표현하는 경우 파싱 확인", () => {
    const originalContent =
      "\\begin{case}\n a + 1 & a + 2 \n\\end{case}$$뒷내용$a + 1 $";
    const parsedContents = parser.parse(originalContent);
    expect(parsedContents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content: "\\begin{case}",
          contentType: ContentType.MARKDOWN,
        }),
        expect.objectContaining({
          content: " a + 1 & a + 2 ",
          contentType: ContentType.MARKDOWN,
        }),
        expect.objectContaining({
          content: "\\end{case}",
          contentType: ContentType.MARKDOWN,
        }),
        expect.objectContaining({
          content: "뒷내용",
          contentType: ContentType.LATEX_BLOCK,
        }),
        expect.objectContaining({
          content: "a + 1 ",
          contentType: ContentType.LATEX_INLINE,
        }),
        expect.objectContaining({
          content: "",
          contentType: ContentType.MARKDOWN,
        }),
      ])
    );
    parsedContents.forEach((parsedContent) => {
      console.log(parsedContent);
    });
  });
});
