const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const starCells = [
    "","","","","","","","",""
]
let go = "circle"
infoDisplay.textContent = "Circle goes first "
infoDisplay.style.color = "blue"


// Cria o Board
function createBoard(){
    starCells.forEach((cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })
    function restart(){
        starCells.fill("")
        go = "circle"
        infoDisplay.textContent = "Circle goes first"
        const allSquares = document.querySelectorAll(".square")
        allSquares.forEach(square => {
            square.innerHTML = ""
            square.addEventListener("click", addGo)
        })
    }
    const restartButton = document.getElementById("restart")
    restartButton.addEventListener('click', restart)
    gameBoard.after(restartButton)
}
// Inicia o Board
createBoard()
//Veirifca Empate
function checkDraw(){
    const allSquares = document.querySelectorAll(".square")
    const isDraw = [...allSquares].every(square => square.firstChild !== null)
    if (isDraw) {
        infoDisplay.textContent = "It's a Draw!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(ture)))
    }
}
// Adiciona o texto correto a "info"
function addGo(e){
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    const coloru = document.getElementById("info")
    coloru.style.color = go === "circle" ? "red" : "blue"
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "it is now " + go + "'s go."
    e.target.removeEventListener("click", addGo)
    checkScore()
    checkDraw()
}

// Verifica o vencedor
function checkScore(){
    const allSquares = document.querySelectorAll(".square")
    console.log(allSquares)
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    console.log(allSquares[4])

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('circle'))
            if (circleWins) {
                infoDisplay.textContent = "Circle Wins!"
                allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
                infoDisplay.style.color = "blue"
                return
            } 
    })

winningCombos.forEach(array => {
    const crossWins = array.every(cell => 
        allSquares[cell].firstChild?.classList.contains('cross'))
        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            infoDisplay.style.color = "red"
            return
        } 
})
}


