export default function traverser(ast, visitor) {
    function traverseArray(array, parent) {
      array.forEach((child) => {
        traverseNode(child, parent);
      });
    }
  
    function traverseNode(node, parent) {
      let method = visitor[node.type];
  
      if (method && method.enter) {
        method.enter(node, parent);
      }
  
      switch (node.type) {
        case "Program":
          traverseArray(node.body, node);
          break;
        case "CallExpression":
          traverseArray(node.params, node);
          break;
        case "NumberLiteral":
        case "BooleanLiteral":
        case "StringLiteral":
          break;
        default:
          throw new TypeError(node.type);
      }
  
      if (method && method.exit) {
        method.exit(node, parent);
      }
    }
  
    traverseNode(ast, null);
  }
  