const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const input = fs.readdirSync(path.join(__dirname, "in"), {encoding:"utf-8"});
const execOut = new Set(fs.readdirSync(path.join(__dirname, "exec_out"), {encoding:"utf-8"}));

for (let testFile of input) {
  test(testFile, () => {
    expect(execOut.has(testFile)).toBeTruthy();
    const output = execSync(`npx babel ./in/${testFile}`);
    const outputPath = path.join(__dirname, "out", testFile);
    fs.writeFileSync(outputPath, output, {encoding: "utf-8"});
    let execResult = execSync(`node ${outputPath}`);
    expect(execResult).toBe(fs.readFileSync(`./exec_out/${testFile}`, {encoding: "utf-8"}));
  })
}