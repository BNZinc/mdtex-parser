"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_corrector_1 = require("./content-corrector");
describe("content-corrector", () => {
    let contentCorrector;
    let fakeContent;
    beforeEach(() => {
        contentCorrector = new content_corrector_1.ContentCorrector([]);
        fakeContent = {
            addProperty: jest.fn(),
            getProperties: jest.fn().mockReturnValue([]),
            getPayload: jest.fn().mockReturnValue({}),
            hasAnyPayload: jest.fn().mockReturnValue(false),
            getContentLength: jest.fn().mockReturnValue(0),
            getContent: jest.fn().mockReturnValue(""),
            getContentType: jest.fn().mockReturnValue(""),
            getWrappedContent: jest.fn().mockReturnValue(""),
            createOverridedContent: jest.fn().mockReturnValue({}),
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
//# sourceMappingURL=content-corrector.spec.js.map