let canvas = [];
let context = [];
let field = {};
// let colSpawnPoint = 0;
// let rowSpawnPoint = 3;
let current = {};

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

//Inicia field vazia do campo do jogo.
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
    context.fillStyle = current.color;
    context.fillRect(blockWidth * col, blockHeight * row, blockWidth - 1, blockHeight - 1);
};

let init = () => {
    initCanvas();
    field = initMatrix();
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

    let col = current.colSpawnPoint,
        row = current.rowSpawnPoint,
        tetroLength = current.shape.length,
        previousTetroColPosition = 0,
        previousTetroRowPosition = 0,
        isFirstBlockDrawn = false;

    for (let i = 0; i < tetroLength; i++) {
        for (let j = 0; j < tetroLength; j++) {
            if (current.shape[i][j]) {
                if (!isFirstBlockDrawn) {
                    drawBlock(row, col);
                    isFirstBlockDrawn = !isFirstBlockDrawn;
                } else {
                    col += (j - previousTetroColPosition);
                    row += (i - previousTetroRowPosition);
                    drawBlock(row, col);
                }

                previousTetroColPosition = j;
                previousTetroRowPosition = i;
            }
        }
    }
};

let getCoordinates = () => {
    let col = current.colSpawnPoint,
        row = current.rowSpawnPoint,
        tetroLength = current.shape.length,
        previousTetroColPosition = 0,
        previousTetroRowPosition = 0,
        isFirstBlockIdentified = false;

    currentCoordinates = [];

    for (let i = 0; i < tetroLength; i++) {
        for (let j = 0; j < tetroLength; j++) {
            if (current.shape[i][j]) {
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

    return currentCoordinates;
};

let printGrid = field => {
    let rows = field.grid.length;
    let cols = field.grid[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            document.write(`${field.grid[i][j]}`);
        }
        document.write(`</br>`);
    }
};

function newPiece() {
    current = new Piece();
    current = Object.assign(current, arr[Math.floor(Math.random() * arr.length)]);
}

//Warning: essa funcção só é destinada a Objetos Piece
function isEmpty(obj = current) {
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
let isBlocked = (currentCoordinates) => {
    for (i = 0; i < currentCoordinates.length; i++) {
        for (j = 0; j < currentCoordinates[i].length; j++) {
            if (currentCoordinates[i][0] == heightInBlocks - 1) {
                return true;
            }
        }
    }

    //TODO: TRATAMENTO PARA AS OUTRAS BORDAS

    //TODO: TRATAMENTO PARA PEÇA QUE COLIDE COM AS ANTIGAS,
    //1: get coordinates from the last pieces of its respective columns
    //How: get the biggest difference of each column
    let bottommostBlocks = [[0,0]];
    let count = 0;
    currentCoordinates.forEach((elem) => {
        if(elem[0] > bottommostBlocks[count][0]){
            bottommostBlocks.pop();
            bottommostBlocks.push(elem);
        }
    });


    return false;
};

let clearBlock = (row, col) => {
    context.clearRect(blockWidth * col, blockHeight * row, blockWidth - 1, blockHeight - 1);
};

let clearTetro = currentCoordinates => {
    for (i = 0; i < currentCoordinates.length; i++)
        clearBlock(currentCoordinates[i][0], currentCoordinates[i][1]);
};

let clearAll = () => {
    context.clearRect(1, 1, canvas.width - 2, canvas.height - 2);
};

let settleDown = currentCoordinates => {
    currentCoordinates.forEach((item) => {
        field.grid[item[0]][item[1]] = current.id;
    });
};

let update = () => {
    if (isEmpty()) {
        newPiece();
        
    } else {
        clearTetro(currentCoordinates);
    }

    
    currentCoordinates = getCoordinates();
    drawTetro();

    // if(!isValid()){
    //      console.log("You lose");
    //      clearTimeout(game);
    //      TODO: reset();
    // }

    
    settleDown(currentCoordinates);

    current.rowSpawnPoint++;

    //TODO INSERT CODE THAT CHECK IF THERE'S MORE ROOM TO SLIDE
    //Check space goes down here
    if (isBlocked(currentCoordinates)) {
        settleDown(currentCoordinates);
        // current = {};
        // clearTetro(currentCoordinates);
         clearInterval(game);
    }

};

init();

// document.addEventListener('keydown', event => {
//     if(event.keyCode == 37){
//         //moveLeft();
//     }    
//     if (event.keyCode == 39) {
//         //moveRight();
//     }
//     console.log(event);
// });


//Teste com todas as peças
let arr = new Array();
arr.push(pI);
arr.push(pJ);
arr.push(pL);
arr.push(pO);
arr.push(pS);
arr.push(pZ);
arr.push(pT);

clearAll();
let game = setInterval(update, tick);

function printMatrixBtn() {
    document.write(`<button id="myBtn">Click me to PRINT A field</button>`);

    document.getElementById("myBtn").addEventListener("click", function () {
        printGrid(field);
    });
}
printMatrixBtn();
