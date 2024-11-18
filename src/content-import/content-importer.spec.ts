import fs from "fs";
import path from "path";
import { getCorrectedContents } from "./content-importer";

describe("create-testcases-result-files", () => {
  const testcases: { filename: string; content: string; index: number }[] = [];
  const testonly: string[] = []; //["2024-10-09_14_38-answer.txt"];
  beforeAll(() => {
    const testCasesDir = path.resolve(__dirname, "./test-cases");
    const files = fs.readdirSync(testCasesDir);

    files.forEach((file, index) => {
      if (file.startsWith("res_")) {
        return;
      }
      if (testonly.length > 0 && !testonly.includes(file)) {
        return;
      }
      const content = fs.readFileSync(path.join(testCasesDir, file), "utf-8");
      testcases.push({ filename: file, content, index });
    });

    console.log(
      `${testcases.length} testcases loaded\n`,
      files.map((file, idx) => `${idx}:${file}`).join("\n")
    );
  });

  it("should work", () => {
    const resetColor = "\x1b[0m";

    testcases.forEach((testcase) => {
      const asiscolor = "\x1b[33m"; // Yellow
      const tobecolor = "\x1b[32m";
      const result = getCorrectedContents(testcase.content);
      console.log(
        `${testcase.filename}(${testcase.index}):\n${asiscolor}AS-IS\n\n${testcase.content}(${testcase.index} \n${tobecolor}TO-BE\n${result}${resetColor}`
      );
      fs.writeFileSync(
        path.join(__dirname, `./test-cases/res_${testcase.filename}`),
        result,
        "utf-8"
      );
    });
  });
});


describe("Correctness of the result", () => {
  it("should add space between same type contents", () => {
    const result = getCorrectedContents('가나다라$1+1$\\frac{1}{2}');
    expect(result).toBe('가나다라$1+1$ $\\frac{1}{2}$\n\n');
  });

  it("should not add space between different type contents", () => {
    const result = getCorrectedContents('가나다라$1+1$가나다라\n가나$1+1$');
    expect(result).toBe('가나다라$1+1$가나다라\n가나$1+1$\n\n');
  });

});
