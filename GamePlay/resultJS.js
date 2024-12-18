
window.onload = function (){
    if (!localStorage.getItem('player1Point')) window.location.href = '../index.html';
}


// Get From local storage -----------------------------------------
const gameMode = localStorage.getItem('gameMode');
const player2Point = localStorage.getItem('player2Point');
const player1Point = localStorage.getItem('player1Point');
const player2Name = localStorage.getItem('player2Name');
const winner = document.getElementById('winnerText');

// console.log(gameMode);
// console.log(player2Point)
// console.log(player1Point)
// console.log(player2Name)
// console.log(winner)

if (parseInt(player1Point) > parseInt(player2Point)) winner.innerHTML = 'Player 1 Wins!';
else if (parseInt(player1Point) < parseInt(player2Point) && player2Name === 'Computer') winner.innerHTML = 'Computer Wins!';
else if (parseInt(player1Point) < parseInt(player2Point) && player2Name !== 'Computer') winner.innerHTML = 'Player 2 Wins!';
else if (parseInt(player1Point) === parseInt(player2Point)) winner.innerHTML = 'Draw!';


document.getElementById('gameModeTitle').innerHTML = gameMode;
document.getElementById('player2').innerHTML = player2Name;
document.getElementById('player1Point').innerHTML = player1Point;
document.getElementById('player2Point').innerHTML = player2Point;

document.getElementById('homeBTN').addEventListener('click', function (){
   localStorage.clear();
   window.location.href = '../index.html';
   setTimeout(function (){
       window.location.reload();
   }, 1000);
});
