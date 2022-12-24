const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restart = document.querySelector("#restart");
const switchplay = document.querySelector("#switch");
const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];
let options = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let running = false;
let idOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const delay = ms => new Promise(res => setTimeout(res, ms));
startGame();

function startGame() {
    //The user can click any cell to start the game, therefore add eventlistener 
    //to every cell. The user can also click restart to start over
    cells.forEach(cell => cell.addEventListener("click", clickCell));
    restart.addEventListener("click", restartGame);
    switchplay.addEventListener("click", switchPlay);
    statusText.textContent = `${currPlayer}'s turn`;
    running = true;
}

function restartGame() {
    // reset all the instance variables
    currPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currPlayer}'s turn`;
    cells.forEach(cell => cell.textContent="");
    running = true;
}

function clickCell() {
    //when a cell is clecked, we check if it is already been marked,
    // if not, update the cell as marked and check if anyone win yet
    const idx = this.getAttribute("cellIndex");
    if (options[idx] != "" || !running) {
        return;
    }
    updateCell(this, idx);
    
    checkWin();
    setTimeout(() => { updateAfterClick() }, 1000);
    checkWin();
}

function updateAfterClick() {
    let remain = [];
    for (let i = 0; i < options.length; i++) {
        if (options[i] != "") {
            remain.push(i);
        }
    }
    const random = Math.floor(Math.random() * remain.length);
    let id = idOptions[random];
    let x = document.getElementById(id);
    if (currPlayer == "O") {
        options[random] = "X";
        x.textContent = "X";
    }
    else {
        options[random] = "O";
        x.textContent = "O";
    }
}


function updateCell(cell, index) {
    options[index] = currPlayer;
    cell.textContent = currPlayer;
}

function switchPlay() {
    if (currPlayer == "X") {
        currPlayer = "O";
        statusText.textContent = `${currPlayer}'s turn`;
    }
    else {
        currPlayer = "X";
        statusText.textContent = `${currPlayer}'s turn`;
    }
}

function checkWin() {
    let winYet = false;
    for (let i = 0; i < winCases.length; i++) {
        let ca = winCases[i];
        let cellOne = options[ca[0]];
        let cellTwo = options[ca[1]];
        let cellThree = options[ca[2]];
        if (cellOne == cellTwo && cellOne == cellThree && cellOne != "") {
            winYet = true;
            break;
        }
        else {
            continue;
        }
    } 
    // if there is three link together, just announce the win and end the game
    if (winYet == true) {
        statusText.textContent = `${currPlayer} won`;
        running = false;
    }
    //if no one win, announce draw and end game
    else if (!options.includes("")) {
        statusText.textContent = `Draw`;
        running = false;
    }
    //if no one win yet and there is still space, switch and continue;
    else {
        //switchPlay();
    }
}
