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
const   lastTwoButtons = {
    prev: '',
    curr: '',
};
let     previousValue       = currentValue      = '';
let     currentOperator     = previousOperator  = undefined;
let     isOperationInPlace  = false;

/*--            COMPUTATIONAL LOGIC         --*/
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


/*--            BUTTONS LOGIC           --*/
//apply eventListener to buttons inside the buttons-container
const buttons = document.querySelectorAll('.buttons-container div');
const numberButtons = document.querySelectorAll('.buttons-container .number');
const operationButtons = document.querySelectorAll('.buttons-container .operation');
const backButton = document.querySelector('.back');
const clearButton = document.querySelector('.clear');
//const clearEButton = document.querySelector('.ce');
const equalButton = document.querySelector('.equality');

buttons.forEach(button => button.addEventListener(('click'),(e) => {
    if(lastTwoButtons.curr == ''){
        lastTwoButtons.curr = e.target.textContent;
    }else{
        lastTwoButtons.prev = lastTwoButtons.curr;
        lastTwoButtons.curr = e.target.textContent;
    }
}));

numberButtons.forEach((button) => button.addEventListener(('click'),(e) => {
    let displayValue = displayContent.textContent;
    let clickedValue = e.target.textContent;
    if(clickedValue === '+/-'){
        //take displayValue and change it from - to +
        console.log('cambiato valore');
        return;
    }

    if(clickedValue == '.' && displayValue.includes('.')){
        return;
    }else{
        if(displayValue == "0" && clickedValue == '.'){
            updateDisplay(displayValue+clickedValue);
        }else{
            updateDisplay(clickedValue);
            if(isOperationInPlace){ isOperationInPlace = !isOperationInPlace;}
        }
    }
    //currentValue = displayContent.textContent;
}));

clearButton.addEventListener(('click'),() => {
    clearVariables();
    clearDisplay();
});

backButton.addEventListener(('click'),() => {
    if(isOperationInPlace)return;

    let displayValue = displayContent.textContent;
    if(displayValue == '0' || displayValue == "Cannot Divide By Zero") return; 
    
    if(displayValue.length == 1){
        clearDisplay();
        return;
    }

    displayContent.textContent = displayValue.slice(0,displayValue.length-1);
    
});

function operationLogic(e){
    let result = 0;
    isOperationInPlace = true;
    //if(currentValue === '') return;
    if(currentValue !== '' && lastTwoButtons.prev != '='){
        result = operate();
    }else{
        previousValue = displayContent.textContent;
    }
    currentOperator = e.target.textContent;
    currentValue = displayContent.textContent;

    if(result == "Cannot Divide By Zero"){
        displayContent.style.fontSize = "2.1rem";
        operationButtons.forEach((button) => button.removeEventListener('click', operationLogic));  
    }

    displayContent.textContent = result; 
    //currentValue = '';
    console.log("previousValue: "+previousValue+"\ncurrentOperator: "+currentOperator);
}

operationButtons.forEach((button) => button.addEventListener('click', operationLogic));

/**
 * takes an operator and DECIMAL_PRECISION numbers and then calls one of the above functions on the numbers.
 */
function operate(){

    let computation;
    const prev = parseFloat(previousValue);
    let current = '';
    if(lastTwoButtons.prev == '=' && lastTwoButtons.curr == '='){
        current = parseFloat(currentValue);
    }else{
        current = parseFloat(displayContent.textContent);
    }
    if(isNaN(prev) || isNaN(current)) return;

    switch(currentOperator){
        case '+':
            computation = add(prev,current);
            break;
        case '-':
            computation = subtract(prev,current);
            break;
        case 'X':
            computation = multiply(prev,current);
            break;
        case '/':
            if(current == 0){
                computation = "Cannot Divide By Zero";
                clearVariables();
            }
            else
                computation = divide(prev,current);
            break;
        default:
            return;
    }

    if(lastTwoButtons.curr == '='){
        currentValue = current;
        previousValue = computation;
    }else{
        currentValue = '';
        currentOperator = undefined;
        previousValue = computation;
    }

    return computation;
}

equalButton.addEventListener('click',() => {
    isOperationInPlace = true;

    if(displayContent.textContent == "Cannot Divide By Zero"){
        clearDisplay();
        clearVariables();
        operationButtons.forEach((button) => button.addEventListener('click', operationLogic));
        return;
    }

    let result = operate();
    console.log(result);

    if(result.toString().length > 16 && result !== "Cannot Divide By Zero"){
        updateDisplay(result.toExponential(11));
    }

    if(result == "Cannot Divide By Zero"){
        displayContent.style.fontSize = "2.1rem";
        operationButtons.forEach((button) => button.removeEventListener('click', operationLogic));  
    }

    updateDisplay(result); 
});

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

    while(isDisplayOverflown(displayContent)){
        reduceDisplayText();
    }

}


function clearVariables(){
    previousValue       = '';
    currentValue        = '';
    previousOperator    = undefined;
    currentOperator     = undefined;
    isOperationInPlace  = false;
    operationButtons.forEach((button) => button.addEventListener('click', operationLogic));
}

function clearDisplay(){
    displayContent.style.fontSize = "4rem";
    displayContent.textContent = 0;
}

function disableButton(){

}


displayContent.textContent = 0;
