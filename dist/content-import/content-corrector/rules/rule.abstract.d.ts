import { IParsedContent } from "../../parsed-content-types/parsed-content.interface";
export declare abstract class CorrectionRule implements ICorrectionRule {
    protected abstract ruleName: string;
    constructor();
    protected abstract _onApply(content: IParsedContent[]): IParsedContent[];
    apply(content: IParsedContent[]): IParsedContent[];
}
export interface ICorrectionRule {
    apply(content: IParsedContent[]): IParsedContent[];
}
