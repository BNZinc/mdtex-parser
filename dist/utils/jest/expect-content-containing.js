"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectContent = void 0;
const expectContent = (result, contentType, content, properties, propertyPayload = {}) => {
    expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
            contentType,
            content,
            properties,
            propertyPayload,
        }),
    ]));
};
exports.expectContent = expectContent;
//# sourceMappingURL=expect-content-containing.js.map