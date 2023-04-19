//a class is a special function, blueprint for creating objects 
//inside a class, you define the properties and/or methods(functions)

class Calculator{

    //constructor method - creates and intializes an object created within a class
    //assigns properties, automatically called when creating an object. 

    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement

        //call clear function - so we can put everything in default position 
        //when a 'new' calculator is made 
        this.clear()
    }

    //operations our Calculator class can perform:

        //AC
        clear(){
            this.currentOperand = ''
            this.previousOperand = ''
            this.operation = undefined
        }

        //Delete
        delete(){

        }
        
        //add numbers to the screen  
        appendNumber(number){
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }


        chooseOperation(operation){

        }
        

        compute(){

        }

        updateDisplay(){
            this.currentOperandTextElement.innerText = this.currentOperand

        }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-previous-operand]')

// create a calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//add event listener for each numberButtons element (1,2,3 ...)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {

        //add numbers on buttons to screen 
        calculator.appendNumber(button.innerText)
        
        calculator.updateDisplay()
    })
})