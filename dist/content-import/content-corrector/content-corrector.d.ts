import { IParsedContent } from "../parsed-content-types/parsed-content.interface";
import { ICorrectionRule } from "./rules/rule.abstract";
export declare class ContentCorrector implements IContentCorrector {
    rules: ICorrectionRule[];
    constructor(rules: ICorrectionRule[]);
    correct(contents: IParsedContent[]): IParsedContent[];
}
export interface IContentCorrector {
    correct(contents: IParsedContent[]): IParsedContent[];
}
export declare const createContentCorrector: () => ContentCorrector;
