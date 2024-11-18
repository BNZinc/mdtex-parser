"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentParser = void 0;
const content_enums_1 = require("../parsed-content-types/enum/content-enums");
const parsed_content_factory_1 = require("../parsed-content-types/parsed-content.factory");
class ContentBuffer {
    constructor(params) {
        var _a, _b;
        this.buffer = "";
        this.mode = (_a = params.defaultMode) !== null && _a !== void 0 ? _a : content_enums_1.ContentType["MARKDOWN"];
        this.defaultMode = (_b = params.defaultMode) !== null && _b !== void 0 ? _b : content_enums_1.ContentType["MARKDOWN"];
    }
    append(content) {
        this.buffer += content;
    }
    isDefaultMode() {
        return this.mode === this.defaultMode;
    }
    flush(properties) {
        const content = this.buffer;
        const mode = this.mode;
        this.buffer = "";
        const result = (0, parsed_content_factory_1.createParsedContent)({
            contentType: mode,
            content: content,
            properties,
        });
        return result;
    }
    toggleMode(mode) {
        if (this.mode === mode) {
            this.mode = this.defaultMode;
        }
        else
            this.mode = mode;
    }
}
class ContentParser {
    constructor(ParserParams = {
        inlineMathDelimiter: "$",
        blockMathDelimiter: "$$",
    }) {
        this.toExportContents = [];
        this.buffer = new ContentBuffer({});
        this.inlineMathDelimiter = ParserParams.inlineMathDelimiter;
        this.blockMathDelimiter = ParserParams.blockMathDelimiter;
    }
    appendResult(parsedContent) {
        if (parsedContent.hasAnyPayload()) {
            this.toExportContents.push(parsedContent);
        }
    }
    parse(fullContents) {
        this.toExportContents = [];
        const lineSplitContents = fullContents.split("\n");
        lineSplitContents.forEach((line) => {
            let charIndex = 0;
            while (charIndex < line.length) {
                if ((charIndex === 0 || line[charIndex - 1] !== "\\") &&
                    line.substring(charIndex, charIndex + 2) === this.blockMathDelimiter) {
                    this.appendResult(this.buffer.flush());
                    this.buffer.toggleMode(content_enums_1.ContentType.LATEX_BLOCK);
                    charIndex += 2;
                }
                else if ((charIndex === 0 || line[charIndex - 1] !== "\\") &&
                    line[charIndex] === this.inlineMathDelimiter) {
                    this.appendResult(this.buffer.flush());
                    this.buffer.toggleMode(content_enums_1.ContentType.LATEX_INLINE);
                    charIndex += 1;
                }
                else {
                    this.buffer.append(line[charIndex]);
                    charIndex += 1;
                }
            }
            if (this.buffer.isDefaultMode()) {
                this.appendResult(this.buffer.flush([content_enums_1.ContentProperties.HAS_NEWLINE]));
            }
        });
        this.appendResult(this.buffer.flush([content_enums_1.ContentProperties.HAS_NEWLINE]));
        return this.toExportContents;
    }
}
exports.ContentParser = ContentParser;
//# sourceMappingURL=content-parser.js.map