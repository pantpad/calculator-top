console.log('ready');

//create the visual representation of the calculator
//make the numbers clicked appear on the calculator
//when operator is clicked 
    //save what is inside the display -> firstValue || CALCULATE firstValue + operator + secondValue and save it inside the firstValue
    //save the operator clicked
//make the numbers clicked appear on the calculator
//another operator is clicked
    //equality operator with firstValue and secondValue != null? -> calculate firstValue + operator + secondValue;
    
const calculatorBox = document.querySelector('.calculator-box');
const display = document.querySelector('.display');
const displayContent = document.querySelector('.display-content');

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function isDisplayOverflown(element){
    return element.clientWidth > element.parentElement.clientWidth;
}

function reduceDisplayText(){
    displayContent.style.fontSize = parseFloat(window.getComputedStyle(displayContent).fontSize) - 10 + "px";
}

