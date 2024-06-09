// script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let displayValue = '0';
let pendingValue = null;
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    if (operation && pendingValue !== null) {
        display.textContent = `${pendingValue} ${operation} ${displayValue}`;
    } else {
        display.textContent = displayValue;
    }
}

function handleNumber(value) {
    if (shouldResetDisplay) {
        displayValue = value;
        shouldResetDisplay = false;
    } else {
        if (displayValue === '0') {
            displayValue = value;
        } else {
            displayValue += value;
        }
    }
    updateDisplay();
}

function handleOperator(value) {
    if (pendingValue === null) {
        pendingValue = displayValue;
    } else if (operation) {
        pendingValue = operate(pendingValue, displayValue, operation);
        displayValue = pendingValue;
        updateDisplay();
    }
    displayValue = '0';
    operation = value;
    shouldResetDisplay = true;
    updateDisplay();
}

function operate(x, y, op) {
    x = parseFloat(x);
    y = parseFloat(y);
    if (op === '+') return (x + y).toString();
    if (op === '-') return (x - y).toString();
    if (op === '*') return (x * y).toString();
    if (op === '/') return (x / y).toString();
    if (op === '%') return (x % y).toString();  // Added modulus operation
    return y;
}

function handleEquals() {
    if (operation && pendingValue !== null) {
        displayValue = operate(pendingValue, displayValue, operation);
        pendingValue = null;
        operation = null;
        updateDisplay();
        shouldResetDisplay = true;
    }
}

function handleClear() {
    displayValue = '0';
    pendingValue = null;
    operation = null;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.id === 'equals') {
            handleEquals();
        } else if (button.id === 'clear') {
            handleClear();
        } else {
            handleNumber(value);
        }
    });
});

updateDisplay();
