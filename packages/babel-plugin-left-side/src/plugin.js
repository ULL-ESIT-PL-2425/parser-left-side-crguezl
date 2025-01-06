const parser = require("../../babel-parser/lib");
const types = require("@babel/types");
const template = require("@babel/template").default;
let { inspect } = require("util");
ins = (x) => inspect(x, { depth: null });

// Assuming that the left side of an assignment is a CallExpression, check if the callee is an assignable function:
// f(z) = 4 compile time error? Done
// f(x)(y) = 5;  run time error if f(x) is not assignable?
// a[x](y) = 5;  run time if a[x] is not asignable?
// obj[x][y](z) = 5;  run time error if obj[x][y] is not an assignable function?
function checkIsAssignableFunction(path, left) {
  let bindings = path.scope.bindings;
  let callee = left.callee;
  if (callee.type == 'Identifier') {
    let name = callee.name;
    if (bindings[name].path.node?.declarations?.[0]?.init?.callee?.name !== 'functionObject') {
      throw new Error(`TypeError: Illegal assignment to "${name}" at line ${callee.loc.start.line} column ${callee.loc.start.column}. Variable "${name}" is not an assignable function.`);
    };
  }
}

// To avoid repeating code in FunctionDeclaration and FunctionExpression. Transforms the assignable function syntax to valid JS.
// Returns a CallExpression node with the functionObject call.
function changeAssignableFunctionToValid(node) {
  node.assignable = false;
  const functionObjectId = types.identifier("functionObject");
  const funId = node.id;
  //node.id = null; // Casiano Why? Is not better to keep the Id?
  // Replace the FunctionDeclaration with FunctionExpression.
  const funAsExpr = types.functionExpression(
    node.id,
    node.params,
    node.body,
  );
  const callExpression = types.callExpression(functionObjectId, [funAsExpr]);
  return [funId, callExpression];
}

const SUPPORT_TEMPLATE = template(
  'const {assign, functionObject} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");',
)();

const assignTemplate = template('assign(CALLEE, ARGS, RVALUE);');

module.exports = function leftSidePlugin(babel) {
  return {
    parserOverride(code, opts) {
      return parser.parse(code, opts);
    },
    visitor: {
      AssignmentExpression(path) {
        const node = path.node;
        const left = node.left;
        if (node.operator == "=" && node.left.type == "CallExpression") {
          checkIsAssignableFunction(path, left);

          let CALLEE = left.callee;
          let RVALUE = node.right;
          let ARGS = types.arrayExpression(left.arguments);
          let ast = assignTemplate({ CALLEE, ARGS, RVALUE });
          let nestedCalls = [ assignTemplate({ CALLEE, ARGS, RVALUE }).expression ];

          while (CALLEE.type == "CallExpression") {
            ARGS = types.arrayExpression(CALLEE.arguments);
            CALLEE = RVALUE = CALLEE.callee;
            nestedCalls.unshift(assignTemplate({ CALLEE, ARGS, RVALUE }).expression);
          }
          if (nestedCalls.length == 1) {
            path.replaceWith(nestedCalls[0]);
          } else { 
            path.replaceWith(types.sequenceExpression(nestedCalls));
          }
        }
      },
      FunctionDeclaration(path) {
        const node = path.node;
        if (node.assignable) {
          const [funId, callExpression] = changeAssignableFunctionToValid(node);
          const varDeclarator = types.variableDeclarator(funId, callExpression);
          path.replaceWith(types.variableDeclaration("const", [varDeclarator]));
        }
      },
      FunctionExpression(path) {
        const node = path.node;
        if (node.assignable) {
          const [_, callExpression] = changeAssignableFunctionToValid(node);
          path.replaceWith(callExpression);
        }
      },
      Program(path) {
        const node = path.node;
        // Perhaps checking when it's actually needed? Write on exit if an assignable function was created.
        node.body.unshift(SUPPORT_TEMPLATE);
      },
    },
  };
};
