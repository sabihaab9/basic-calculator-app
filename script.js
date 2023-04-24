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
            //convert current opperand to a string and chop off last character
            this.currentOperand = this.currentOperand.toString().slice(0,-1)
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
            
            //if the current operand is empty, we stop function 
            if(this.currentOperand === '') return
           //if the previous operand is not an empty string, we waht to execute the compute fnc.
            if(this.previousOperand !== ''){
                this.compute()
            }
            //set this.operation = the 'operation' we passed in.
            this.operation = operation
            //we're done typing the current # and so we recycle that to the previous operand 
            this.previousOperand = this.currentOperand
            //clear out the current operand 
            this.currentOperand = ''
        }
        

        compute(number){
            //result
            let computation
            //convert strings previousOperand and currentOPerand to decimal numbers
            const prev = parseFloat(this.previousOperand)
            const current = parseFloat(this.currentOperand)

            //if we dont have a prev or current operand, stop fnc.
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
                
            //if none of our operations equal the above, stop compute fnc.
                default:
                    return
            }

            this.currentOperand = computation
            this.operation = undefined
            this.previousOperand = ''

        }

        getDisplayNumber(number){
            //convert number from string to decimal
            const floatNumber = parseFloat(number)
            
            //if floatNumber is not a number
            if (isNaN(floatNumber)) return ''

            //if we do have a number, change number to string with commas.
            return floatNumber.toLocaleString('en')}
        }

        updateDisplay(){
            this.currentOperandTextElement.innerText =
             this.getDisplayNumber(this.currentOperand)
            //to show commas and operations:
            //if we have an operation, display our previous operand and our operation 
            if(this.operation != null){
                this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            }
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

allClearButton.addEventListener('click', button => {
    //call clear function
    calculator.clear()
    //update display
    calculator.updateDisplay()
} )

deleteButton.addEventListener('click',button => {
    //call delete function
    calculator.delete()
    //update display
    calculator.updateDisplay()
} )

