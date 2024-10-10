import { ContentCorrector } from "./content-corrector";

describe("content-corrector", () => {
  let contentCorrector: ContentCorrector;

  beforeEach(() => {
    contentCorrector = new ContentCorrector([]);
  });
  it("should be created", () => {
    expect(true).toBeTruthy();
  });

  it("should be able to create a new instance", () => {
    const result = contentCorrector.correct();
    expect(result).toBeTruthy();
  });
});
