"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorrectedContents = getCorrectedContents;
const content_corrector_1 = require("./content-corrector/content-corrector");
const content_parser_1 = require("./content-parser/content-parser");
const content_enums_1 = require("./parsed-content-types/enum/content-enums");
class ContentImporter {
    constructor(originalContents, parser, corrector) {
        this.originalContents = originalContents;
        this.parser = parser;
        this.corrector = corrector;
    }
    exportContents() {
        const parsedContents = this.parser.parse(this.originalContents);
        const correctedContents = this.corrector.correct(parsedContents);
        return correctedContents
            .map((content) => {
            if (content.getProperties().includes(content_enums_1.ContentProperties.HAS_NEWLINE)) {
                return content.getWrappedContent() + "\n";
            }
            else
                return content.getWrappedContent();
        })
            .join("");
    }
}
function getCorrectedContents(originalContents) {
    const delimiterOverride = originalContents
        .replace(/\\\[|\\\]/g, "$$")
        .replace(/^(\\\\\(|\\\\\))$/, "$")
        .replace(/\\\(/g, "$")
        .replace(/\\\)/g, "$");
    const result = new ContentImporter(delimiterOverride, new content_parser_1.ContentParser(), (0, content_corrector_1.createContentCorrector)()).exportContents();
    return result;
}
//# sourceMappingURL=content-importer.js.map