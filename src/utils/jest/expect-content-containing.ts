import {
  ContentProperties,
  ContentType,
} from "../../content-import/parsed-content-types/enum/content-enums";

export const expectContent = (
  result: any[],
  contentType: ContentType,
  content: string,
  properties: ContentProperties[],
  propertyPayload: any = {}
) => {
  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        contentType,
        content,
        properties,
        propertyPayload,
      }),
    ])
  );
};
