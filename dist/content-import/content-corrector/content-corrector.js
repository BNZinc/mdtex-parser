"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContentCorrector = exports.ContentCorrector = void 0;
const check_markdown_has_tex_rule_1 = require("./rules/implements/check-markdown-has-tex.rule");
const correct_block_range_rule_1 = require("./rules/implements/correct-block-range.rule");
class ContentCorrector {
    constructor(rules) {
        this.rules = rules;
    }
    correct(contents) {
        return this.rules.reduce((acc, rule) => {
            return rule.apply(acc);
        }, contents);
    }
}
exports.ContentCorrector = ContentCorrector;
const createContentCorrector = () => {
    return new ContentCorrector([
        new correct_block_range_rule_1.CorrectBlockRange(),
        new check_markdown_has_tex_rule_1.CheckMarkdownHasTeX(),
    ]);
};
exports.createContentCorrector = createContentCorrector;
//# sourceMappingURL=content-corrector.js.map