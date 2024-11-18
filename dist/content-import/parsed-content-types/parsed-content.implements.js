"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownContent = exports.LaTeXBlockContent = exports.LaTeXInlineContent = void 0;
const content_enums_1 = require("./enum/content-enums");
const parsed_content_abstract_1 = require("./parsed-content.abstract");
class LaTeXInlineContent extends parsed_content_abstract_1.ParsedContent {
    constructor() {
        super(...arguments);
        this.contentType = content_enums_1.ContentType.LATEX_INLINE;
    }
    _onGetWrappedContent() {
        const content = super.getContent();
        const lastHashIndex = content.lastIndexOf("#");
        if (lastHashIndex !== -1) {
            return `$${content.slice(lastHashIndex + 1).trim()}$`;
        }
        return `$${content.trim()}$`;
    }
}
exports.LaTeXInlineContent = LaTeXInlineContent;
class LaTeXBlockContent extends parsed_content_abstract_1.ParsedContent {
    constructor() {
        super(...arguments);
        this.contentType = content_enums_1.ContentType.LATEX_BLOCK;
    }
    _onGetWrappedContent() {
        const headding = this.getProperties().includes(content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK)
            ? "$$"
            : "";
        const tail = this.getProperties().includes(content_enums_1.ContentProperties.HAS_ENDING_BLOCK)
            ? "$$"
            : "";
        return `${headding}${super.getContent()}${tail}`;
    }
}
exports.LaTeXBlockContent = LaTeXBlockContent;
class MarkdownContent extends parsed_content_abstract_1.ParsedContent {
    constructor() {
        super(...arguments);
        this.contentType = content_enums_1.ContentType["MARKDOWN"];
    }
    _onGetWrappedContent() {
        return super.getContent();
    }
}
exports.MarkdownContent = MarkdownContent;
//# sourceMappingURL=parsed-content.implements.js.map