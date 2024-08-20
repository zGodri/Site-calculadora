const display = document.getElementById('display');
let currentValue = '0';
let firstValue = null;
let operator = null;
let awaitingSecondValue = false;

function inputNumber(num) {
  if (awaitingSecondValue) {
    currentValue = num;
    awaitingSecondValue = false;
  } else {
    currentValue = currentValue === '0' ? num : currentValue + num;
  }
  display.textContent = currentValue;
}

function inputOperator(op) {
  if (operator && awaitingSecondValue) {
    operator = op;
    return;
  }

  if (firstValue === null) {
    firstValue = parseFloat(currentValue);
  } else if (operator) {
    const result = calculate(firstValue, parseFloat(currentValue), operator);
    currentValue = String(result);
    display.textContent = currentValue;
    firstValue = result;
  }

  operator = op;
  awaitingSecondValue = true;
}

function calculate(first, second, operator) {
  if (operator === '+') return first + second;
  if (operator === '−') return first - second;
  if (operator === '×') return first * second;
  if (operator === '÷') return first / second;
  return second;
}

function resetCalculator() {
  currentValue = '0';
  firstValue = null;
  operator = null;
  awaitingSecondValue = false;
  display.textContent = currentValue;
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('operator')) {
      inputOperator(button.textContent);
    } else if (button.classList.contains('equals')) {
      inputOperator(operator);
    } else if (button.classList.contains('clear')) {
      resetCalculator();
    } else {
      inputNumber(button.textContent);
    }
  });
});
