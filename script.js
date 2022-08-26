const fieldElem = document.getElementById('field');
const restartElem = document.getElementById('restart');
const size = +prompt('Enter the size:');
let oStep = false;
let temp = size + 1,
    temp2 = 0;
if (size % 2) {
    temp = 1;
    temp2 = 0.5;
}
let sum = 0,
    sum2 = 0,
    sum3 = 0,
    sum4 = 0,
    sum5 = 0;
let filledCells = [];

restartElem.addEventListener('click', startNewGame);

function startNewGame() {
    location.reload();
}

for(let i = 0; i < size; i++) {
    const rowElem = document.createElement('div');
    rowElem.classList.add('row');
    filledCells[i] = [];
    for (let j = 0; j < size; j++) {
        const cellElem = document.createElement('div');
        cellElem.classList.add('cell');
        cellElem.id = `${i}${j}`; // just for me, to understand
        rowElem.appendChild(cellElem);
        cellElem.addEventListener('click', handleStep);
        function handleStep() {
            if (filledCells[i][j] == 1 || filledCells[i][j] == size + 1) return;
            if(oStep) {
                filledCells[i][j] = size + 1;
                cellElem.innerText = 'O';
                oStep = false;
            } else {
                filledCells[i][j] = 1;
                cellElem.innerText = 'X';
                oStep = true;
            }
            checkStatus();
        }
    }
    fieldElem.appendChild(rowElem);
}

function checkStatus() {
    for(let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (filledCells[i][j] != "undefined") sum += filledCells[i][j];
            if (filledCells[j][i] != "undefined") sum2 += filledCells[j][i];
            if (filledCells[i][j] != "undefined" && i === j) sum3 += filledCells[i][j];
            if (filledCells[i][j] != "undefined" && i + j === size - 1) sum4 += filledCells[i][j];
            if (filledCells[i][j] === temp) sum5 += filledCells[i][j];
        }
        if (sum === size || sum2 === size || sum3 === size || sum4 === size) {
            alert('X WINS');
            return startNewGame();
        }
        if (sum === size*(size + 1) || sum2 === size*(size + 1) || sum3 === size*(size + 1) || sum4 === size*(size + 1)) {
            alert('O WINS');
            return startNewGame();
        }
        sum = 0;
        sum2 = 0;
    }
    if (sum5 === Math.floor(size*size/2 + temp2)*temp) {
        alert('DRAW');
        return startNewGame();
    }
    sum3 = 0;
    sum4 = 0;
    sum5 = 0;
}