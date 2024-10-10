import { IParsedContent } from "../parsed-content-types/parsed-content.interface";
export class ContentCorrector {
  correctingContent: IParsedContent[] = [];
  constructor(contents: IParsedContent[]) {
    this.correctingContent = contents;
  }
  correct() {}
}
