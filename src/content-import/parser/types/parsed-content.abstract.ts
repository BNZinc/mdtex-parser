import latexKeywords from "../resource/latex-keywords.json";
export function getEnumKeyByValue(
  enumObj: any,
  value: any
): string | undefined {
  return Object.keys(enumObj).find((key) => enumObj[key] === value);
}
export enum ContentType {
  "LATEX_INLINE",
  "LATEX_BLOCK",
  "MARKDOWN",
}

export enum ContentProperties {
  "HAS_NEWLINE",
  "HAS_TEX",
  "HAS_BEGINNING_BLOCK",
  "HAS_ENDING_BLOCK",
}

export abstract class ParsedContent {
  constructor(params: { content: string }) {
    this.content = params.content;
    if (this.content) {
      const keywords = latexKeywords.latex_keywords;
      if (keywords.some((keyword: string) => this.content.includes(keyword))) {
        this.addProperty(ContentProperties.HAS_TEX);
      }
      if (this.content.includes("\\begin")) {
        const beginType = this.content.match(/\\begin{(\w+)}/)?.[1];
        if (beginType) {
          this.properyPayload[ContentProperties.HAS_BEGINNING_BLOCK] =
            beginType;
        }
        this.addProperty(ContentProperties.HAS_BEGINNING_BLOCK);
      }
      if (this.content.includes("\\end")) {
        const endType = this.content.match(/\\end{(\w+)}/)?.[1];
        if (endType) {
          this.properyPayload[ContentProperties.HAS_ENDING_BLOCK] = endType;
        }
        this.addProperty(ContentProperties.HAS_ENDING_BLOCK);
      }
    }
  }
  protected properyPayload: { [key in ContentProperties]: string } = {
    [ContentProperties["HAS_NEWLINE"]]: "",
    [ContentProperties["HAS_TEX"]]: "",
    [ContentProperties["HAS_BEGINNING_BLOCK"]]: "",
    [ContentProperties["HAS_ENDING_BLOCK"]]: "",
  };
  protected properties: ContentProperties[] = [];
  protected content: string;
  abstract contentType: ContentType;

  addProperty(property: ContentProperties) {
    this.properties.push(property);
  }
  getProperties(): ContentProperties[] {
    return this.properties;
  }

  hasAnyPayload(): boolean {
    return this.properties.length > 0 || this.getContentLength() > 0;
  }

  getContentLength(): number {
    return this.content.length;
  }
  getContent(): string {
    return this.content;
  }
}
