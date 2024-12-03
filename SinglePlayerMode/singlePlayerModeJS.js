
// Global Variable ------------------------------------------------------------------------------------------

let gameCounterTurn = -1;
let gameEnd = 0;

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
            gameCounterTurn = 1;
            showGameTurn("Player's Turn");
            setTimeout(function (){
                rpsGameContainer.style.display = 'none';
            }, 500);
        }, 1200);
    } else if (playerRSPPoint < computerRSPPoint){
        setTimeout(function (){
            rpsGameContainer.style.opacity = '0';
            gameCounterTurn = 2;
            showGameTurn("Computer's Turn");
            setTimeout(function (){
                rpsGameContainer.style.display = 'none';
                computerLogic();
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
    if (gameCounterTurn % 2 !== 0) {
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
    console.log(boardArr);
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
            showAbsoluteMessage('Player Wins!', 3000);
            gameEndStatus = true;
            break
        }
        else if (boardArr[i][0] === 2 && boardArr[i][1] === 2 && boardArr[i][2] === 2){
            showAbsoluteMessage('Computer Wins!', 3000);
            gameEndStatus = true;
            break
        }
        else if (boardArr[0][i] === 1 && boardArr[1][i] === 1 && boardArr[2][i] === 1){
            showAbsoluteMessage('Player Wins!', 3000);
            gameEndStatus = true;
            break
        }
        else if (boardArr[0][i] === 2 && boardArr[1][i] === 2 && boardArr[2][i] === 2){
            showAbsoluteMessage('Computer Wins!', 3000);
            gameEndStatus = true;
            break
        }
    }

    // Diagonal Checker ---------------------------------------------------------------------------
    if (!gameEndStatus){
        for (let i = 0; i < 2; i++) {
            if (boardArr[0][i+i] === 1 && boardArr[1][1] === 1 && boardArr[2][2-i*2] === 1){
                showAbsoluteMessage('Player Wins!', 3000);
                gameEndStatus = true;
                break
            }
            else if (boardArr[0][i+i] === 2 && boardArr[1][1] === 2 && boardArr[2][2-i*2] === 2){
                showAbsoluteMessage('Computer Wins!', 3000);
                gameEndStatus = true;
                break
            }
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
    } else if (!gameEndStatus && gameEnd === 9) showAbsoluteMessage('Draw!', 3000);
}