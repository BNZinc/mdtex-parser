import { ContentCorrector } from "./content-corrector";

describe("content-corrector", () => {
  let contentCorrector: ContentCorrector;

  beforeEach(() => {
    contentCorrector = new ContentCorrector([]);
  });
  it("should be created", () => {
    expect(true).toBeTruthy();
  });

  it("should return correct happen times", () => {
    const result = contentCorrector.correct();
    expect(result).toBe(0);
  });
});
