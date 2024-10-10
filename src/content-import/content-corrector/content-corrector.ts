import {
  ContentProperties,
  ContentPropertyPayload,
  ContentType,
  ParsedContent,
} from "../types/parsed-content.abstract";

export class ContentCorrector {
  typeMap: {
    contentType: ContentType;
    properties: ContentProperties[];
    propertyPayload: ContentPropertyPayload;
  }[] = [];
  constructor(private readonly contents: ParsedContent[]) {
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
