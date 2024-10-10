import {
  ContentProperties,
  ContentPropertyPayload,
  ContentType,
} from "./enum/content-enums";
import { ParsedContent } from "./parsed-content.abstract";
import {
  LaTeXBlockContent,
  LaTeXInlineContent,
  MarkdownContent,
} from "./parsed-content.implements";
import { IParsedContent } from "./parsed-content.interface";

const typeMap = {
  [ContentType.LATEX_INLINE]: LaTeXInlineContent,
  [ContentType.LATEX_BLOCK]: LaTeXBlockContent,
  [ContentType.MARKDOWN]: MarkdownContent,
};

export function createParsedContent(params: {
  contentType: ContentType;
  content: string;
  properties?: ContentProperties[];
  propertyPayload?: ContentPropertyPayload;
  overridingContent?: ParsedContent;
}): IParsedContent {
  const {
    contentType,
    content,
    properties,
    propertyPayload,
    overridingContent,
  } = params;
  const ParsedContent = typeMap[contentType];
  if (!ParsedContent) {
    throw new Error(`Unknown content type: ${contentType}`);
  }
  const parsedContent: IParsedContent = new ParsedContent(
    { content },
    overridingContent
  );
  (properties ?? []).forEach((property) =>
    parsedContent.addProperty(
      property,
      propertyPayload !== undefined ? propertyPayload[property] : undefined
    )
  );
  return parsedContent;
}
