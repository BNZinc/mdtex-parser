import { IParsedContent } from "../../../parsed-content-types/parsed-content.interface";
import { CorrectionRule, ICorrectionRule } from "../rule.abstract";
export declare class CheckMarkdownHasTeX extends CorrectionRule implements ICorrectionRule {
    protected ruleName: string;
    protected _onApply(content: IParsedContent[]): IParsedContent[];
}
