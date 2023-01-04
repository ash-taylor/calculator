const operators = ['+', '-', 'x', '÷']

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = array => array.length ? array.reduce((total, item) => total * item) : 0; 
const divide = (a, b) => a / b;

const upperScreen = document.querySelector('.top-screen');
const lowerScreen = document.querySelector('.lower-screen');

let x = 0;
let y;
let result;
let operator = "";
let lowerValue = "0";
let upperValue = "";
let calcStatus = false;
let decStatus = false;

const numbers = document.querySelectorAll('.number-button');
numbers.forEach((number) => {
  number.addEventListener('click', () => {
    if (number.id === "." && decStatus) return;
    if (number.id === ".") decStatus = true;
    if (number.id === "delete") {
      lowerScreen.innerHTML = lowerScreen.innerHTML.slice(0, -1);
      lowerValue = lowerScreen.innerHTML;
    }
    else {
      lowerValue === "0" ? lowerValue = number.id : lowerValue += number.id;
      lowerScreen.innerHTML = lowerValue;
    }
  })
})

const opButtons = document.querySelectorAll('.op-button');
opButtons.forEach((opButton) => {
  opButton.addEventListener('click', () => {
    if (opButton.id === "clear") clear();
    // if (!lowerValue) return;
    else if (!calcStatus) {
      if (opButton.id === "=") return;
      x = parseFloat(lowerValue);
      if (isNaN(x)) return;
      operator = opButton.id;
      upperValue = `${x} ${operator}`;
      upperScreen.innerHTML = upperValue;
      lowerValue = "0";
      calcStatus = true;
      decStatus = false;
    }
    else if (calcStatus && operators.includes(opButton.id) && operator !== "=") {
      y = parseFloat(lowerValue);
      if (isNaN(y)) return;
      x = operate(x, operator, y);
      operator = opButton.id;
      upperScreen.innerHTML = `${x} ${operator}`;
      lowerScreen.innerHTML = `${x}`;
      lowerValue = "0";
      decStatus = false;
    }
    else if (opButton.id === "=") {
      y = parseFloat(lowerValue);
      if (isNaN(y)) return;
      upperScreen.innerHTML = `${x} ${operator} ${y} ${opButton.id}`;
      result = operate(x, operator, y);
      lowerScreen.innerHTML = `${result}`;
      lowerValue = result;
      calcStatus = false;
      decStatus = false;
    }
  })
})

function operate(x, op, y) {
  if (operators.includes(op)) {
    opStatus = true;
    switch(op) {
      case '+':
        return add(x, y);
      case '-':
        return subtract(x, y);
      case 'x':
        values = [x, y];
        return multiply(values);
      case '÷':
        if (x === 0 && y === 0) {
          alert("You cannot divide 0 by 0!");
          return 0;
        }
        return divide(x, y);
    }
  }
  else {
    return;
  }
}

function clear() {
  x = 0;
  y = undefined;
  operator = "";
  result = undefined;
  calcStatus = false;
  decStatus = false;
  lowerValue = "0";
  upperValue = "";
  lowerScreen.innerHTML = "0";
  upperScreen.innerHTML = "";
}