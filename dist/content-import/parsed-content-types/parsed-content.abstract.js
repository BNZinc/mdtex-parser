"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedContent = void 0;
exports.getEnumKeyByValue = getEnumKeyByValue;
const latex_keywords_json_1 = __importDefault(require("../resource/latex-keywords.json"));
const content_enums_1 = require("./enum/content-enums");
const parsed_content_factory_1 = require("./parsed-content.factory");
function getEnumKeyByValue(enumObj, value) {
    return Object.keys(enumObj).find((key) => enumObj[key] === value);
}
class ParsedContent {
    constructor(params, override) {
        var _a, _b;
        this.properyPayload = {};
        this.properties = [];
        this.content = params.content;
        this.overridingContent = override;
        if (this.content) {
            const keywords = latex_keywords_json_1.default.latex_keywords;
            if (keywords.some((keyword) => this.content.includes(keyword))) {
                this.addProperty(content_enums_1.ContentProperties.HAS_TEX);
            }
            if (this.content.includes("\\begin")) {
                const beginType = (_a = this.content.match(/\\begin{(\w+)}/)) === null || _a === void 0 ? void 0 : _a[1];
                if (beginType) {
                    this.properyPayload[content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK] =
                        beginType;
                }
                this.addProperty(content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK);
            }
            if (this.content.includes("\\end")) {
                const endType = (_b = this.content.match(/\\end{(\w+)}/)) === null || _b === void 0 ? void 0 : _b[1];
                if (endType) {
                    this.properyPayload[content_enums_1.ContentProperties.HAS_ENDING_BLOCK] = endType;
                }
                this.addProperty(content_enums_1.ContentProperties.HAS_ENDING_BLOCK);
            }
        }
    }
    addProperty(property, payload) {
        this.properties.push(property);
        if (payload) {
            this.properyPayload[property] = payload;
        }
    }
    getProperties() {
        return this.properties;
    }
    getPayload() {
        return this.properyPayload;
    }
    hasAnyPayload() {
        return this.properties.length > 0 || this.getContentLength() > 0;
    }
    getContentLength() {
        return this.content.length;
    }
    getContent() {
        return this.content;
    }
    getContentType() {
        return this.contentType;
    }
    getWrappedContent() {
        return this._onGetWrappedContent();
    }
    createOverridedContent(contentType) {
        if (this.contentType === contentType) {
            return this;
        }
        return (0, parsed_content_factory_1.createParsedContent)({
            contentType,
            content: this.content,
            properties: this.properties,
            propertyPayload: this.properyPayload,
            overridingContent: this,
        });
    }
}
exports.ParsedContent = ParsedContent;
//# sourceMappingURL=parsed-content.abstract.js.map