import {
  ContentProperties,
  ContentPropertyPayload,
  ContentType,
} from "./enum/content-enums";

export interface IParsedContent {
  addProperty(property: ContentProperties): void;
  getProperties(): ContentProperties[];
  getPayload(): ContentPropertyPayload;
  hasAnyPayload(): boolean;
  getContentLength(): number;
  getContent(): string;
  getContentType(): ContentType;
  createOverridedContent(contentType: ContentType): IParsedContent;
}
