const cellElem = document.querySelectorAll('[data-cell]');

cellElem.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
})

function handleClick(e) {
    // placeMark
    //Check for Win
    //Check for Draw
    //Switch Turn
}