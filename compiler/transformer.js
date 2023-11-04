import traverser from "./traverser.js";

export default function transformer(ast) {
  let newAst = {
    type: "Program",
    body: [],
  };
  // _context is a reference the old ast to the new Ast
  ast._context = newAst.body;

  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: "NumberLiteral",
          value: node.value,
        });
      },
    },

    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: "StringLiteral",
          value: node.value,
        });
      },
    },

    BooleanLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: "BooleanLiteral",
          value: node.value,
        });
      },
    },

    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            value: node.name,
          },
          arguments: [],
        } ;

        node._context = expression.arguments;

        if (parent.type !== "CallExpression") {
          expression = {
            type: "ExpressionStatement",
            expression,
          };
        }
        parent._context.push(expression);
      },
    },
  });

  return newAst;
}
