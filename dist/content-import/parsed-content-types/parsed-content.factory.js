"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParsedContent = createParsedContent;
const content_enums_1 = require("./enum/content-enums");
const parsed_content_implements_1 = require("./parsed-content.implements");
const typeMap = {
    [content_enums_1.ContentType.LATEX_INLINE]: parsed_content_implements_1.LaTeXInlineContent,
    [content_enums_1.ContentType.LATEX_BLOCK]: parsed_content_implements_1.LaTeXBlockContent,
    [content_enums_1.ContentType.MARKDOWN]: parsed_content_implements_1.MarkdownContent,
};
function createParsedContent(params) {
    const { contentType, content, properties, propertyPayload, overridingContent, } = params;
    const ParsedContent = typeMap[contentType];
    if (!ParsedContent) {
        throw new Error(`Unknown content type: ${contentType}`);
    }
    const parsedContent = new ParsedContent({ content }, overridingContent);
    (properties !== null && properties !== void 0 ? properties : []).forEach((property) => parsedContent.addProperty(property, propertyPayload !== undefined ? propertyPayload[property] : undefined));
    return parsedContent;
}
//# sourceMappingURL=parsed-content.factory.js.map