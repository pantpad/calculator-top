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
let     displayValue = '0';


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
/**
 * takes an operator and DECIMAL_PRECISION numbers and then calls one of the above functions on the numbers.
 */
function operate(operator,firstNumber = 0 ,secondNumber = 0){
    switch(operator){
        case '0':
            break;
        case '+':
            displayValue = add(firstNumber,secondNumber);
            break;
        case '-':
            displayValue = subtract(firstNumber,secondNumber);
            break;
        case '*':
            displayValue = multiply(firstNumber,secondNumber);
            break;
        case '/':
            displayValue = divide(firstNumber,secondNumber);
            break;
    }
}

/*--            BUTTONS LOGIC           --*/
//apply eventListener to all buttons inside the buttons-container
const buttons = document.querySelectorAll('.buttons-container div');
buttons.forEach(button => button.addEventListener(('click'),(e)=> {
    if(/^\d$/.test(e.target.textContent)){
        displayValue = e.target.textContent;
        updateDisplay(displayValue);
    }
    if(e.target.textContent == "C"){
        clearDisplay();
    }
}));


function isDisplayOverflown(element){
    return element.clientWidth > element.parentElement.clientWidth;
}

function reduceDisplayText(){
    displayContent.style.fontSize = parseFloat(window.getComputedStyle(displayContent).fontSize) - 5 + "px";
}

function updateDisplay(value){
    if(displayContent.textContent.length > 16){
        console.log('wee troppo grande');
        return;
    }

    if(displayContent.textContent == "0"){
        displayContent.textContent = value;
    }else{
    displayContent.textContent += value;
    }

    if(isDisplayOverflown(displayContent)){
        reduceDisplayText();
    }

}

function clearDisplay(){
    displayContent.textContent = 0;
}

updateDisplay(0);
