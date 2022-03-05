const numberButtons = document.getElementsByClassName('number')
const operationButtons = document.getElementsByClassName('operation')
const previousOperationText = document.getElementsByClassName('previous')[0]
const currentOperationText = document.getElementsByClassName('current')[0]
const allClearButton = document.getElementsByClassName('ac')[0]
const equalsButton = document.getElementsByClassName('equals')[0]
const deleteButton = document.getElementsByClassName('del')[0]


let previousOperation = '' // The number you typed previously (shows up in the top)
let operator = '' // The operator (÷, *, +, -) you typed
let currentOperation = '' // The number you are currently typing (shows up in the bottom)


for (let numberButton of numberButtons) {
  numberButton.onclick = () => {
    if (
      numberButton.innerText === '.' && currentOperation.includes('.') ||
      numberButton.innerText === '0' && currentOperation === '0'
    ) return
    currentOperation += numberButton.innerText
    drawScreen()
  }
}

for (let operationButton of operationButtons) {
  operationButton.onclick = () => {
    if (currentOperation == '') {
      operator = operationButton.innerText
      drawScreen()
      return
    }
    if (previousOperation != '' && operator != '') {
      previousOperation = calculate()
      operator = operationButton.innerText
      currentOperation = ''
      drawScreen()
      return
    }
    previousOperation = currentOperation
    operator = operationButton.innerText
    currentOperation = ''
    drawScreen()
  }
}


allClearButton.onclick = () => {
  currentOperation = ''
  operator = ''
  previousOperation = ''
  drawScreen()
}


equalsButton.onclick = () => {
  if (currentOperation == '' || 
    previousOperation == '' || 
    operator == ''
  ) return
  currentOperation = calculate()
  operator = ''
  previousOperation = ''
  drawScreen()
}


deleteButton.onclick = () => {
  const temp = currentOperation.slice(0, -1)
  currentOperation = temp
  drawScreen()
}


function calculate() {
  switch (operator) {
    case '÷':
      return (parseFloat(previousOperation) / parseFloat(currentOperation)).toString()
    case '×':
      return (parseFloat(previousOperation) * parseFloat(currentOperation)).toString()
    case '+':
      return (parseFloat(previousOperation) + parseFloat(currentOperation)).toString()
    case '-':
      return (parseFloat(previousOperation) - parseFloat(currentOperation)).toString()
  }
}


function drawScreen() {
  currentOperationText.innerText = formatNumber(currentOperation)
  previousOperationText.innerText = `${formatNumber(previousOperation)} ${operator}`
}


function formatNumber(strNumber) {
  let splitNumber = strNumber.split('.')
  let intDigits = parseInt(splitNumber[0])
  let floatDigits = splitNumber[1]

  if (isNaN(intDigits)) return ''
  if (isNaN(floatDigits)) return intDigits.toLocaleString('en')

  let formattedInteger = intDigits.toLocaleString('en')

  return `${formattedInteger}.${floatDigits}`
}
