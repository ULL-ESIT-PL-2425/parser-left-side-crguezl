Command failed: npx babel --config-file /Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/test/left-side/babel.config.js /Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/test/left-side/in/empty-assignment.js
SyntaxError: /Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/test/left-side/in/empty-assignment.js: Binding invalid left-hand side in "foo" (4:0)

  2 |   return 2;
  3 | }
> 4 | foo() = 5;
    | ^
  5 |
    at Parser._raise (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:704:17)
    at Parser.raiseWithData (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:698:17)
    at Parser.raise (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:693:17)
    at Parser.checkLVal (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:7702:16)
    at Parser.parseMaybeAssign (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:7832:12)
    at Parser.parseExpression (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:7773:23)
    at Parser.parseStatementContent (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:9300:23)
    at Parser.parseStatement (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:9204:17)
    at Parser.parseBlockOrModuleBlockBody (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:9661:25)
    at Parser.parseBlockBody (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:9650:10) {
  loc: Position { line: 4, column: 0 },
  pos: 34,
  code: 'BABEL_PARSE_ERROR'
}