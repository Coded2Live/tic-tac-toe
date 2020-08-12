const xT ='x';
const oT = 'o';
const win = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const rstrt = document.getElementById('restartB');
const strt = document.getElementById('restartC');
let xTurn;
var xs = 0,os=0,d = 0;

startGame();
strt.addEventListener('click',rstartGame);
rstrt.addEventListener('click',startGame);

function rstartGame(){
    xs = os = d = 0;
    startGame();
}

function startGame(){
    xTurn = !xTurn;
    cellElements.forEach(cell => {
        cell.classList.remove(xT);
        cell.classList.remove(oT);
        cell.addEventListener('click',handleClick,{ once: true})
    });
    hoverClass();
    document.getElementById("winning-message").classList.remove('show');
}

function handleClick(e){
    const cell = e.target;
    const currentClass = xTurn ? xT : oT ;
   //placeMark
    placeMark(cell, currentClass);
   //check for winner
    if(checkWin(currentClass)){
        endGame(false);
    }
   //check for draw
    else if(isDraw()){
        endGame(true)
    }
   //Switch turn
    else {
    swapTurn();
    hoverClass();
    }
}
function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}
function swapTurn(){
    xTurn = !xTurn;
}
function hoverClass(){
    board.classList.remove(xT);
    board.classList.remove(oT);
    xTurn ? board.classList.add(xT):board.classList.add(oT);
}
function checkWin(currentClass) {
    return win.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
function endGame(draw){
    if(draw){
        document.querySelector('[data-winning-message-txt]').innerText = "it's draw";
        d = d + 1;
        document.querySelector('[score]').innerText = "X = "+xs+", O = "+os+", Draw = "+d;
    }else{
        document.querySelector('[data-winning-message-txt]').innerText = `${xTurn ? "X " : "O "} win this round`;
        xTurn ? xs +=1 : os += 1;
        document.querySelector('[score]').innerText = "X = "+xs+", O = "+os+", Draw = "+d;
    }  
    document.getElementById("winning-message").classList.add('show');
    
}
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(xT) || 
               cell.classList.contains(oT);
    })
}