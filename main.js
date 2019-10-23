let canvas = [];
let context = [];
let matrix = {};

let currentPiece = {};

let score = 0;
let tick = 300;
const widthInPixels = 300;
const heightInPixels = 600;
const widthInBlocks = 10;
const heightInBlocks = 20;
const blockWidth = widthInPixels / widthInBlocks;
const blockHeight = heightInPixels / heightInBlocks;

let initCanvas = () => {
    canvas = document.getElementById("game-canvas");
    if (canvas.getContext) {
        context = canvas.getContext("2d");
        // context.strokeRect(0, 0, widthInPixels, heightInPixels);
    }
};

//Inicia matrix vazia do campo do jogo.
//Retorna um objeto Gamefield
let initMatrix = () => {
    let field = new GameField((() => {
        let grid = new Array(heightInBlocks);
        for (let i = 0; i < heightInBlocks; i++) {
            grid[i] = new Array(widthInBlocks).fill(0);
        }
        return grid;
    })());

    return field;
};

//Draws a single block given the column and the row
let drawBlock = (row, col) => {
    context.fillRect(blockWidth * col, blockHeight * row, blockWidth - 1, blockHeight - 1);
};

let init = () => {
    initCanvas();
    matrix = initMatrix();
};

let pI = new Piece(1, 3, 0,
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    '#27E2F4' //Light blue
);

let pJ = new Piece(2, 3, 0,
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    '#1701FE' //Dark Blue
);

let pL = new Piece(3, 5, 0,
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
    ],
    '#E46F02' //Orange
);

let pO = new Piece(4, 3, 0,
    [
        [0, 4, 4],
        [0, 4, 4],
        [0, 0, 0]
    ],
    '#F4D800' //Yellow
);

let pS = new Piece(5, 4, 0,
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ],
    '#7BF800' //Green
);

let pZ = new Piece(6, 3, 0,
    [
        [6, 6, 0],
        [0, 6, 6],
        [0, 0, 0],
    ],
    '#D40D3A' //Red
);

let pT = new Piece(7, 4, 0,
    [
        [0, 5, 0],
        [5, 5, 5],
        [0, 0, 0],
    ],
    '#9B00FC' //Purple
);

//TODO function that randomize pieces
/*
    Random Generator
The Random Generator (also known as "random bag" or "7 bag") determines the sequence
 of tetrominoes during gameplay. One of each of the 7 tetrominoes are shuffled in a 
 "bag", and are dealt out one by one. When the bag is empty, a new one is filled 
 and shuffled.
    source: https://tetris.wiki/Tetris_Guideline
*/


let drawTetro = () => {

    let col = currentPiece.colSpawnPoint,
        row = currentPiece.rowSpawnPoint,
        tetroLength = currentPiece.shape.length,
        previousTetroColPosition = 0,
        previousTetroRowPosition = 0,
        isFirstBlockDrawn = false;

    currentCoordinates = [];

    for (let i = 0; i < tetroLength; i++) {
        for (let j = 0; j < tetroLength; j++) {
            if (currentPiece.shape[i][j]) {
                if (!isFirstBlockDrawn) {
                    drawBlock(row, col);
                    isFirstBlockDrawn = !isFirstBlockDrawn;
                } else {
                    col += (j - previousTetroColPosition);
                    row += (i - previousTetroRowPosition);
                    drawBlock(row, col);
                }

                currentCoordinates.push([row, col]);

                previousTetroColPosition = j;
                previousTetroRowPosition = i;
            }
        }
    }
};

let getCoordinates = () => {
    let col = currentPiece.colSpawnPoint,
        row = currentPiece.rowSpawnPoint,
        tetroLength = currentPiece.shape.length,
        previousTetroColPosition = 0,
        previousTetroRowPosition = 0,
        isFirstBlockIdentified = false;

    currentCoordinates = [];

    for (let i = 0; i < tetroLength; i++) {
        for (let j = 0; j < tetroLength; j++) {
            if (currentPiece.shape[i][j]) {
                if (!isFirstBlockIdentified) {
                    isFirstBlockIdentified = !isFirstBlockIdentified;
                } else {
                    col += (j - previousTetroColPosition);
                    row += (i - previousTetroRowPosition);
                }

                currentCoordinates.push([row, col]);

                previousTetroColPosition = j;
                previousTetroRowPosition = i;
            }
        }
    }
    // console.log(currentCoordinates);
    return currentCoordinates;
};

let printGrid = matrix => {
    let rows = matrix.grid.length;
    let cols = matrix.grid[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            document.write(`${matrix.grid[i][j]}`);
        }
        document.write(`</br>`);
    }
};

function newPiece() {
    currentPiece = new Piece();
    currentPiece = Object.assign(currentPiece, arr[Math.floor(Math.random() * arr.length)]);
}

//Warning: essa funcção só é destinada a Objetos Piece
function isEmpty(obj = currentPiece) {
    for (let _id in obj) {
        if (obj.hasOwnProperty(_id)) {
            return false;
        }
    }
    return true;
}

//Check if position is valid yet
//Cases: 
let isValid = (currentCoordinates) => {

};

//Check if there's no more room for the piece to move
//Edge cases: Borders
//            
let isBlocked = (currentCoordinates) => {

    for (i = 0; i < currentCoordinates.length; i++) {
        for (j = 0; j < currentCoordinates[i].length; j++) {
            if (currentCoordinates[i][j] == heightInBlocks - 1) {
                return true;
            }
        }
    }

    //TODO: TRATAMENTO PARA AS OUTRAS BORDAS

    //TODO: TRATAMENTO PARA PEÇA QUE COLIDEM COM AS ANTIGAS

    return false;
};

let clearBlock = (row, col) => {
    context.clearRect(blockWidth * col, blockHeight * row, blockWidth - 1, blockHeight - 1);
};

let clearTetro = (currentCoordinates) => {
    for (i = 0; i < currentCoordinates.length; i++) 
        clearBlock(currentCoordinates[i][0], currentCoordinates[i][1]);
};

let clearAll = () => {
    context.clearRect(1, 1, canvas.width - 2, canvas.height - 2);
};

let settleDown = (currentCoordinates) => {
    //Passar para a matriz
    for()
};

let update = () => {
    if (isEmpty()) {
        newPiece();
    } else {
        clearTetro(currentCoordinates);
    }
    currentCoordinates = getCoordinates();
    // clearAll();

    drawTetro();

    // console.log(currentCoordinates);
    // console.log(currentPiece);

    // if(!isValid()){
    //      console.log("You lose");
    //      clearTimeout(game);
    //      TODO: reset();
    // }

    currentPiece.rowSpawnPoint++;

    // console.log(currentPiece.rowSpawnPoint);
    //TODO INSERT CODE THAT CHECK IF THERE'S MORE ROOM TO SLIDE
    //Check space goes down here
    // console.log(isBlocked(currentCoordinates));
    if (isBlocked(currentCoordinates)) {
        //TODO: settleDown(currentCoordinates);
        currentPiece = {};
        // clearTetro(currentCoordinates);
        // clearInterval(game);
    }

};

init();

//Teste com todas as peças
let arr = new Array();
arr.push(pI);
arr.push(pJ);
arr.push(pL);
arr.push(pO);
arr.push(pS);
arr.push(pZ);
arr.push(pT);
console.log(arr);

clearAll();
let game = setInterval(() => update(), tick);
drawBlock(1, 1);
clearBlock(1, 1);

function printMatrixBtn() {
    document.write(`<button id="myBtn">Click me to PRINT A MATRIX</button>`);

    document.getElementById("myBtn").addEventListener("click", function () {
        printGrid(matrix);
    });
}

// printMatrixBtn();