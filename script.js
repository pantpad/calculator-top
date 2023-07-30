//create the visual representation of the calculator
//make the numbers clicked appear on the calculator
//when operator is clicked 
    //save what is inside the display -> firstNumber || CALCULATE firstNumber + operator + secondNumber and save it inside the firstNumber
    //save the operator clicked
//make the numbers clicked appear on the calculator
//another operator is clicked
    //equality operator with firstNumber and secondNumber != null? -> calculate firstNumber + operator + secondNumber;
console.log('hi, welcome to the w11 - calculator console!');

const   DECIMAL_PRECISION = 2;
const   calculatorBox = document.querySelector('.calculator-box');
const   display = document.querySelector('.display');
const   displayContent = document.querySelector('.display-content');
let     previousValue   = null;
let     currentOperator = null;
let     isOperationInPlace = false;

/*--            COMPUTATIONAL LOGIC         --*/
function add(firstNumber,secondNumber){
    return parseFloat(firstNumber) + parseFloat(secondNumber);
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
            return add(firstNumber,secondNumber);
            break;
        case '-':
            return subtract(firstNumber,secondNumber);
            break;
        case '*':
            multiply(firstNumber,secondNumber);
            break;
        case '/':
            if(secondNumber == 0){

                updateDisplay("Cannot Divide By Zero");
            }
            else
                divide(firstNumber,secondNumber);
            break;
    }
}

/*--            BUTTONS LOGIC           --*/
//apply eventListener to all buttons inside the buttons-container
const buttons = document.querySelectorAll('.buttons-container div');
buttons.forEach(button => button.addEventListener(('click'),(e)=> {
    //apply logic for each numbered button
    if(/^\d$/.test(e.target.textContent)){
        displayValue = e.target.textContent;
        updateDisplay(displayValue);
        if(isOperationInPlace){ !isOperationInPlace;}
    }
    //apply logic for cancel button
    if(e.target.textContent == "C"){
        clearDisplay();
    }

    //apply logic for operation buttons
    if(e.target.classList.contains('operation')){
        isOperationInPlace = true;
        if(previousValue==null){
            previousValue = displayContent.textContent;
        }else{
            previousValue = operate(currentOperator,previousValue,displayContent.textContent);
            updateDisplay(previousValue);
        }
        currentOperator = e.target.textContent;
        console.log(previousValue);
        console.log(currentOperator);
    }
}));


function isDisplayOverflown(element){
    return element.clientWidth > element.parentElement.clientWidth;
}

function reduceDisplayText(){
    displayContent.style.fontSize = parseFloat(window.getComputedStyle(displayContent).fontSize) - 5 + "px";
}

function updateDisplay(value){
    if(displayContent.textContent.length > 16 && !isNaN(display.textContent)){
        console.log('Numero troppo grande');
        return;
    }

    if(displayContent.textContent == "0" || isNaN(displayContent.textContent.trim())){
        displayContent.textContent = value;
    }else{
        if(isOperationInPlace){
            displayContent.textContent = value;
        }else
            displayContent.textContent += value;
    }

    if(isDisplayOverflown(displayContent)){
        reduceDisplayText();
    }

}

function clearDisplay(){
    //value of firstNumber = 0;
    //value of operation = '';
    //value of ???
    //addEventListeners removed
    displayContent.textContent = 0;
}

displayContent.textContent = 0;
