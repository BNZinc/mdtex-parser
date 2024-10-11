import latexKeywords from "../resource/latex-keywords.json";
import {
  ContentProperties,
  ContentPropertyPayload,
  ContentType,
} from "./enum/content-enums";
import { createParsedContent } from "./parsed-content.factory";
import { IParsedContent } from "./parsed-content.interface";
export function getEnumKeyByValue(
  enumObj: any,
  value: any
): string | undefined {
  return Object.keys(enumObj).find((key) => enumObj[key] === value);
}

export abstract class ParsedContent implements IParsedContent {
  overridingContent?: ParsedContent;
  protected properyPayload: ContentPropertyPayload = {};
  protected properties: ContentProperties[] = [];
  protected content: string;
  protected abstract contentType: ContentType;
  constructor(params: { content: string }, override?: ParsedContent) {
    this.content = params.content;
    this.overridingContent = override;
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

  addProperty(property: ContentProperties, payload?: string): void {
    this.properties.push(property);
    if (payload) {
      this.properyPayload[property] = payload;
    }
  }
  getProperties(): ContentProperties[] {
    return this.properties;
  }
  getPayload(): ContentPropertyPayload {
    return this.properyPayload;
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
  getContentType(): ContentType {
    return this.contentType;
  }
  getWrappedContent(): string {
    return this._onGetWrappedContent();
  }
  protected abstract _onGetWrappedContent(): string;
  createOverridedContent(contentType: ContentType): IParsedContent {
    if (this.contentType === contentType) {
      return this;
    }

    return createParsedContent({
      contentType,
      content: this.content,
      properties: this.properties,
      propertyPayload: this.properyPayload,
      overridingContent: this,
    });
  }
}
