const operators = ['add', 'subtract', 'multiply', 'divide']

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = array => array.length ? array.reduce((total, item) => total * item) : 0; // Adds ternary to test for empty array - if no array, returns 0
const divide = (a, b) => a / b;

let opFlag = false;
let lowerValue = "";
let operator = "";
let x = 0;
let y = 0;
let result = 0;

const topScreen = document.querySelector('.top-screen');
const lowerScreen = document.querySelector('.lower-screen');
const numbers = document.querySelectorAll('.number-button');
numbers.forEach((number) => {
  number.addEventListener('click', () => {
    lowerValue += number.id;
    lowerScreen.innerHTML = lowerValue;
  })
})

const opButtons = document.querySelectorAll('.op-button');
opButtons.forEach((opButton) => {
  opButton.addEventListener('click', () => {
    if (!opFlag) {
      topScreen.innerHTML = lowerValue + " " + opButton.innerHTML;
      operator = opButton.id;
      console.log(operator);
      opFlag = true;
      x = parseFloat(lowerValue);
      lowerValue = "";
    }
    else {
      y = parseFloat(lowerValue);
      result = operate(x, operator, y);
      console.log(result);
      lowerScreen.innerHTML = result;
    }
  })
})

function operate(x, op, y) {
  if (operators.includes(op)) {
    switch(op) {
      case 'add':
        return add(x, y);
      case 'subtract':
        return subtract(x, y);
      case 'multiply':
        values = [x, y];
        return multiply(values);
      case 'divide':
        return divide(x, y);
    }
  }
  else {
    return;
  }
}