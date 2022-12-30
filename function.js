const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restart = document.querySelector("#restart");
const switchplay = document.querySelector("#switch");
let selected = document.querySelector("#difficulty");

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
const moveCase = [
    [0, 4, 8], [4, 8, 0], [2, 4, 6], [4, 6, 2], [1, 4, 7], [4, 7, 1], [3, 4, 5], [4, 5, 3],
    [0, 1, 2], [1, 2, 0], [0, 3, 6], [3, 6, 0], [6, 7, 8], [7, 8, 6], [8, 5, 2], [5, 2, 8]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let running = false;
let firstToggle = true;
let idOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const delay = ms => new Promise(res => setTimeout(res, ms));
startGame();

function startGame() {
    //The user can click any cell to start the game, therefore add eventlistener 
    //to every cell. The user can also click restart to start over
    cells.forEach(cell => cell.addEventListener("click", clickCell));
    restart.addEventListener("click", restartGame);
    switchplay.addEventListener("click", switchPlay);
    switchplay.addEventListener("click", xGoFirst);
    statusText.textContent = `Player: ${currPlayer}`;
    
    running = true;
}

function xGoFirst() {
    if (currPlayer == "O" && firstToggle == true) {
        switchPlay();
         let up = updateAfterClick();
         setTimeout(() => { up.textContent = "X"}, 1000);
    }
    firstToggle = false;
}


function restartGame() {
    // reset all the instance variables
    currPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player: ${currPlayer}`;
    cells.forEach(cell => cell.textContent="");
    firstToggle = true;
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
    if (running) {
        // 1
        console.log("first");
        console.log(options);
        let up = updateAfterClick();
        if (currPlayer == "X") {
            setTimeout(() => { up.textContent = "O"}, 1000);
        }else {
            setTimeout(() => { up.textContent = "X"}, 1000);
        }
        checkWinNoSwitch();
    }
    else {
        checkWin();
    }
    // 3
    console.log("third");
    console.log(options);
    console.log('\n');
    console.log('\n');
}

function checkWinNoSwitch() {
    let winYet = false;
    let winParty;
    for (let i = 0; i < winCases.length; i++) {
        let ca = winCases[i];
        let cellOne = options[ca[0]];
        let cellTwo = options[ca[1]];
        let cellThree = options[ca[2]];
        if (cellOne == cellTwo && cellOne == cellThree && cellOne != "") {
            winParty = cellOne;
            winYet = true;
            break;
        }
        else {
            continue;
        }
    } 
    // if there is three link together, just announce the win and end the game
    if (winYet == true) {
        setTimeout(() => { statusText.textContent = `${winParty} won` }, 1000);
        running = false;
        firstToggle = true;
    }
    else if (!options.includes("")) {
        setTimeout(() => { statusText.textContent = `Draw`; }, 1000);
        running = false;
        firstToggle = true;
    }
}

function updateAfterClick() {
    let level = selected.value;
    let remain = [];
    let idx;
    let id;
    for (let i = 0; i < options.length; i++) {
        if (options[i] == "") {
            remain.push(i);
        }
    }
    if (level == "Easy") {
        let randomIdx = Math.floor(Math.random() * remain.length);
        idx = remain[randomIdx];
        id = idOptions[idx];
    }
    else {
   
        let op;
        if (currPlayer == "X") {
            op = "O";
        }
        else {
            op="X";
        }
        var find;
        for (let i = 0; i < moveCase.length; i++) {
            var ca = moveCase[i];
            let cellOne = options[ca[0]];
            let cellTwo = options[ca[1]];
            let cellThree = options[ca[2]];
            if (cellOne == op && cellTwo == op &&  cellThree == "") {
                find = true;
                break;
            }
            else {
                continue;
            }
        } 
        if (find == true) {
            idx = ca[2];
            id = idOptions[idx];
        }
        else {
            let randomIdx = Math.floor(Math.random() * remain.length);
            idx = remain[randomIdx];
            id = idOptions[idx];
        }
    }
    var x = document.getElementById(id);
    if (currPlayer == "O") {
        options[idx] = "O";
        switchPlay();
        return x;
    }
    else {
        options[idx] = "X";
        switchPlay();
        return x;
    }
}

function hardPick(remain) {
    let op; 
    if (currPlayer == "X") {
        op = "O";
    }
    else {
        op = "X";
    }
    if (option[0] == op && option[4] == op && option[8] == "") {

    }
}

function updateCell(cell, index) {
    options[index] = currPlayer;
    cell.textContent = currPlayer;
}

function switchPlay() {
    if (currPlayer == "X") {
        currPlayer = "O";
        statusText.textContent = `Player: ${currPlayer}`;
    }
    else {
        currPlayer = "X";
        statusText.textContent = `Player: ${currPlayer}`;
    }
}

function checkWin() {
    let winYet = false;
    let winParty;
    for (let i = 0; i < winCases.length; i++) {
        let ca = winCases[i];
        let cellOne = options[ca[0]];
        let cellTwo = options[ca[1]];
        let cellThree = options[ca[2]];
        if (cellOne == cellTwo && cellOne == cellThree && cellOne != "") {
            winParty = cellOne;
            winYet = true;
            break;
        }
        else {
            continue;
        }
    } 
    // if there is three link together, just announce the win and end the game
    if (winYet == true) {
        statusText.textContent = `${winParty} won`;
        running = false;
        firstToggle = true;
    }
    //if no one win, announce draw and end game
    else if (!options.includes("")) {
        statusText.textContent = `Draw`;
        running = false;
        firstToggle = true;
    }
    //if no one win yet and there is still space, switch and continue;
    else {
        switchPlay();
    }
}
