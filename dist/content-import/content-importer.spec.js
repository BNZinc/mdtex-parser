"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const content_importer_1 = require("./content-importer");
describe("create-testcases-result-files", () => {
    const testcases = [];
    const testonly = [];
    beforeAll(() => {
        const testCasesDir = path_1.default.resolve(__dirname, "./test-cases");
        const files = fs_1.default.readdirSync(testCasesDir);
        files.forEach((file, index) => {
            if (file.startsWith("res_")) {
                return;
            }
            if (testonly.length > 0 && !testonly.includes(file)) {
                return;
            }
            const content = fs_1.default.readFileSync(path_1.default.join(testCasesDir, file), "utf-8");
            testcases.push({ filename: file, content, index });
        });
        console.log(`${testcases.length} testcases loaded\n`, files.map((file, idx) => `${idx}:${file}`).join("\n"));
    });
    it("should work", () => {
        const resetColor = "\x1b[0m";
        testcases.forEach((testcase) => {
            const asiscolor = "\x1b[33m";
            const tobecolor = "\x1b[32m";
            const result = (0, content_importer_1.getCorrectedContents)(testcase.content);
            console.log(`${asiscolor}${testcase.filename}(${testcase.index}): AS-IS\n${testcase}\n\n${tobecolor}${testcase.filename}(${testcase.index} TO-BE\n${result}${resetColor}`);
            fs_1.default.writeFileSync(path_1.default.join(__dirname, `./test-cases/res_${testcase.filename}`), result, "utf-8");
        });
    });
});
//# sourceMappingURL=content-importer.spec.js.map