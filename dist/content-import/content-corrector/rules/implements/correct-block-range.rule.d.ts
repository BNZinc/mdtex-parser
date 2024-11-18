import { IParsedContent } from "../../../parsed-content-types/parsed-content.interface";
import { CorrectionRule, ICorrectionRule } from "../rule.abstract";
export declare class CorrectBlockRange extends CorrectionRule implements ICorrectionRule {
    protected ruleName: string;
    protected editedIndexes: Set<number>;
    _onApply(content: IParsedContent[]): IParsedContent[];
    private overrideContentToBlock;
}
