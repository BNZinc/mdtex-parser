import { ContentParser } from "./content-parser";
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
    const parsedContent = parser.parse(content)[0];
    expect(parsedContent).toBeInstanceOf(MarkdownContent);
    expect(parsedContent.getContent()).toBe(content);
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
});
