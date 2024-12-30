parseFunctionParams {
  "type": "",
  "start": 93,
  "end": 0,
  "loc": {
    "start": {
      "line": 2,
      "column": 0
    }
  },
  "id": {
    "type": "Identifier",
    "start": 105,
    "end": 108,
    "loc": {
      "start": {
        "line": 2,
        "column": 12
      },
      "end": {
        "line": 2,
        "column": 15
      },
      "identifierName": "foo"
    },
    "name": "foo",
    "leadingComments": [
      {
        "type": "CommentLine",
        "value": " May be in the future this will be a synonim of foo(a)(b) but by now let us throw an error",
        "start": 0,
        "end": 92,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 92
          }
        }
      }
    ]
  },
  "generator": false,
  "async": false,
  "assignable": true,
  "params": [
    {
      "type": "Identifier",
      "start": 109,
      "end": 110,
      "loc": {
        "start": {
          "line": 2,
          "column": 16
        },
        "end": {
          "line": 2,
          "column": 17
        },
        "identifierName": "a"
      },
      "name": "a"
    },
    {
      "type": "Identifier",
      "start": 112,
      "end": 113,
      "loc": {
        "start": {
          "line": 2,
          "column": 19
        },
        "end": {
          "line": 2,
          "column": 20
        },
        "identifierName": "b"
      },
      "name": "b"
    }
  ]
}
SyntaxError: /Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/examples/syntaxerror-many-parameters.js: Assignable functions are restricted to one parameter (2:0)

[0m [90m 1 |[39m [90m// May be in the future this will be a synonim of foo(a)(b) but by now let us throw an error[39m
[31m[1m>[22m[39m[90m 2 |[39m [36mfunction[39m [33m@[39m[33m@[39m foo(a[33m,[39m b) {
 [90m   |[39m [31m[1m^[22m[39m
 [90m 3 |[39m   [36mreturn[39m a[33m+[39mb[33m;[39m
 [90m 4 |[39m }
 [90m 5 |[39m foo(a[33m,[39m b) [33m=[39m [35m5[39m[33m;[39m[0m
    at Parser._raise (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:705:17)
    at Parser.raiseWithData (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:699:17)
    at Parser.raise (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:694:17)
    at Parser.parseFunction (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:9777:12)
    at Parser.parseFunctionStatement (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:9476:17)
    at Parser.parseStatementContent (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:9234:21)
    at Parser.parseStatement (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:9205:17)
    at Parser.parseBlockOrModuleBlockBody (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:9662:25)
    at Parser.parseBlockBody (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:9651:10)
    at Parser.parseTopLevel (/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-parser/lib/index.js:9149:10) {
  loc: Position { line: 2, column: 0 },
  pos: 93,
  code: 'BABEL_PARSE_ERROR'
}
