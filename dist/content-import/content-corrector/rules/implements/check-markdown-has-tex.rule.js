"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckMarkdownHasTeX = void 0;
const content_enums_1 = require("../../../parsed-content-types/enum/content-enums");
const rule_abstract_1 = require("../rule.abstract");
class CheckMarkdownHasTeX extends rule_abstract_1.CorrectionRule {
    constructor() {
        super(...arguments);
        this.ruleName = CheckMarkdownHasTeX.name;
    }
    _onApply(content) {
        const result = content.map((content) => {
            if (content.getContentType() === content_enums_1.ContentType.MARKDOWN &&
                content.getProperties().includes(content_enums_1.ContentProperties.HAS_TEX)) {
                return content.createOverridedContent(content_enums_1.ContentType.LATEX_INLINE);
            }
            else
                return content;
        });
        return result;
    }
}
exports.CheckMarkdownHasTeX = CheckMarkdownHasTeX;
//# sourceMappingURL=check-markdown-has-tex.rule.js.map