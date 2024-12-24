const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const input = fs.readdirSync(path.join(__dirname, "in"), {encoding:"utf-8"});
const execOut = new Set(fs.readdirSync(path.join(__dirname, "exec_out"), {encoding:"utf-8"}));
let configFile = path.join(__dirname, "babel.config.js");
const ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/ug;

for (let testFile of input) {
  test(testFile, () => {
    let fullPath = path.join(__dirname, "in", testFile);
    console.log(`Processing input program "${fullPath}"`);

    expect(execOut.has(testFile)).toBeTruthy(); // Check that the output file exists in the exec_out folder

    // Compile with the left-side babel parser
    const output = execSync(`npx babel --config-file ${configFile} ${fullPath}`).toString();
    const outputPath = path.join(__dirname, "out", testFile); 
    fs.writeFileSync(outputPath, output, {encoding: "utf-8"}); // Save the output program in out/

    // Execute the compiled program
    let execResult = execSync(`node ${outputPath}`).toString().replace(ansiRegex,"").replace(/\s+/uig,"");
  
    // Compare the output with the expected output
    const execPath = path.join(__dirname, "exec_out", testFile); 
    const expectedResult = fs.readFileSync(execPath, {encoding: "utf-8"}).toString().replace(/\s+/uig,"");
    console.log(`\nexecResult is "${execResult}" ${typeof execResult} length=${execResult.length}
expectedResult is "${expectedResult}" length=${expectedResult.length} ${typeof execResult} 
${expectedResult[0] === execResult[0] ? "First characters are equal" : "First characters are different"}`);
    expect(execResult).toEqual(expectedResult);
  })
}