
window.onload = function (){
    if (!localStorage.getItem('totalRound')) window.location.href = '../index.html';
}

// Global Variable ------------------------------------------------------------------------------------------

let gameCounterTurn = -1;
let gameEnd = 0;
let startCounter = 0;

let playerPoint = 0;
let computerPoint = 0;

const gameChallenge =  localStorage.getItem('gameChallenge');
let challengeCounter = 0;
let selectedCell = [];

const gameMode = localStorage.getItem('gameMode');
document.getElementById('gameModeTitleText').innerHTML = gameMode;

// Absolute Message Handler -------------------------------------------------------------------------------------

const absoluteMessageContainer = document.getElementById('absoluteMessageContainer');
const absoluteMessage = document.getElementById('absoluteMessage');
function showAbsoluteMessage(message, time){
    absoluteMessageContainer.style.height = '100%';
    absoluteMessage.style.opacity = '100%'
    absoluteMessage.innerHTML = message;
    setTimeout(function (){
        absoluteMessageContainer.style.height = '0';
        absoluteMessage.style.opacity = '0';
        setTimeout(function (){
            absoluteMessage.innerHTML = '';
        }, 500);
    }, time);

}

// Game Round Handler -------------------------------------------------------------------------------------------

const totalRound = localStorage.getItem('totalRound');
const gameRound = document.getElementById('gameRound');
let currentRound = 0;

function showCurrentRound(round){
    gameRound.innerHTML = "Round " + round;
    showAbsoluteMessage("Round " + round, 1000);

}


// Game Turn Handler ---------------------------------------------------------------------------------------

const gameTurnText = document.getElementById('gameTurn');

function showGameTurn(message){
    gameTurnText.innerHTML = message;
}
function changeGameTurnText(){
    if (gameCounterTurn % 2 !== 0) showGameTurn("Player1's Turn");
    else showGameTurn("Computer's Turn");
}

// RSP (Rok Scissors Paper) Game Logic -----------------------------------------------------------------------------

let playerRSPPoint = 0;
let computerRSPPoint = 0;

const rpsGameContainer = document.getElementById('rpsGameContainer');

function computerRSPRandom(){
    return  Math.ceil(Math.random() * 10) % 3 + 1;
}
function rpsGame(playerIn){
    // Rock = 1
    // Scissors = 2
    // Paper = 3
    const computerChoice = computerRSPRandom();
    if (computerChoice === 1){
        if (playerIn === 1 ) showAbsoluteMessage('Draw!', 1200);
        else if (playerIn === 2) {
            showAbsoluteMessage('Computer Wins!', 1200);
            computerRSPPoint++;
        }
        else if (playerIn === 3) {
            showAbsoluteMessage('Player 1 Wins!', 1200);
            playerRSPPoint++;
        }
    }
    else if (computerChoice === 2){
        if (playerIn === 1 ) {
            showAbsoluteMessage('Player 1 Wins!', 1200);
            playerRSPPoint++;
        }
        else if (playerIn === 2) showAbsoluteMessage('Draw!', 1200);
        else if (playerIn === 3) {
            showAbsoluteMessage('Computer Wins!', 1200);
            computerRSPPoint++;
        }
    }
    else if (computerChoice === 3){
        if (playerIn === 1 ) {
            showAbsoluteMessage('Computer Wins!', 1200);
            computerRSPPoint++;
        }
        else if (playerIn === 2) {
            showAbsoluteMessage('Player 1 Wins!', 1200);
            playerRSPPoint++;
        }
        else if (playerIn === 3) showAbsoluteMessage('Draw!', 1200);
    }

    checkRPSScore();
}

function checkRPSScore() {
    if (playerRSPPoint > computerRSPPoint) {
        setTimeout(function (){
            rpsGameContainer.style.opacity = '0';
            gameCounterTurn = startCounter = 1;
            showGameTurn("Player1's Turn");
            setTimeout(function (){
                rpsGameContainer.style.display = 'none';

                setTimeout(function (){
                    showCurrentRound(currentRound + 1);
                    setTimeout(function () {
                        resetCells();
                    }, 50);
                }, 200);

            }, 500);
        }, 1200);
    } else if (playerRSPPoint < computerRSPPoint){
        setTimeout(function (){
            rpsGameContainer.style.opacity = '0';
            gameCounterTurn = startCounter = 2;
            showGameTurn("Computer's Turn");
            setTimeout(function (){
                rpsGameContainer.style.display = 'none';

                setTimeout(function (){
                    showCurrentRound(currentRound + 1);
                    resetCells();
                    setTimeout(function (){
                        computerLogic();
                    }, 500);
                }, 10);

            }, 500);
        }, 1200);
    }

}

// Tic Tac Toe Logic -----------------------------------------------------------------

let boardArr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const cell1 = document.getElementById('cell1');
const cell2 = document.getElementById('cell2');
const cell3 = document.getElementById('cell3');
const cell4 = document.getElementById('cell4');
const cell5 = document.getElementById('cell5');
const cell6 = document.getElementById('cell6');
const cell7 = document.getElementById('cell7');
const cell8 = document.getElementById('cell8');
const cell9 = document.getElementById('cell9');

function cellClicked(row, col){
    if (gameCounterTurn % 2 !== 0 && boardArr[row][col] === 0 && challengeCounter < 6) {
        boardArr[row][col] = 1;
        markO(row, col);
        changeOfTurn();

    }
    else if (gameCounterTurn % 2 !== 0 && challengeCounter === 6){
        if (selectedCell.length === 0 && boardArr[row][col] === 1){
            selectedCell = [row, col];
            changeCellColor(row, col);
        } else if (row === selectedCell[0] && col === selectedCell[1] && boardArr[row][col] === 1){
            selectedCell.length = 0;
            resetCellColor(row, col);
        } else if (selectedCell.length !== 0 && boardArr[row][col] === 0){
            boardArr[row][col] = 1;
            markO(row, col);
            boardArr[selectedCell[0]][selectedCell[1]] = 0;
            removeMark(selectedCell[0], selectedCell[1]);
            resetCellColor(selectedCell[0], selectedCell[1]);
            selectedCell.length = 0;
            changeOfTurn();
        }
    }
    // console.log(challengeCounter);
    // console.log(boardArr);
    // console.log(selectedCell);
}

function markO(row, col){
    if (row === 0 && col === 0) cell1.innerHTML = "<i class='bx bx-radio-circle' ></i>";
    if (row === 0 && col === 1) cell2.innerHTML = "<i class='bx bx-radio-circle' ></i>";
    if (row === 0 && col === 2) cell3.innerHTML = "<i class='bx bx-radio-circle' ></i>";
    if (row === 1 && col === 0) cell4.innerHTML = "<i class='bx bx-radio-circle' ></i>";
    if (row === 1 && col === 1) cell5.innerHTML = "<i class='bx bx-radio-circle' ></i>";
    if (row === 1 && col === 2) cell6.innerHTML = "<i class='bx bx-radio-circle' ></i>";
    if (row === 2 && col === 0) cell7.innerHTML = "<i class='bx bx-radio-circle' ></i>";
    if (row === 2 && col === 1) cell8.innerHTML = "<i class='bx bx-radio-circle' ></i>";
    if (row === 2 && col === 2) cell9.innerHTML = "<i class='bx bx-radio-circle' ></i>";
}

function markX(row, col){
    if (row === 0 && col === 0) cell1.innerHTML = "<i class='bx bx-x'></i>";
    if (row === 0 && col === 1) cell2.innerHTML = "<i class='bx bx-x'></i>";
    if (row === 0 && col === 2) cell3.innerHTML = "<i class='bx bx-x'></i>";
    if (row === 1 && col === 0) cell4.innerHTML = "<i class='bx bx-x'></i>";
    if (row === 1 && col === 1) cell5.innerHTML = "<i class='bx bx-x'></i>";
    if (row === 1 && col === 2) cell6.innerHTML = "<i class='bx bx-x'></i>";
    if (row === 2 && col === 0) cell7.innerHTML = "<i class='bx bx-x'></i>";
    if (row === 2 && col === 1) cell8.innerHTML = "<i class='bx bx-x'></i>";
    if (row === 2 && col === 2) cell9.innerHTML = "<i class='bx bx-x'></i>";
}

function removeMark(row, col){
    if (row === 0 && col === 0) cell1.innerHTML = "";
    if (row === 0 && col === 1) cell2.innerHTML = "";
    if (row === 0 && col === 2) cell3.innerHTML = "";
    if (row === 1 && col === 0) cell4.innerHTML = "";
    if (row === 1 && col === 1) cell5.innerHTML = "";
    if (row === 1 && col === 2) cell6.innerHTML = "";
    if (row === 2 && col === 0) cell7.innerHTML = "";
    if (row === 2 && col === 1) cell8.innerHTML = "";
    if (row === 2 && col === 2) cell9.innerHTML = "";
}

function changeCellColor(row, col){
    if (row === 0 && col === 0) cell1.style.backgroundColor = "#a5bafa";
    if (row === 0 && col === 1) cell2.style.backgroundColor = "#a5bafa";
    if (row === 0 && col === 2) cell3.style.backgroundColor = "#a5bafa";
    if (row === 1 && col === 0) cell4.style.backgroundColor = "#a5bafa";
    if (row === 1 && col === 1) cell5.style.backgroundColor = "#a5bafa";
    if (row === 1 && col === 2) cell6.style.backgroundColor = "#a5bafa";
    if (row === 2 && col === 0) cell7.style.backgroundColor = "#a5bafa";
    if (row === 2 && col === 1) cell8.style.backgroundColor = "#a5bafa";
    if (row === 2 && col === 2) cell9.style.backgroundColor = "#a5bafa";
}

function resetCellColor(row, col){
    if (row === 0 && col === 0) cell1.style.backgroundColor = "#e7e7f8";
    if (row === 0 && col === 1) cell2.style.backgroundColor = "#e7e7f8";
    if (row === 0 && col === 2) cell3.style.backgroundColor = "#e7e7f8";
    if (row === 1 && col === 0) cell4.style.backgroundColor = "#e7e7f8";
    if (row === 1 && col === 1) cell5.style.backgroundColor = "#e7e7f8";
    if (row === 1 && col === 2) cell6.style.backgroundColor = "#e7e7f8";
    if (row === 2 && col === 0) cell7.style.backgroundColor = "#e7e7f8";
    if (row === 2 && col === 1) cell8.style.backgroundColor = "#e7e7f8";
    if (row === 2 && col === 2) cell9.style.backgroundColor = "#e7e7f8";
}

function changeOfTurn(){
    if (gameChallenge === "normal") gameEnd++;
    else if (gameChallenge === "challenge" && challengeCounter < 6) challengeCounter++;
    gameChecker();
}

function computerLogic() {
    let cellBlock = false;
    if (gameCounterTurn % 2 === 0 && challengeCounter < 6){

        // BLOCKING AND AI LOGIC ---------------------------------------------------------------------------------------------

        // Horizontal and Vertical Checker --------------------------------------------------------------------------
        // H-Right
        // H-Mid
        // H-Left
        // V-Bottom
        // V-Mid
        // V-Top
        for (let i = 0; i < 3; i++) {
            if (boardArr[i][0] === 1 && boardArr[i][1] === 1 && boardArr[i][2] === 0 ||
                    boardArr[i][0] === 2 && boardArr[i][1] === 2 && boardArr[i][2] === 0){
                boardArr[i][2] = 2;
                if (i === 0) cell3.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 1) cell6.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 2) cell9.innerHTML = "<i class='bx bx-x'></i>";
                cellBlock = true;
                break
            }
            else if (boardArr[i][0] === 1 && boardArr[i][1] === 0 && boardArr[i][2] === 1 ||
                    boardArr[i][0] === 2 && boardArr[i][1] === 0 && boardArr[i][2] === 2){
                boardArr[i][1] = 2;
                if (i === 0) cell2.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 1) cell5.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 2) cell8.innerHTML = "<i class='bx bx-x'></i>";
                cellBlock = true;
                break
            }
            else if (boardArr[i][0] === 0 && boardArr[i][1] === 1 && boardArr[i][2] === 1 ||
                    boardArr[i][0] === 0 && boardArr[i][1] === 2 && boardArr[i][2] === 2){
                boardArr[i][0] = 2;
                if (i === 0) cell1.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 1) cell4.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 2) cell7.innerHTML = "<i class='bx bx-x'></i>";
                cellBlock = true;
                break
            }
            else if (boardArr[0][i] === 1 && boardArr[1][i] === 1 && boardArr[2][i] === 0 ||
                    boardArr[0][i] === 2 && boardArr[1][i] === 2 && boardArr[2][i] === 0){
                boardArr[2][i] = 2;
                if (i === 0) cell7.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 1) cell8.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 2) cell9.innerHTML = "<i class='bx bx-x'></i>";
                cellBlock = true;
                break
            }
            else if (boardArr[0][i] === 1 && boardArr[1][i] === 0 && boardArr[2][i] === 1 ||
                    boardArr[0][i] === 2 && boardArr[1][i] === 0 && boardArr[2][i] === 2){
                boardArr[1][i] = 2;
                if (i === 0) cell4.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 1) cell5.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 2) cell6.innerHTML = "<i class='bx bx-x'></i>";
                cellBlock = true;
                break
            }
            else if (boardArr[0][i] === 0 && boardArr[1][i] === 1 && boardArr[2][i] === 1 ||
                    boardArr[0][i] === 0 && boardArr[1][i] === 2 && boardArr[2][i] === 2){
                boardArr[0][i] = 2;
                if (i === 0) cell1.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 1) cell2.innerHTML = "<i class='bx bx-x'></i>";
                else if (i === 2) cell3.innerHTML = "<i class='bx bx-x'></i>";
                cellBlock = true;
                break
            }
        }

        // Diagonal Checker ---------------------------------------------------------------------
        // D-Top
        // D-Mid
        // D-Bottom
        if (!cellBlock){
            for (let i = 0; i < 2; i++) {
                if (boardArr[0][i + i] === 0 && boardArr[1][1] === 1 && boardArr[2][2 - i * 2] === 1 ||
                        boardArr[0][i + i] === 0 && boardArr[1][1] === 2 && boardArr[2][2 - i * 2] === 2) {
                    boardArr[0][i + i] = 2;
                    if (i === 0) cell1.innerHTML = "<i class='bx bx-x'></i>";
                    else if (i === 1) cell3.innerHTML = "<i class='bx bx-x'></i>";
                    cellBlock = true;
                    break
                } else if (boardArr[0][i + i] === 1 && boardArr[1][1] === 0 && boardArr[2][2 - i * 2] === 1 ||
                        boardArr[0][i + i] === 2 && boardArr[1][1] === 0 && boardArr[2][2 - i * 2] === 2) {
                    boardArr[1][1] = 2;
                    cell5.innerHTML = "<i class='bx bx-x'></i>";
                    cellBlock = true;
                    break
                } else if (boardArr[0][i + i] === 1 && boardArr[1][1] === 1 && boardArr[2][2 - i * 2] === 0 ||
                        boardArr[0][i + i] === 2 && boardArr[1][1] === 2 && boardArr[2][2 - i * 2] === 0) {
                    boardArr[2][2 - i * 2] = 2;
                    if (i === 0) cell9.innerHTML = "<i class='bx bx-x'></i>";
                    else if (i === 1) cell7.innerHTML = "<i class='bx bx-x'></i>";
                    cellBlock = true;
                    break
                }
            }
        }

        if (!cellBlock){
            while (true){
                const rowRand = boardArrRandom();
                const colRand = boardArrRandom();
                if (boardArr[rowRand][colRand] === 0) {
                    boardArr[rowRand][colRand] = 2;
                    if (rowRand === 0 && colRand === 0) cell1.innerHTML = "<i class='bx bx-x'></i>";
                    else if (rowRand === 0 && colRand === 1) cell2.innerHTML = "<i class='bx bx-x'></i>";
                    else if (rowRand === 0 && colRand === 2) cell3.innerHTML = "<i class='bx bx-x'></i>";
                    else if (rowRand === 1 && colRand === 0) cell4.innerHTML = "<i class='bx bx-x'></i>";
                    else if (rowRand === 1 && colRand === 1) cell5.innerHTML = "<i class='bx bx-x'></i>";
                    else if (rowRand === 1 && colRand === 2) cell6.innerHTML = "<i class='bx bx-x'></i>";
                    else if (rowRand === 2 && colRand === 0) cell7.innerHTML = "<i class='bx bx-x'></i>";
                    else if (rowRand === 2 && colRand === 1) cell8.innerHTML = "<i class='bx bx-x'></i>";
                    else if (rowRand === 2 && colRand === 2) cell9.innerHTML = "<i class='bx bx-x'></i>";
                    break;
                }
            }
        }

        if (gameChallenge === "normal") gameEnd++;
        else if (gameChallenge === "challenge" && challengeCounter < 6) challengeCounter++;
        gameChecker();
    }
}

// Challenge Mode Logic AI

function challengeModLogic() {
    let cellBlock = false;
    if (gameCounterTurn % 2 === 0 && challengeCounter === 6){

        // BLOCKING AND AI LOGIC ---------------------------------------------------------------------------------------------
        let winBlock = false;

        // Horizontal and Vertical Win Checker --------------------------------------------------------------------------
        // H-Right
        // H-Mid
        // H-Left
        // V-Bottom
        // V-Mid
        // V-Top
        for (let i = 0; i < 3; i++) {
            // H - Right (colDestination = 2) ------------------------------------------
            if (boardArr[i][0] === 2 && boardArr[i][1] === 2 && boardArr[i][2] === 0){
                moveComputerMark_H(i, 2);
                winBlock = true;
                break;
            }
            // H - Mid (colDestination = 1) ------------------------------------------------------
            else if (boardArr[i][0] === 2 && boardArr[i][1] === 0 && boardArr[i][2] === 2){
                moveComputerMark_H(i, 1);
                winBlock = true;
                break;
            }
            // H - Left (colDestination = 0) -----------------------------------------------------
            else if (boardArr[i][0] === 0 && boardArr[i][1] === 2 && boardArr[i][2] === 2){
                moveComputerMark_H(i, 0);
                winBlock = true;
                break;
            }
            // V - Bottom
            else if (boardArr[0][i] === 2 && boardArr[1][i] === 2 && boardArr[2][i] === 0){
                moveComputerMark_V(2, i);
                winBlock = true;
                break;
            }
            // V - Mid
            else if (boardArr[0][i] === 2 && boardArr[1][i] === 0 && boardArr[2][i] === 2){
                moveComputerMark_V(1, i);
                winBlock = true;
                break;
            }
            // V - Top
            else if (boardArr[0][i] === 0 && boardArr[1][i] === 2 && boardArr[2][i] === 2){
                moveComputerMark_V(0, i);
                winBlock = true;
                break;
            }
            function moveComputerMark_H(i, colDestination){
                for (let j = i; j < i+2; j++) {
                    let rowArr = (j+1)%3;
                    if (boardArr[rowArr][0] === 2){
                        boardArr[rowArr][0] = 0;
                        removeMark(rowArr, 0);
                        boardArr[i][colDestination] = 2;
                        markX(i, colDestination);
                        break;
                    }
                    else if (boardArr[rowArr][1] === 2){
                        boardArr[rowArr][1] = 0;
                        removeMark(rowArr, 1);
                        boardArr[i][colDestination] = 2;
                        markX(i, colDestination);
                        break;
                    }
                    else if (boardArr[rowArr][2] === 2){
                        boardArr[rowArr][2] = 0;
                        removeMark(rowArr, 2);
                        boardArr[i][colDestination] = 2;
                        markX(i, colDestination);
                        break;
                    }
                }
            }

            function moveComputerMark_V(colDestination, i) {
                for (let j = i; j < i+2; j++) {
                    let rowArr = (j+1)%3;
                    if (boardArr[0][rowArr] === 2) {
                        boardArr[0][rowArr] = 0;
                        removeMark(0, rowArr);
                        boardArr[colDestination][i] = 2;
                        markX(colDestination, i);
                        break;
                    } else if (boardArr[1][rowArr] === 2) {
                        boardArr[1][rowArr] = 0;
                        removeMark(1, rowArr);
                        boardArr[colDestination][i] = 2;
                        markX(colDestination, i);
                        break;
                    } else if (boardArr[2][rowArr] === 2) {
                        boardArr[2][rowArr] = 0;
                        removeMark(2, rowArr);
                        boardArr[colDestination][i] = 2;
                        markX(colDestination, i);
                        break;
                    }
                }
            }
        }

        // Diagonal Win Checker ---------------------------------------------------------------------
        // D-Top
        // D-Mid
        // D-Bottom
        for (let i = 0; i < 2; i++) {
            if (boardArr[0][i + i] === 0 && boardArr[1][1] === 2 && boardArr[2][2 - i * 2] === 2){
                moveComputerMark_D(0, i+i, (i+1)%2);
                winBlock = true;
                break;
            }
            else if (boardArr[0][i + i] === 2 && boardArr[1][1] === 0 && boardArr[2][2 - i * 2] === 2){
                moveComputerMark_D(1, 1, (i+1)%2);
                winBlock = true;
                break;
            }
            else if (boardArr[0][i + i] === 2 && boardArr[1][1] === 2 && boardArr[2][2 - i * 2] === 0){
                moveComputerMark_D(2, 2 - i * 2, (i+1)%2);
                winBlock = true;
                break;
            }

            function moveComputerMark_D(colDestination, i, start){
                if (boardArr[1][0] === 2){
                    boardArr[1][0] = 0;
                    removeMark(1, 0);
                    boardArr[colDestination][i] = 2;
                    markX(colDestination, i);
                }
                else if (boardArr[1][2] === 2){
                    boardArr[1][2] = 0;
                    removeMark(1, 2);
                    boardArr[colDestination][i] = 2;
                    markX(colDestination, i);
                }
                else {
                    for (let j = start; j < start+2; j++) {
                        if (boardArr[0][j] === 2) {
                            boardArr[0][j] = 0;
                            removeMark(0, j);
                            boardArr[colDestination][i] = 2;
                            markX(colDestination, i);
                            break;
                        } else if (boardArr[2][2 - j] === 2) {
                            boardArr[2][2-j] = 0;
                            removeMark(2, 2-j);
                            boardArr[colDestination][i] = 2;
                            markX(colDestination, i);
                            break;
                        }
                    }
                }
            }
        }

        // AI Blocking Logic -----------------------------------------------
        let goRand = false;
        let diagonalCheck = true;
        if (!winBlock) {
            // Horizontal and Vertical Checker
            // H-Right
            // H-Mid
            // H-Left
            // V-Bottom
            // V-Mid
            // V-Top
            for (let i = 0; i < 3; i++) {
                if (boardArr[i][0] === 1 && boardArr[i][1] === 1 && boardArr[i][2] === 0) {
                    blockingChallenge(i, 2, false);
                    break;
                }
                else if (boardArr[i][0] === 1 && boardArr[i][1] === 0 && boardArr[i][2] === 1) {
                    blockingChallenge(i, 1, false);
                    break;
                }
                else if (boardArr[i][0] === 0 && boardArr[i][1] === 1 && boardArr[i][2] === 1) {
                    blockingChallenge(i, 0, false);
                    break;
                }
                else if (boardArr[0][i] === 1 && boardArr[1][i] === 1 && boardArr[2][i] === 0) {
                    blockingChallenge(2, i, false);
                    break;
                }
                else if (boardArr[0][i] === 1 && boardArr[1][i] === 0 && boardArr[2][i] === 1) {
                    blockingChallenge(1, i, false);
                    break;
                }
                else if (boardArr[0][i] === 0 && boardArr[1][i] === 1 && boardArr[2][i] === 1) {
                    blockingChallenge(0, i, false);
                    break;
                }
            }

            if (diagonalCheck) {
                // Diagonal Checker ---------------------------------------------------------------------
                // D-Top
                // D-Mid
                // D-Bottom
                for (let i = 0; i < 2; i++) {
                    if (boardArr[0][i + i] === 0 && boardArr[1][1] === 1 && boardArr[2][2 - i * 2] === 1) {
                        blockingChallenge(0, i + i, false);
                        break;
                    } else if (boardArr[0][i + i] === 1 && boardArr[1][1] === 0 && boardArr[2][2 - i * 2] === 1) {
                        blockingChallenge(1, 1, false);
                        break;
                    } else if (boardArr[0][i + i] === 1 && boardArr[1][1] === 1 && boardArr[2][2 - i * 2] === 0) {
                        blockingChallenge(2, 2 - i * 2, false);
                        break;
                    }
                }
            }

            // Random Computer Move -----------------------------
            if (!goRand) {
                let endRand = false;
                for (let j = 0; j < 3; j++) {
                    for (let k = 0; k < 3; k++) {
                        if (boardArr[j][k] === 2) {
                            if (saveMarkChecker(j, k)) {
                                while (true) {
                                    const rowRand = boardArrRandom();
                                    const colRand = boardArrRandom();
                                    if (boardArr[rowRand][colRand] === 0) {
                                        boardArr[j][k] = 0;
                                        removeMark(j, k);
                                        boardArr[rowRand][colRand] = 2;
                                        markX(rowRand, colRand);
                                        endRand = true;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    if (endRand) {
                        break;
                    }
                }
            }

            function blockingChallenge(rowDestination, colDestination, blocked){
                for (let j = 0; j < 3; j++) {
                    for (let k = 0; k < 3; k++) {
                        if (boardArr[j][k] === 2){
                            if (saveMarkChecker(j, k)){
                                boardArr[j][k] = 0;
                                removeMark(j, k);
                                boardArr[rowDestination][colDestination] = 2;
                                markX(rowDestination, colDestination);
                                blocked = true;
                                goRand = true;
                                diagonalCheck = false;
                                break;
                            }
                        }
                    }
                    if (blocked) {
                        // console.log("BLOCKED")
                        break;
                    }
                }
            }

            // ensures the cell is secure when the mark is moved
            function saveMarkChecker(rowPoint, colPoint){
                let rowNeighbor1 = (rowPoint + 1) % 3;
                let rowNeighbor2 = (rowPoint + 2) % 3;
                let rowNeighbor3 = (rowPoint + 4) % 3;
                let colNeighbor1 = (colPoint + 1) % 3;
                let colNeighbor2 = (colPoint + 2) % 3;

                // Horizontal Checker --------------------------------------------------
                if (boardArr[rowPoint][colNeighbor1] === 1 && boardArr[rowPoint][colNeighbor2] === 1) return false;

                // Vertical Checker --------------------------------------------------------------
                else if (boardArr[rowNeighbor1][colPoint] === 1 && boardArr[rowNeighbor2][colPoint] === 1) return false;

                // Diagonal Checker (from left top to right bottom)
                else if (boardArr[rowNeighbor1][colNeighbor1] === 1 && boardArr[rowNeighbor2][colNeighbor2] === 1) return false;

                // Diagonal Checker (from left bottom to right top)
                else if (boardArr[rowNeighbor2][colNeighbor1] === 1 && boardArr[rowNeighbor3][colNeighbor2] === 1) return false;

                else return true;
            }

        }

        gameChecker();
    }
}

// Board Random Number (0-8) ------------------------------------------------------------

function boardArrRandom() {
    return Math.ceil(Math.random() * 10) % 3
}

// Game Checker ---------------------------------------------------------------------------

function gameChecker(){
    let gameEndStatus = false;
    // Horizontal and vertical checker -------------------------------------------------------------------
    // Player Horizontal
    // Computer Horizontal
    // Player Vertical
    // Computer Vertical
    for (let i = 0; i < 3; i++) {
        if (boardArr[i][0] === 1 && boardArr[i][1] === 1 && boardArr[i][2] === 1){
            changeHorizontalCellColor(i);
            showAbsoluteMessage('Player 1 Wins!', 1000);
            startCounter = 2;
            gameEndStatus = true;
            playerPoint++;
            break;
        }
        else if (boardArr[i][0] === 2 && boardArr[i][1] === 2 && boardArr[i][2] === 2){
            changeHorizontalCellColor(i);
            showAbsoluteMessage('Computer Wins!', 1000);
            startCounter = 1;
            gameEndStatus = true;
            computerPoint++;
            break;
        }
        else if (boardArr[0][i] === 1 && boardArr[1][i] === 1 && boardArr[2][i] === 1){
            changeVerticalCellColor(i);
            showAbsoluteMessage('Player 1 Wins!', 1000);
            startCounter = 2;
            gameEndStatus = true;
            playerPoint++;
            break;
        }
        else if (boardArr[0][i] === 2 && boardArr[1][i] === 2 && boardArr[2][i] === 2){
            changeVerticalCellColor(i);
            showAbsoluteMessage('Computer Wins!', 1000);
            startCounter = 1;
            gameEndStatus = true;
            computerPoint++;
            break;
        }
    }

    function changeHorizontalCellColor(i){
        if (i === 0){
            cell1.style.color = '#4df163';
            cell2.style.color = '#4df163';
            cell3.style.color = '#4df163';
        } else if (i === 1){
            cell4.style.color = '#4df163';
            cell5.style.color = '#4df163';
            cell6.style.color = '#4df163';
        } else if (i === 2){
            cell7.style.color = '#4df163';
            cell8.style.color = '#4df163';
            cell9.style.color = '#4df163';
        }
    }
    function changeVerticalCellColor(i){
        if (i === 0){
            cell1.style.color = '#4df163';
            cell4.style.color = '#4df163';
            cell7.style.color = '#4df163';
        } else if (i === 1){
            cell2.style.color = '#4df163';
            cell5.style.color = '#4df163';
            cell8.style.color = '#4df163';
        } else if (i === 2){
            cell3.style.color = '#4df163';
            cell6.style.color = '#4df163';
            cell9.style.color = '#4df163';
        }
    }

    // Diagonal Checker ---------------------------------------------------------------------------
    if (!gameEndStatus){
        for (let i = 0; i < 2; i++) {
            if (boardArr[0][i+i] === 1 && boardArr[1][1] === 1 && boardArr[2][2-i*2] === 1){
                changeDiagonalColor(i);
                showAbsoluteMessage('Player 1 Wins!', 1000);
                disableCells();
                startCounter = 2;
                gameEndStatus = true;
                playerPoint++;
                break
            }
            else if (boardArr[0][i+i] === 2 && boardArr[1][1] === 2 && boardArr[2][2-i*2] === 2){
                changeDiagonalColor(i);
                showAbsoluteMessage('Computer Wins!', 1000);
                disableCells();
                startCounter = 1;
                gameEndStatus = true;
                computerPoint++;
                break
            }
        }
    }

    function changeDiagonalColor(i){
        if (i === 0){
            cell1.style.color = '#4df163';
            cell5.style.color = '#4df163';
            cell9.style.color = '#4df163';
        }
        else if (i === 1){
            cell3.style.color = '#4df163';
            cell5.style.color = '#4df163';
            cell7.style.color = '#4df163';
        }
    }

    // Game Not END !!!
    if (!gameEndStatus && gameEnd !== 9) {
        gameCounterTurn++;
        changeGameTurnText();
        if (gameCounterTurn % 2 === 0) {
            setTimeout(function (){
                if (gameChallenge === "challenge" && challengeCounter === 6) challengeModLogic();
                else computerLogic();
            }, 500);

        }
    }
    // DRAW !!!
    else if (!gameEndStatus && gameEnd === 9) {
        showAbsoluteMessage('Draw!', 1000);
        disableCells();
        gameEndStatus = true;
    }

    setTimeout(function (){
        if (gameEndStatus && ++currentRound < totalRound){
            gameResetRound();
        } else if (gameEndStatus && ++currentRound >= totalRound){
            localStorage.clear();
            localStorage.setItem('gameMode', gameMode);
            localStorage.setItem('player1Point', playerPoint.toString());
            localStorage.setItem('player2Point', computerPoint.toString());
            localStorage.setItem('player2Name', 'Computer')
            window.location.href = 'resultView.html';
            setTimeout(function (){
                window.location.reload();
            },1000);
        }
    }, 2000);

}

// Reset Round ------------------------------------------------------------------------
function gameResetRound(){
    boardArr = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    gameEnd = 0;
    challengeCounter = 0;

    showCurrentRound(currentRound + 1)
    resetCells();
}

function disableCells() {
    cell1.style.pointerEvents = 'none';
    cell2.style.pointerEvents = 'none';
    cell3.style.pointerEvents = 'none';
    cell4.style.pointerEvents = 'none';
    cell5.style.pointerEvents = 'none';
    cell6.style.pointerEvents = 'none';
    cell7.style.pointerEvents = 'none';
    cell8.style.pointerEvents = 'none';
    cell9.style.pointerEvents = 'none';
}
function resetCells() {
    // Cell Content
    cell1.innerHTML = "";
    cell2.innerHTML = "";
    cell3.innerHTML = "";
    cell4.innerHTML = "";
    cell5.innerHTML = "";
    cell6.innerHTML = "";
    cell7.innerHTML = "";
    cell8.innerHTML = "";
    cell9.innerHTML = "";
    // Cell Color
    cell1.style.color = '#000000';
    cell2.style.color = '#000000';
    cell3.style.color = '#000000';
    cell4.style.color = '#000000';
    cell5.style.color = '#000000';
    cell6.style.color = '#000000';
    cell7.style.color = '#000000';
    cell8.style.color = '#000000';
    cell9.style.color = '#000000';

    cell1.style.pointerEvents = 'all';
    cell2.style.pointerEvents = 'all';
    cell3.style.pointerEvents = 'all';
    cell4.style.pointerEvents = 'all';
    cell5.style.pointerEvents = 'all';
    cell6.style.pointerEvents = 'all';
    cell7.style.pointerEvents = 'all';
    cell8.style.pointerEvents = 'all';
    cell9.style.pointerEvents = 'all';

    gameCounterTurn = startCounter;
    changeGameTurnText();
    if (gameCounterTurn === 2) {
        setTimeout(function (){
            computerLogic();
        }, 500);
    }
}