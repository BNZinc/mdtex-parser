import { IParsedContent } from "../parsed-content-types/parsed-content.interface";
import { ContentCorrector } from "./content-corrector";

describe("content-corrector", () => {
  let contentCorrector: ContentCorrector;
  let fakeContent: IParsedContent;

  beforeEach(() => {
    contentCorrector = new ContentCorrector([]);
    fakeContent = {
      addProperty: jest.fn(),
      getProperties: jest.fn().mockReturnValue([]),
      getPayload: jest.fn().mockReturnValue({}),
      hasAnyPayload: jest.fn().mockReturnValue(false),
      getContentLength: jest.fn().mockReturnValue(0),
      getContent: jest.fn().mockReturnValue(""),
      getContentType: jest.fn().mockReturnValue(""),
      getWrappedContent: jest.fn().mockReturnValue(""),
      createOverridedContent: jest.fn().mockReturnValue({} as IParsedContent),
    };
  });
  it("should be created", () => {
    expect(true).toBeTruthy();
  });

  it("should return correct happen times", () => {
    const result = contentCorrector.correct([fakeContent]);
    expect(result).toEqual([fakeContent]);
  });
});
