//a class is a blueprint for creating objects 
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
            //default values
            this.currentOperand = ''
            this.previousOperand = ''
            this.operation = undefined
        }

        //Delete
        delete(){
            
        }
        
        //add numbers to the screen  
        appendNumber(number){
            //to only allow us to add one period :
            //if we type the period key and we already have the period key,
            //we just want to return, which will stop our function from executing from any further
            if(number === '.' && this.currentOperand.includes('.')) return

            //convert current opperand and number to strings so we can append them 
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }


        chooseOperation(operation){
            
            if(this.currentOperand === '') return
            if(this.previousOperand !== ''){
                this.compute()
            }
            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
        }
        

        compute(number){
            let computation
            const prev = parseFloat(this.previousOperand)
            const current = parseFloat(this.currentOperand)

            if(isNaN(prev) || isNaN(current)) return 

            switch(this.operation){
                case '+':
                    computation = prev + current
                    break

                case '-':
                    computation = prev - current
                    break

                case '*':
                    computation = prev * current
                    break

                case '÷':
                    computation = prev / current
                    break
                
            //if none of our operations 
                default:
                    return
            }
            this.currentOperand = computation
            this.operation = undefined
            this.previousOperand = ''

        }



        updateDisplay(){
            this.currentOperandTextElement.innerText = this.currentOperand
            this.previousOperandTextElement.innerText = this.previousOperand

        }
}
//constant variables that will be our buttons 

const numberButtons = document.querySelectorAll('[data-number]')
console.log(numberButtons)
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

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

operationButtons.forEach( button => {
    button.addEventListener('click', () => {

        //pass the text of the operation we are choosing
        calculator.chooseOperation(button.innerText)
        //update the display
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    //call compute function
    calculator.compute()
    //update the display
    calculator.updateDisplay()
})



