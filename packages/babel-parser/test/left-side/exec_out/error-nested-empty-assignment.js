SyntaxError: /Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/examples/nested-empty-assignment.js: Binding invalid left-hand side in  (7:0)

[0m [90m 5 |[39m }
 [90m 6 |[39m
[31m[1m>[22m[39m[90m 7 |[39m foo([35m6[39m)() [33m=[39m [32m"Another value"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m
 [90m 8 |[39m console[33m.[39mlog(foo([35m2[39m)())[33m;[39m
 [90m 9 |[39m console[33m.[39mlog(foo([35m6[39m)())[33m;[39m [0m
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
  loc: Position { line: 7, column: 0 },
  pos: 75,
  code: 'BABEL_PARSE_ERROR'
}
