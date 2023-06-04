const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`Welcome! Enter a calculation, and I'll give you the answer.`);

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Goodbye!');
    process.exit(0);
  }

  const operands = input.trim().split(' ');
  const operator = operands[1];
  const num1 = parseFloat(operands[0]);
  const num2 = parseFloat(operands[2]);


    let result;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
      case 'x':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
    }
    console.log('= ' + result);
  }
);