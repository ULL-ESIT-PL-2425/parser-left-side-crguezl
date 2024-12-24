import { parse } from "../../lib";

function getParser(code) {
  return () => parse(code, { sourceType: "module" });
}

describe("left side function assignment", function () {
  it("should parse", function() {
    let ast = parse("foo(5) = 10");
    expect(ast.program.type).toEqual("Program");
  })
});
