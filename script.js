console.log('ready');
const DECIMAL_PRECISION = 2;
//create the visual representation of the calculator
//make the numbers clicked appear on the calculator
//when operator is clicked 
    //save what is inside the display -> firstNumber || CALCULATE firstNumber + operator + secondNumber and save it inside the firstNumber
    //save the operator clicked
//make the numbers clicked appear on the calculator
//another operator is clicked
    //equality operator with firstNumber and secondNumber != null? -> calculate firstNumber + operator + secondNumber;
    
const calculatorBox = document.querySelector('.calculator-box');
const display = document.querySelector('.display');
const displayContent = document.querySelector('.display-content');

function isDisplayOverflown(element){
    return element.clientWidth > element.parentElement.clientWidth;
}

function reduceDisplayText(){
    displayContent.style.fontSize = parseFloat(window.getComputedStyle(displayContent).fontSize) - 10 + "px";
}

function add(firstNumber,secondNumber){
    return firstNumber + secondNumber;
}

function subtract(firstNumber,secondNumber){
    return firstNumber - secondNumber;
}
function multiply(firstNumber,secondNumber){
    
    if((firstNumber * secondNumber)%1 !== 0){
        return parseFloat((firstNumber * secondNumber).toFixed(DECIMAL_PRECISION));
    }else{
        return firstNumber * secondNumber;
    }
}
function divide(firstNumber,secondNumber){
    if((firstNumber / secondNumber)%1 !== 0){
        return parseFloat((firstNumber / secondNumber).toFixed(DECIMAL_PRECISION));
    }else{
        return firstNumber / secondNumber;
    }
}
/**
 * takes an operator and DECIMAL_PRECISION numbers and then calls one of the above functions on the numbers.
 */
function operate(operator,firstNumber,secondNumber){
    switch(operator){
        case '+':
            displayContent.textContent = add(firstNumber,secondNumber);
            break;
        case '-':
            displayContent.textContent = subtract(firstNumber,secondNumber);
            break;
        case '*':
            displayContent.textContent = multiply(firstNumber,secondNumber);
            break;
        case '/':
            displayContent.textContent = divide(firstNumber,secondNumber);
            break;
    }
}

displayContent.textContent = "test";
