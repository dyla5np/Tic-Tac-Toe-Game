const cellElem = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

const winning_combination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const x_class = 'x';
const o_class = 'o';
let oTurn

const winningMessageText = document.querySelector('[winning-message-text]')
const winningMessage = document.getElementById('winningMessage')
const restartGame = document.getElementById('restartButton')

newGame()

restartGame.addEventListener('click', newGame)

function newGame() {
    oTurn = false
    cellElem.forEach(cell => {
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessage.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? o_class : x_class
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        nextTurn()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = "Draw!"
    }else {
        winningMessageText.innerText = `${oTurn ? "O" : "X"} Wins!`
    }
    winningMessage.classList.add('show')
}

function idDraw() {
    return [...cellElem].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function nextTurn() {
    oTurn = !oTurn
}

function setBoardHoverClass() {
    board.classList.remove(o_class)
    board.classList.remove(x_class)
    if (oTurn) {
        board.classList.add(o_class)
    } else {
        board.classList.add(x_class)
    }
}

function checkWin(currentClass) {
    return winning_combination.some(combination => {
        return combination.every(index => {
            return cellElem[index].classList.contains(currentClass)
        })
    })
}