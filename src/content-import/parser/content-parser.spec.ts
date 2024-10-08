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
    expect(parsedContent.content).toBe(content);
  });

  it("should parse content with LaTeX", () => {
    const originalContent = `x^2`;
    const inputContent = inlineDelimiter + originalContent + inlineDelimiter;
    const parsedContent = parser.parse(inputContent)[0];
    expect(parsedContent).toBeInstanceOf(LaTeXInlineContent);
    expect(parsedContent.content).toBe(originalContent);
  });

  it("should parse content with LaTeX block", () => {
    const originalContent = `x^2`;
    const inputContent = blockDelimiter + originalContent + blockDelimiter;
    const parsedContent = parser.parse(inputContent)[0];
    expect(parsedContent).toBeInstanceOf(LaTeXBlockContent);
    expect(parsedContent.content).toBe(originalContent);
  });
});
