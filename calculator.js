function sum(a, b) {
    return a + b;
}

function minus(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(a,operator,b) {
    switch(operator) {
        case '+':
           return sum(a,b);
        case '-':
            return minus(a,b);
        case '÷':
            if (b === 0) {
                return "Nice try."
            } else {
                return divide(a,b);
            }
        case 'x':
            return multiply(a,b);
    }
};

function displayNow(string) {
    display.textContent = string;
    displayValue = string;
}


let firstNumber = 0;
let operator = undefined;
let secondNumber = 0;

const numberBtns = document.querySelectorAll('.number');
const display = document.querySelector('.display');
const operatorBtns = document.querySelectorAll('.operator');
let displayValue = display.textContent;

for (let i = 0; i < operatorBtns.length; i++) {
    operatorBtns[i].addEventListener('click', function(event) {
        if(firstNumber === 0 && operator === undefined) {
            firstNumber = Number(displayValue);
            operator = event.target.textContent;
            console.log(firstNumber);
            displayValue = '';
        } else if (operator === undefined) {
            operator = event.target.textContent;
        } else {
            secondNumber = Number(displayValue);
            console.log(secondNumber);
            let ans = operate(firstNumber, operator, secondNumber);
            displayNow(`${ans}`);
            firstNumber = ans;
            secondNumber = 0;
            displayValue = '';
            if (event.target.textContent === '=') {
                operator = undefined;
            } else {
                operator = event.target.textContent;
            }
            console.log(ans);
        }
    });
};

for (let i = 0; i < numberBtns.length; i++) {
    numberBtns[i].addEventListener('click', function() {
        displayValue += numberBtns[i].textContent;
        display.textContent = displayValue;
    });
};

const clear = document.querySelector('.clear');
clear.addEventListener('click', function clearScreen() {
    displayNow('');
    displayValue = '';
    firstNumber = 0;
    secondNumber = 0;
    operator = undefined;
});