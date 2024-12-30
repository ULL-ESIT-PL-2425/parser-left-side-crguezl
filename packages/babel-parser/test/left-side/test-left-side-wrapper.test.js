const { execSync, exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const input = fs.readdirSync(path.join(__dirname, "in"), { encoding: "utf-8" });
const execOut = new Set(fs.readdirSync(path.join(__dirname, "exec_out"), { encoding: "utf-8" }));
let configFile = path.join(__dirname, "babel.config.js");
const ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/ug;

for (let testFile of input) {
  describe("left-side", () => {
    test("left side function assignment " + testFile, () => {
      let fullPath = path.join(__dirname, "in", testFile);
      //console.log(`Processing input program "${testFile}"`);

      expect(execOut.has(testFile)).toBeTruthy(); // Check that the output file exists in the exec_out folder

      // Compile with the left-side babel parser
      let output = error = null;
      let outputPath = path.join(__dirname, "out", testFile);
      try {
        output = execSync(`npx babel --config-file ${configFile} ${fullPath}`).toString().replace(ansiRegex, "").trim();
      } catch (e) {
        output = e.message.toString().replace(ansiRegex, "").trim();
        //console.log(`Error compiling the program ${testFile}!!!!!!`);
        error = true;
      }
      fs.writeFileSync(outputPath, output, { encoding: "utf-8" }); // Save the output program in out/

      // Execute the compiled program if no error occurred
      let execResult = null;
      if (error) {
        execResult = output;
      }
      else try {
        execResult = execSync(`node ${outputPath}`).toString().replace(ansiRegex, "").replace(/\s+/g, " ").trim();
      } catch (e) {
        execResult = e.message.toString().replace(ansiRegex, "").replace(/\s+/g, " ").trim();
      }

      // Compare the output of the execution with the expected output of the execution
      const execPath = path.join(__dirname, "exec_out", testFile);
      const expectedResult = fs.readFileSync(execPath, { encoding: "utf-8" }).toString().replace(ansiRegex, "").replace(/\s+/g, " ").trim();

      /*
      console.log(
        `\nexecResult is "${execResult}" type=${typeof execResult} length=${execResult.length}\n` +
        `expectedResult is "${expectedResult}" length=${expectedResult.length} type=${typeof execResult}\n` +
        `${expectedResult === execResult ? "They are equal" : "They are different"}`);
      */

      if (error) {
        expect(execResult.includes("SyntaxError")).toBeTruthy();
        return;
      }

      expect(execResult).toEqual(expectedResult);
    })
  })
}