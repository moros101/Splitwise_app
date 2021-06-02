const inputBox = document.querySelector(".inputbox")
const outputBox = document.querySelector(".outputbox")
const addButton = document.querySelector('.addButton')
const transactionsList = document.querySelector('#transactionslist')
const generateResultBtn = document.querySelector('.generate-result-btn')
const finalResult = document.querySelector('.final-result')

import Graph  from './graph.js'

let graph = new Graph()

addButton.addEventListener('click', () => {
    const lenderBox = document.querySelector('.lender')
    const lender = lenderBox.value
    const borrowerBox = document.querySelector('.borrower')
    const borrower = borrowerBox.value
    const amountBox = document.querySelector('.amount')
    const amount = parseInt(amountBox.value)

    graph.addEdge(lender, borrower, amount)

    const transaction = `${borrower} owes Rs. ${amount} to ${lender}`

    console.log(transaction)

    const listElement = document.createElement('li')
    listElement.innerText = transaction

    transactionsList.appendChild(listElement)

    lenderBox.value = ""
    borrowerBox.value = ""
    amountBox.value = ""
})

generateResultBtn.onclick = function () {
    generateResultBtn.style.display = 'none'

    const result = graph.getResult()

    console.log({ result })

    for (let i = 0; i < result.length; i++){
        const {from,to,label} = result[i]
        const overallTransaction = `${from} should give Rs. ${label} to ${to}`
        const listElement = document.createElement('li')
        listElement.innerText = overallTransaction
        finalResult.appendChild(listElement)
    }

    // finalResult.innerText = result
}