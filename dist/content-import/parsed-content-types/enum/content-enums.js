"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentProperties = exports.ContentType = void 0;
var ContentType;
(function (ContentType) {
    ContentType[ContentType["LATEX_INLINE"] = 0] = "LATEX_INLINE";
    ContentType[ContentType["LATEX_BLOCK"] = 1] = "LATEX_BLOCK";
    ContentType[ContentType["MARKDOWN"] = 2] = "MARKDOWN";
})(ContentType || (exports.ContentType = ContentType = {}));
var ContentProperties;
(function (ContentProperties) {
    ContentProperties[ContentProperties["HAS_NEWLINE"] = 0] = "HAS_NEWLINE";
    ContentProperties[ContentProperties["HAS_TEX"] = 1] = "HAS_TEX";
    ContentProperties[ContentProperties["HAS_BEGINNING_BLOCK"] = 2] = "HAS_BEGINNING_BLOCK";
    ContentProperties[ContentProperties["HAS_ENDING_BLOCK"] = 3] = "HAS_ENDING_BLOCK";
    ContentProperties[ContentProperties["HAS_BLOCK_ONLY_CONTENT"] = 4] = "HAS_BLOCK_ONLY_CONTENT";
})(ContentProperties || (exports.ContentProperties = ContentProperties = {}));
//# sourceMappingURL=content-enums.js.map