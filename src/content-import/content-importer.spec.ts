import fs from "fs";
import path from "path";
import { getCorrectedContents } from "./content-importer";

describe("create-testcases-result-files", () => {
  const testcases: { filename: string; content: string; index: number }[] = [];
  const testonly: string[] = ["1111111111-answer.txt"]; //["2024-10-09_14_38-answer.txt"];
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
        `${asiscolor}${testcase.filename}(${testcase.index}): AS-IS\n${testcase}\n\n${tobecolor}${testcase.filename}(${testcase.index} TO-BE\n${result}${resetColor}`
      );
      fs.writeFileSync(
        path.join(__dirname, `./test-cases/res_${testcase.filename}.txt`),
        result,
        "utf-8"
      );
    });
  });
});
