
// Global Variable ------------------------------------------------------------------------------------------

let gameCounterTurn = -1;
let gameEnd = 0;
let startCounter = 0;

let playerPoint = 0;
let computerPoint = 0;

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
const gameChallenge =  localStorage.getItem('gameChallenge');
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
    if (gameCounterTurn % 2 !== 0) showGameTurn("Player's Turn");
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
            showAbsoluteMessage('Player Wins!', 1200);
            playerRSPPoint++;
        }
    }
    else if (computerChoice === 2){
        if (playerIn === 1 ) {
            showAbsoluteMessage('Player Wins!', 1200);
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
            showAbsoluteMessage('Player Wins!', 1200);
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
            showGameTurn("Player's Turn");
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
    if (gameCounterTurn % 2 !== 0 && boardArr[row][col] === 0) {
        boardArr[row][col] = 1;
        if (row === 0 && col === 0) cell1.innerHTML = "<i class='bx bx-radio-circle' ></i>";
        if (row === 0 && col === 1) cell2.innerHTML = "<i class='bx bx-radio-circle' ></i>";
        if (row === 0 && col === 2) cell3.innerHTML = "<i class='bx bx-radio-circle' ></i>";
        if (row === 1 && col === 0) cell4.innerHTML = "<i class='bx bx-radio-circle' ></i>";
        if (row === 1 && col === 1) cell5.innerHTML = "<i class='bx bx-radio-circle' ></i>";
        if (row === 1 && col === 2) cell6.innerHTML = "<i class='bx bx-radio-circle' ></i>";
        if (row === 2 && col === 0) cell7.innerHTML = "<i class='bx bx-radio-circle' ></i>";
        if (row === 2 && col === 1) cell8.innerHTML = "<i class='bx bx-radio-circle' ></i>";
        if (row === 2 && col === 2) cell9.innerHTML = "<i class='bx bx-radio-circle' ></i>";
        changeOfTurn()
    }
    // console.log(boardArr);
}

function changeOfTurn(){
    gameEnd++;
    gameChecker();
}

function computerLogic() {
    let cellBlock = false;
    if (gameCounterTurn % 2 === 0){

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

        gameEnd++;
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
            showAbsoluteMessage('Player Wins!', 1000);
            startCounter = 2;
            gameEndStatus = true;
            break
        }
        else if (boardArr[i][0] === 2 && boardArr[i][1] === 2 && boardArr[i][2] === 2){
            changeHorizontalCellColor(i);
            showAbsoluteMessage('Computer Wins!', 1000);
            startCounter = 1;
            gameEndStatus = true;
            break
        }
        else if (boardArr[0][i] === 1 && boardArr[1][i] === 1 && boardArr[2][i] === 1){
            changeVerticalCellColor(i);
            showAbsoluteMessage('Player Wins!', 1000);
            startCounter = 2;
            gameEndStatus = true;
            break
        }
        else if (boardArr[0][i] === 2 && boardArr[1][i] === 2 && boardArr[2][i] === 2){
            changeVerticalCellColor(i);
            showAbsoluteMessage('Computer Wins!', 1000);
            startCounter = 1;
            gameEndStatus = true;
            break
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
                showAbsoluteMessage('Player Wins!', 1000);
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

    if (!gameEndStatus && gameEnd !== 9) {
        gameCounterTurn++;
        changeGameTurnText();
        if (gameCounterTurn % 2 === 0) {
            setTimeout(function (){
                computerLogic();
            }, 500);

        }
    } else if (!gameEndStatus && gameEnd === 9) {
        showAbsoluteMessage('Draw!', 1000);
        disableCells();
        gameEndStatus = true;
    }

    setTimeout(function (){
        if (gameEndStatus && ++currentRound < totalRound){
            gameResetRound();
        }
    }, 2000);

}

function gameResetRound(){
    boardArr = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    gameEnd = 0;

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