> [!CAUTION]
> This repo is a toy/conceptual  experiment to have a minimal monorepo having the parser and the plugin(s).


## Goal

To be able to have a minimal monorepo with the parser and the plugin(s) of the TFGs.

We have to use a Babel configured for flow to transpile the TFG babel parser at `packages/babel-parser` and leave 
a JS parser at `packages/babel-parser/lib`  ready to be used.



## A Few Tricks to Make it Work

- In `packages/babel-plugin-left-side/`, I  substituted the `import` in Pablo's version of the plugin by a `require`:

   ```js
      //import template from "@babel/template";
      const template = require("@babel/template").default;
  ```
- The packages/babel-parser is substituted by the generated from the Pablo's branch (lib). Awful!. 
  - **Work to do: how to make the build using flow to transpile the TFG babel parser at `packages/babel-parser` and leave a JS parser at `packages/babel-parser/lib`  ready to be used.**
- The code in the plugin `packages/babel-plugin-left-side/src/plugin.js` has been modified to use 
  `const parser = require("../../babel-parser/lib");`
- The final user installs the (now separated) package `babel-plugin-left-side-support` and uses it in his/her project. See [examples/package.json](examples/package.json).
- The babel.config.js in this example is relative to the root of the project but the final will use the package:

  ```js
  ➜  babel-left-side-crguezl git:(main) cat examples/babel.config.json 
  {
    "plugins": [
      "../packages/babel-plugin-left-side/"
    ]
  }
  ```

## Compiling 

First, copy Pablo's generated parser `lib/index.js` to the `packages/babel-parser/lib`. Assuming you are in the `examples` directory and have a file hierarchy like mine:

``` 
➜  examples git:(main) ✗ pwd -P   
/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/examples
➜  examples git:(main) ✗ cp ../../pablo-santana-gonzalez/babel-tanhauhau-pablo/packages/babel-parser/lib/index.js ../packages/babel-parser/lib 
```

The compile the example. The plugin will override the parser for the babel transpiler:

```js 
➜  examples git:(main) ✗ npx babel hello.js 
(node:30127) ExperimentalWarning: Support for loading ES Module in require() is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
const {
  assign,
  functionObject
} = require("@ull-esit-pl/babel-plugin-left-side-support");
const foo = functionObject(function (bar) {
  return bar * 2;
});
assign(foo, [10], 5);
console.log(foo(10)); //  5
console.log(foo(5)); // 10
```

Now run it:

```
➜  examples git:(main) ✗ npx babel  hello.js | node 
(node:41665) ExperimentalWarning: Support for loading ES Module in require() is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
5
```

We have previously installed the support for the plugin:

```
➜  examples git:(main) ✗ jq '.dependencies' package.json 
{
  "@ull-esit-pl/babel-plugin-left-side-support": "^1.0.0"
}
```

## Parser

The parser works since uses the `lib/index.js` :

```js
➜  examples git:(main) ✗ ../packages/babel-parser/bin/babel-parser.js hello.js 
{
  "type": "File",
  "start": 0,
  "end": 112,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 7,
      "column": 27
    }
  },
  "errors": [],
  "program": {
    "type": "Program",
    "start": 0,
    "end": 112,
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 7,
        "column": 27
      }
    },
    "sourceType": "script",
    "interpreter": null,
    "body": [
      {
        "type": "FunctionDeclaration",
        "start": 0,
        "end": 42,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 1
          }
        },
        "id": {
          "type": "Identifier",
          "start": 12,
          "end": 15,
          "loc": {
            "start": {
              "line": 1,
              "column": 12
            },
            "end": {
              "line": 1,
              "column": 15
            },
            "identifierName": "foo"
          },
          "name": "foo"
        },
        "generator": false,
        "async": false,
        "assignable": true,
        "params": [
          {
            "type": "Identifier",
            "start": 16,
            "end": 19,
            "loc": {
              "start": {
                "line": 1,
                "column": 16
              },
              "end": {
                "line": 1,
                "column": 19
              },
              "identifierName": "bar"
            },
            "name": "bar"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 21,
          "end": 42,
          "loc": {
            "start": {
              "line": 1,
              "column": 21
            },
            "end": {
              "line": 3,
              "column": 1
            }
          },
          "body": [
            {
              "type": "ReturnStatement",
              "start": 25,
              "end": 40,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 2
                },
                "end": {
                  "line": 2,
                  "column": 17
                }
              },
              "argument": {
                "type": "BinaryExpression",
                "start": 32,
                "end": 39,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 9
                  },
                  "end": {
                    "line": 2,
                    "column": 16
                  }
                },
                "left": {
                  "type": "Identifier",
                  "start": 32,
                  "end": 35,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 9
                    },
                    "end": {
                      "line": 2,
                      "column": 12
                    },
                    "identifierName": "bar"
                  },
                  "name": "bar"
                },
                "operator": "*",
                "right": {
                  "type": "NumericLiteral",
                  "start": 38,
                  "end": 39,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 15
                    },
                    "end": {
                      "line": 2,
                      "column": 16
                    }
                  },
                  "extra": {
                    "rawValue": 2,
                    "raw": "2"
                  },
                  "value": 2
                }
              }
            }
          ],
          "directives": []
        }
      },
      {
        "type": "ExpressionStatement",
        "start": 43,
        "end": 55,
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 12
          }
        },
        "expression": {
          "type": "AssignmentExpression",
          "start": 43,
          "end": 54,
          "loc": {
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 11
            }
          },
          "operator": "=",
          "left": {
            "type": "CallExpression",
            "start": 43,
            "end": 50,
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 7
              }
            },
            "callee": {
              "type": "Identifier",
              "start": 43,
              "end": 46,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 0
                },
                "end": {
                  "line": 4,
                  "column": 3
                },
                "identifierName": "foo"
              },
              "name": "foo"
            },
            "arguments": [
              {
                "type": "NumericLiteral",
                "start": 47,
                "end": 49,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 4
                  },
                  "end": {
                    "line": 4,
                    "column": 6
                  }
                },
                "extra": {
                  "rawValue": 10,
                  "raw": "10"
                },
                "value": 10
              }
            ]
          },
          "right": {
            "type": "NumericLiteral",
            "start": 53,
            "end": 54,
            "loc": {
              "start": {
                "line": 4,
                "column": 10
              },
              "end": {
                "line": 4,
                "column": 11
              }
            },
            "extra": {
              "rawValue": 5,
              "raw": "5"
            },
            "value": 5
          }
        }
      },
      {
        "type": "ExpressionStatement",
        "start": 57,
        "end": 78,
        "loc": {
          "start": {
            "line": 6,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 21
          }
        },
        "expression": {
          "type": "CallExpression",
          "start": 57,
          "end": 77,
          "loc": {
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 20
            }
          },
          "callee": {
            "type": "MemberExpression",
            "start": 57,
            "end": 68,
            "loc": {
              "start": {
                "line": 6,
                "column": 0
              },
              "end": {
                "line": 6,
                "column": 11
              }
            },
            "object": {
              "type": "Identifier",
              "start": 57,
              "end": 64,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 0
                },
                "end": {
                  "line": 6,
                  "column": 7
                },
                "identifierName": "console"
              },
              "name": "console"
            },
            "property": {
              "type": "Identifier",
              "start": 65,
              "end": 68,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 8
                },
                "end": {
                  "line": 6,
                  "column": 11
                },
                "identifierName": "log"
              },
              "name": "log"
            },
            "computed": false
          },
          "arguments": [
            {
              "type": "CallExpression",
              "start": 69,
              "end": 76,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 12
                },
                "end": {
                  "line": 6,
                  "column": 19
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 69,
                "end": 72,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 12
                  },
                  "end": {
                    "line": 6,
                    "column": 15
                  },
                  "identifierName": "foo"
                },
                "name": "foo"
              },
              "arguments": [
                {
                  "type": "NumericLiteral",
                  "start": 73,
                  "end": 75,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 16
                    },
                    "end": {
                      "line": 6,
                      "column": 18
                    }
                  },
                  "extra": {
                    "rawValue": 10,
                    "raw": "10"
                  },
                  "value": 10
                }
              ]
            }
          ]
        },
        "trailingComments": [
          {
            "type": "CommentLine",
            "value": "  5",
            "start": 79,
            "end": 84,
            "loc": {
              "start": {
                "line": 6,
                "column": 22
              },
              "end": {
                "line": 6,
                "column": 27
              }
            }
          }
        ]
      },
      {
        "type": "ExpressionStatement",
        "start": 85,
        "end": 105,
        "loc": {
          "start": {
            "line": 7,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 20
          }
        },
        "expression": {
          "type": "CallExpression",
          "start": 85,
          "end": 104,
          "loc": {
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 19
            }
          },
          "callee": {
            "type": "MemberExpression",
            "start": 85,
            "end": 96,
            "loc": {
              "start": {
                "line": 7,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 11
              }
            },
            "object": {
              "type": "Identifier",
              "start": 85,
              "end": 92,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 0
                },
                "end": {
                  "line": 7,
                  "column": 7
                },
                "identifierName": "console"
              },
              "name": "console"
            },
            "property": {
              "type": "Identifier",
              "start": 93,
              "end": 96,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 8
                },
                "end": {
                  "line": 7,
                  "column": 11
                },
                "identifierName": "log"
              },
              "name": "log"
            },
            "computed": false
          },
          "arguments": [
            {
              "type": "CallExpression",
              "start": 97,
              "end": 103,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 12
                },
                "end": {
                  "line": 7,
                  "column": 18
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 97,
                "end": 100,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 12
                  },
                  "end": {
                    "line": 7,
                    "column": 15
                  },
                  "identifierName": "foo"
                },
                "name": "foo"
              },
              "arguments": [
                {
                  "type": "NumericLiteral",
                  "start": 101,
                  "end": 102,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 16
                    },
                    "end": {
                      "line": 7,
                      "column": 17
                    }
                  },
                  "extra": {
                    "rawValue": 5,
                    "raw": "5"
                  },
                  "value": 5
                }
              ]
            }
          ]
        },
        "leadingComments": [
          {
            "type": "CommentLine",
            "value": "  5",
            "start": 79,
            "end": 84,
            "loc": {
              "start": {
                "line": 6,
                "column": 22
              },
              "end": {
                "line": 6,
                "column": 27
              }
            }
          }
        ],
        "trailingComments": [
          {
            "type": "CommentLine",
            "value": " 10",
            "start": 107,
            "end": 112,
            "loc": {
              "start": {
                "line": 7,
                "column": 22
              },
              "end": {
                "line": 7,
                "column": 27
              }
            }
          }
        ]
      }
    ],
    "directives": []
  },
  "comments": [
    {
      "type": "CommentLine",
      "value": "  5",
      "start": 79,
      "end": 84,
      "loc": {
        "start": {
          "line": 6,
          "column": 22
        },
        "end": {
          "line": 6,
          "column": 27
        }
      }
    },
    {
      "type": "CommentLine",
      "value": " 10",
      "start": 107,
      "end": 112,
      "loc": {
        "start": {
          "line": 7,
          "column": 22
        },
        "end": {
          "line": 7,
          "column": 27
        }
      }
    }
  ]
}
```

```
 ../../node_modules/.bin/babel src -d lib
```