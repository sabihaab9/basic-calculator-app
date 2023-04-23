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
            //take the current operand, convert to string & chop off the last character 
            this.currentOperand = this.currentOperand.toString.slice(0,-1)
        }
        
        //add numbers to the screen  
        appendNumber(number){
            //to only allow us to add one period 
            //if we type the period key and we already have the period key,
            //we just want to return, which will stop our function from executing from any further
            if(number === '.' && this.currentOperand.includes('.')) return

            this.currentOperand = this.currentOperand.toString() + number.toString()
        }


        chooseOperation(operation){
            if(this.currentOperand === '') return
            if(this.previousOperand !== ''){
                this.compute()
            }
            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand = ""
        }
        

        compute(){
            // create result "computation" variable
            let computation  
            //use parseFloat to convert string to decimal number
            const prev = parseFloat(this.previousOperand)
            const current = parseFload(this.currentOperand)

            // we want to make sure that the code doesn't run if the user hits equal 
            //when there is no prev or current operands.
            if( isNaN(prev) || isNaN(current)) return 

            //computation 
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

                default:
                    return
            }
            this.currentOperand = computation
            this.previousOperand = ''
            this.operation = undefined


        }

        updateDisplay(){
            this.currentOperandTextElement.innerText = this.currentOperand
            this.previousOperandTextElement.innerText = this.previousOperand

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

operationButtons.forEach( button => {
    button,addEventListener('click', () => {

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

allClearButton.addEventListener('click', button => {

    //call clear function
    calculator.clear()
        //update the display
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {

    //call delete function
    calculator.delete()
        //update the display
    calculator.updateDisplay()
})