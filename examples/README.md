## Tricks 

- In `packages/babel-plugin-left-side/`, I  substituted the `import` in Pablo's version of the plugin by a `require`:

   ```js
      //import template from "@babel/template";
      const template = require("@babel/template").default;
  ```
- The packages/babel-parser is substituted by the generated from the Pablo's branch (lib). Awful.
- The final user installs the support package from the github registry `@ull-esit-pl/babel-plugin-left-side-support`

## Compiling 


```js 
➜  examples git:(main) ✗ npx babel  hello.js       
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

```
➜  examples git:(main) ✗ npx babel  hello.js | node                       
5
10
```

## Parser

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