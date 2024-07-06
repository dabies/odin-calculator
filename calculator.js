//functions for the basic calculator operations
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

//function to call simple functions depending on different buttons pressed
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

//function to change display whenever necessary
function displayNow(string) {
    display.textContent = string;
    displayValue = string;
}

//defining variables for different parts of an operation
let firstNumber = 0;
let operator = undefined;
let secondNumber = 0;

const numberBtns = document.querySelectorAll('.number');
const display = document.querySelector('.display');
const operatorBtns = document.querySelectorAll('.operator');
let displayValue = display.textContent;

//iterate through function and assign a click event listener to each button
for (let i = 0; i < operatorBtns.length; i++) {
    operatorBtns[i].addEventListener('click', function(event) {
        //if first number is zero and operator is undefined, this is the first numbers being typed in
        if(firstNumber === 0 && operator === undefined) {
            firstNumber = Number(displayValue);
            operator = event.target.textContent;
            displayValue = '';
// if operator was undefined, that means the last operator was equal, so a new one must be assigned
        } else if (operator === undefined) {
            operator = event.target.textContent;
//this prevents operate function from being ran if operator is double-clicked, or user changes mind on what--
// --operation they should be doing
        } else if (displayValue === '') {
            operator = event.target.textContent;
        } else {
//this assigns the second part of the operation to the display value and evaluates the function
            secondNumber = Number(displayValue);
            let ans = operate(firstNumber, operator, secondNumber);
//this is how i handled rounding answers, 0 decimals for integers, 2 for those with longer decimals
            if(Number.isInteger(ans)) {
                displayNow(`${(ans).toFixed(0)}`);
            } else {
                if (typeof(ans) === 'string') {
                    displayNow(ans);
                } else {
                    displayNow(`${(ans).toFixed(2)}`);
                }
            }
//this resets the variables for the next round of calculator use
            firstNumber = ans;
            secondNumber = 0;
            displayValue = '';
//this handles equal as an operator, or passing on operator for next function
            if (event.target.textContent === '=') {
                operator = undefined;
            } else {
                operator = event.target.textContent;
            }
        }
    });
};

//click listener to update screen display when numbers are pressed
for (let i = 0; i < numberBtns.length; i++) {
    numberBtns[i].addEventListener('click', function() {
        displayValue += numberBtns[i].textContent;
        displayNow(displayValue);
    });
};

//function and listener for clear button. wipes all variables and screen display
const clear = document.querySelector('.clear');
clear.addEventListener('click', function clearScreen() {
    displayNow('');
    displayValue = '';
    firstNumber = 0;
    secondNumber = 0;
    operator = undefined;
});

/*click listener for undo button. takes display value, converts to an array, and then removes last item.
then rejoins the array as a string, and displays this new string */
const undo = document.querySelector('.backspace');
undo.addEventListener('click', () => {
    let alphaNumeric = '.0123456789';
    let arr = displayValue.split('');
    const cleanedArr = arr.filter((char) => alphaNumeric.includes(char));
    cleanedArr.pop();
    let newDisplay = cleanedArr.join('');
    displayValue = newDisplay;
    displayNow(displayValue);
});

//click listener for decimal button. if decimal is already in display, it remains unchanged. if not, it adds it
const decimal = document.querySelector('.period');
decimal.addEventListener('click', () => {
    if (displayValue.includes('.')) {
        displayValue = displayValue;
    } else {
        displayValue += decimal.textContent;
        displayNow(displayValue);
    }
});

/*fun extra credit for me. this is a listener for the operator buttons that changes their color when pressed,
which improves the user experience making it easier for them to use the calculator. it works by wiping the color
of all buttons when one is pressed, and then changing the color of that button, unless it is the equal button*/
const activeBtns = document.querySelectorAll('.active');
for (let i = 0; i < operatorBtns.length; i++) {
    operatorBtns[i].addEventListener('click', function(event) {
        let clicked = event.target;
        if (clicked.textContent === '=') {
            for (let i = 0; i < operatorBtns.length; i++) {
                operatorBtns[i].style.backgroundColor = 'orangered';
            };
        } else {
            for (let i = 0; i < activeBtns.length; i++) {
                    activeBtns[i].style.backgroundColor = 'orangered';
                };
            clicked.style.backgroundColor = 'darksalmon';
        };
    });
};