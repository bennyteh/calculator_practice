//handle theme change

let themeFile = document.getElementById('theme')

function handleThemeChange(val) {
    let themeNumber = val
    let themeName = "./css/theme" + themeNumber.toString() + ".css"
    themeFile.href = themeName
}

//calculator

class Calculator {
    constructor(currentNumber) {
        this.currentNumber = currentNumber
    }

    reset(){
        this.displayNumber = ''
        this.previousNumber = ''
        this.operator = undefined
    }

    delete(){
        this.displayNumber =  this.displayNumber.slice(0, this.displayNumber.length - 1)
    }

    operation(operator){
        this.operator = operator
        this.previousNumber = this.displayNumber
        this.displayNumber = ''
    }

    inputButton(number){
        if (number === '.' && this.displayNumber.includes('.')) return

        if (this.displayNumber == undefined) {
            return this.displayNumber = number
        }
        this.displayNumber = this.displayNumber + number
    }

    compute() {
        switch(this.operator) {
            case '+':
                this.displayNumber = parseFloat(this.previousNumber) + parseFloat (this.displayNumber) 
                break;
            case '-':
                this.displayNumber = parseFloat(this.previousNumber) - parseFloat(this.displayNumber)
                break;
            case 'x':
                this.displayNumber = parseFloat(this.previousNumber) * parseFloat (this.displayNumber)
                break;
            case '/':
                this.displayNumber = parseFloat(this.previousNumber) / parseFloat(this.displayNumber)
                break;
            default:
                return;

        }
    }
    
    toLocaleNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentNumber.innerHTML = this.toLocaleNumber(this.displayNumber)
    }
}

let display = document.getElementById('output')
let numberButton = document.querySelectorAll('[data-number]')
let deleteButton = document.querySelector('[data-delete]')
let resetButton = document.querySelector('[data-reset]')
let operatorButton = document.querySelectorAll('[data-operator]')
let equalButton = document.querySelector('[data-equal]')

let calculator = new Calculator(display)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.inputButton(button.innerHTML)
        calculator.updateDisplay()
    })
})

resetButton.addEventListener('click', () => {
    calculator.reset()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

operatorButton.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.operation(button.innerHTML)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', ()=>{
    calculator.compute();
    calculator.updateDisplay();
})