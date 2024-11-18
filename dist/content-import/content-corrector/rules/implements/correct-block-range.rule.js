"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrectBlockRange = void 0;
const content_enums_1 = require("../../../parsed-content-types/enum/content-enums");
const rule_abstract_1 = require("../rule.abstract");
class CorrectBlockRange extends rule_abstract_1.CorrectionRule {
    constructor() {
        super(...arguments);
        this.ruleName = CorrectBlockRange.name;
        this.editedIndexes = new Set();
    }
    _onApply(content) {
        const ranges = [];
        const stack = [];
        content.forEach((content, currentIndex) => {
            const currentProperties = content.getProperties();
            if (currentProperties.includes(content_enums_1.ContentProperties.HAS_BEGINNING_BLOCK)) {
                stack.push(currentIndex);
            }
            if (currentProperties.includes(content_enums_1.ContentProperties.HAS_ENDING_BLOCK)) {
                const startIndex = stack.pop();
                if (startIndex !== undefined) {
                    ranges.push({ start: startIndex, end: currentIndex });
                }
            }
        });
        const result = ranges
            .reduce((acc, { start, end }) => {
            return this.overrideContentToBlock(acc, start, end);
        }, content)
            .map((content, index) => {
            const contentProps = content.getProperties();
            if (!this.editedIndexes.has(index) &&
                content.getContentType() === content_enums_1.ContentType.LATEX_BLOCK) {
                if (contentProps.includes(content_enums_1.ContentProperties.HAS_BLOCK_ONLY_CONTENT) ===
                    false) {
                    if (contentProps.includes(content_enums_1.ContentProperties.HAS_TEX)) {
                        return content.createOverridedContent(content_enums_1.ContentType.LATEX_INLINE);
                    }
                    else {
                        return content.createOverridedContent(content_enums_1.ContentType.MARKDOWN);
                    }
                }
            }
            return content;
        });
        return result;
    }
    overrideContentToBlock(content, startingIndex, endingIndex) {
        const correctingContents = [];
        content.forEach((content, currentIndex) => {
            if (currentIndex >= startingIndex && currentIndex <= endingIndex) {
                correctingContents.push(content.createOverridedContent(content_enums_1.ContentType.LATEX_BLOCK));
                this.editedIndexes.add(currentIndex);
            }
            else {
                correctingContents.push(content);
            }
        });
        return correctingContents;
    }
}
exports.CorrectBlockRange = CorrectBlockRange;
//# sourceMappingURL=correct-block-range.rule.js.map