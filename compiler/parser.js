

const { log } = console;

/**
 *
 * Every function _must_ have a ! before it.
 * Else, it wont be counted as an expression.
 */
export default function parser(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === "number") {
      current++;

      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    if (token.type === "string") {
      current++;

      return {
        type: "StringLiteral",
        value: token.value,
      };
    }

    if (token.type === "boolean") {
      current++;

      return {
        type: "BooleanLiteral",
        value: token.value,
      };
    }

    if (token.type === "call" && token.value === "!") {
      token = tokens[++current];
      let node = {
        type: "CallExpression",
        name: token.value, // add(2,2)
        params: [],
      };
      token = tokens[++current]; // (
      if (token.type === "paren" && token.value === "(") {
        token = tokens[++current];

        while (
          token.type !== "paren" ||
          (token.type === "paren" && token.value !== ")")
        ) {
          node.params.push(walk());
          token = tokens[current];
        }
      }

      current++;

      return node;
    }
    log(tokens[current - 1], tokens[current], tokens.length);
    throw new TypeError(token.type + " " + token.value + " at " + current);
  }

  let ast = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}
