const parser = require("../../babel-parser/lib");
const types = require("@babel/types");
//import template from "@babel/template";
const template = require("@babel/template").default;
let { inspect } = require("util");
ins = (x) => inspect(x, {depth: null});

const SUPPORT_TEMPLATE = template(
  'const {assign, functionObject} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");',
)();

// To avoid repeating code in FunctionDeclaration and FunctionExpression. Transforms the assignable function syntax to valid JS.
// Returns a CallExpression node with the functionObject call.
function changeAssignableFunctionToValid(node) {
  node.assignable = false;
  const identifier = types.identifier("functionObject");
  const funId = node.id;
  node.id = null;
  // Replace the FunctionDeclaration with FunctionExpression.
  const funAsExpr = types.functionExpression(
    null,
    node.params,
    node.body,
  );
  const callExpression = types.callExpression(identifier, [funAsExpr]);
  return [funId, callExpression];
}

module.exports = function leftSidePlugin(babel) {
  return {
    parserOverride(code, opts) {
      return parser.parse(code, opts);
    },
    visitor: {
      AssignmentExpression(path) {
        const node = path.node;
        if (node.operator == "=" && node.left.type == "CallExpression") {

          const callee = node.left.callee;

          if (callee.type  == 'Identifier') {
            let name = callee.name;
            // How to deal whith nested assignments? f(2)(3) = 5; Casiano
            if (path.scope.bindings[name].path.node?.declarations?.[0]?.init?.callee?.name !== 'functionObject') {
              throw new Error(`TypeError: Illegal assignment to "${name}" at line ${inspect(callee.loc.start.line)}. Variable "${name}" is not an assignable function.`);
            };     
          }

          const args = node.left.arguments;
          const rvalue = node.right;
          const argsArray = types.arrayExpression(args);
          const assignArgs = [callee, argsArray, rvalue];
          const functionAssign = babel.types.identifier("assign");
          path.replaceWith(
            babel.types.callExpression(functionAssign, assignArgs),
          );
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
