import {
  ContentProperties,
  ContentPropertyPayload,
  ContentType,
} from "../types/enum/content-enums";
import { IParsedContent } from "../types/parsed-content.interface";
export type CorrectingContentMap = {
  contentType: ContentType;
  properties: ContentProperties[];
  propertyPayload: ContentPropertyPayload;
};

export class ContentCorrector {
  typeMap: CorrectingContentMap[] = [];
  constructor(private readonly contents: IParsedContent[]) {
    contents.forEach((content) => {
      this.typeMap.push({
        contentType: content.getContentType(),
        properties: content.getProperties(),
        propertyPayload: content.getPayload(),
      });
    });
  }
  correct() {
    this.typeMap.forEach((element) => {
      console.log(JSON.stringify(element));
    });
    return this.typeMap.length;
  }
}
