import tokenize from "./compiler/lexer.js";
import parser from "./compiler/parser.js";
import transformer from "./compiler/transformer.js";
import codeGenerator from "./compiler/generator.js";

let inputCode = document.getElementById("input-code");
const outputCodeElement = document.getElementById("output-code");


function handle(f) {
  try {
    return [f(), null];
  } catch (error) {
    return [null, error.message];
  }
}
function compiler(input) {
  const [tokens, error] = handle(() => tokenize(input));

  if (error) {
    return error
  }

  const ast = parser(tokens);

  const newAst = transformer(ast);

  const OUTPUT = codeGenerator(newAst);

  return OUTPUT;
}

inputCode.addEventListener("focusout", () => {
  const outputCode = document.createTextNode(compiler(inputCode.value));
  outputCodeElement.innerHTML = "";
  outputCodeElement.appendChild(outputCode);
});
