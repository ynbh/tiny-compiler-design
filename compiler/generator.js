export default function codeGenerator(node) {
    switch (node.type) {
      case "Program":
        return node.body.map(codeGenerator).join("\n");
      case "ExpressionStatement":
        return codeGenerator(node.expression);
      case "CallExpression":
        return (
          `[apply ${codeGenerator(node.callee)} ${node.arguments
            .map(codeGenerator)
            .join(" ")}]`
        );
      case "Identifier":
        return node.value;
      case "NumberLiteral":
        return node.value;
      case "StringLiteral":
        return `"${node.value}"`;
      case "BooleanLiteral":
        return node.value === "false" ? false : true;
      default:
        throw new TypeError(node.type);
    }
  }
  