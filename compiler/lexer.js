export default function tokenize(input) {
    let current = 0;
    let tokens = [];
  
    while (current < input.length) {
      let char = input[current];
      if (char === "(") {
        tokens.push({
          type: "paren",
          value: "(",
        });
        current++;
        continue;
      }
  
      if (char === "!") {
        tokens.push({
          type: "call",
          value: "!",
        });
        current++;
        continue;
      }
      if (char === ")") {
        tokens.push({
          type: "paren",
          value: ")",
        });
  
        current++;
        continue;
      }
  
      if (char === "{") {
        tokens.push({
          type: "start",
          value: "{",
        });
        current++;
        continue;
      }
  
      if (char === "}") {
        tokens.push({
          type: "end",
          value: "}",
        });
        break;
      }
      let LETTERS = /[a-z]/i;
      if (LETTERS.test(char)) {
        let value = "";
        while (LETTERS.test(char)) {
          value += char;
          char = input[++current];
        }
  
        tokens.push({
          type: value === "true" || value === "false" ? "boolean" : "name",
          value,
        });
  
        continue;
      }
  
      let COMMA = /,/;
      if (COMMA.test(char)) {
        current++;
        continue;
      }
  
      let WHITESPACE = /\s/;
      if (WHITESPACE.test(char)) {
        current++;
        continue;
      }
  
      let NUMBERS = /[0-9]/;
      if (NUMBERS.test(char)) {
        let value = "";
  
        while (NUMBERS.test(char)) {
          value += char;
          char = input[++current];
        }
  
        tokens.push({
          type: "number",
          value,
        });
        continue;
      }
  
      if (char === '"') {
        let value = "";
        // skip current quote
        char = input[++current];
  
        while (char !== '"') {
          value += char;
          char = input[++current];
        }
        // skip double quote
        char = input[++current];
  
        tokens.push({
          type: "string",
          value,
        });
  
        continue;
      }
      console.error(`Invalid character ${char} at ${current}`)
      throw new TypeError(`Invalid character ${char}`);
    }
    return tokens;
  }
  