let canvas = [];
let context = [];
let field = [];
let current = {};
let score = 0;

const tick = 300;
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
        canvas.width = 300;
        canvas.height = 600;
    }
};

//Cria field vazia do campo do jogo.
let createField = () => {
    for(let i = 0; i < heightInBlocks; i++){
        field[i] = new Array(widthInBlocks).fill(0);
    }
};

//Draws a single block given the column and the row
let drawBlock = (row, col) => {
    context.fillStyle = current.color;
    context.fillRect(blockWidth * col, blockHeight * row, blockWidth - 1, blockHeight - 1);
};

let init = () => {
    initCanvas();
    createField();
};

let pI = new Piece(1, 3, 0,
    [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3]
    ],
    '#27E2F4' //Light blue
);

let pJ = new Piece(2, 3, 0,
    [
        [0,0],
        [1,0],
        [1,1],
        [1,2]
    ],
    '#1701FE' //Dark Blue
);

let pL = new Piece(3, 3, 0,
    [
        [0,2],
        [1,0],
        [1,1],
        [1,2],
    ],
    '#E46F02' //Orange
);

let pO = new Piece(4, 3, 0,
    [
        [0,0],
        [0,1],
        [1,0],
        [1,1],
    ],
    '#F4D800' //Yellow
);

let pS = new Piece(5, 3, 0,
    [
        [0,1],
        [0,2],
        [1,0],
        [1,1]
    ],
    '#7BF800' //Green
);

let pZ = new Piece(6, 3, 0,
    [
        [0,0],
        [0,1],
        [1,1],
        [1,2]
    ],
    '#D40D3A' //Red
);

let pT = new Piece(7, 3, 0,
    [
        [0,1],
        [1,0],
        [1,1],
        [1,2]
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

// let drawTetro = () => {

//     let col = current.colPos,
//         row = current.rowPos,
//         tetroLength = current.shape.length,
//         previousTetroColPosition = 0,
//         previousTetroRowPosition = 0,
//         isFirstBlockDrawn = false;

//     for (let i = 0; i < tetroLength; i++) {
//         for (let j = 0; j < tetroLength; j++) {
//             if (current.shape[i][j]) {
//                 if (!isFirstBlockDrawn) {
//                     drawBlock(row, col);
//                     isFirstBlockDrawn = !isFirstBlockDrawn;
//                 } else {
//                     col += (j - previousTetroColPosition);
//                     row += (i - previousTetroRowPosition);
//                     drawBlock(row, col);
//                 }

//                 previousTetroColPosition = j;
//                 previousTetroRowPosition = i;
//             }
//         }
//     }
// };

let drawTetro = () => {
    for(let i = 0; i < current.coordinates.length; i++){
        let row = current.coordinates[i][0] + current.rowPos;
        let col = current.coordinates[i][1] + current.colPos;
        console.log("Row " + row, "Col " + col);
        drawBlock(row,col);
        field[row][col] = current.id;
    }
    console.log("---");
};

// let getCoordinates = () => {
//     let col = current.colPos,
//         row = current.rowPos,
//         tetroLength = current.shape.length,
//         previousTetroColPosition = 0,
//         previousTetroRowPosition = 0,
//         isFirstBlockIdentified = false;

//     currentCoordinates = [];

//     for (let i = 0; i < tetroLength; i++) {
//         for (let j = 0; j < tetroLength; j++) {
//             if (current.shape[i][j]) {
//                 if (!isFirstBlockIdentified) {
//                     isFirstBlockIdentified = !isFirstBlockIdentified;
//                 } else {
//                     col += (j - previousTetroColPosition);
//                     row += (i - previousTetroRowPosition);
//                 }

//                 currentCoordinates.push([row, col]);

//                 previousTetroColPosition = j;
//                 previousTetroRowPosition = i;
//             }
//         }
//     }

//     return currentCoordinates;
// };

// let printGrid = field => {
//     let rows = field.length;
//     let cols = field[0].length;

//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             document.write(`${field[i][j]}`);
//         }
//         document.write(`</br>`);
//     }
// };

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
// let isValid = () => {

// };

//Check if there's no more room for the piece to move
//Edge cases: Borders
let isBlocked = () => {
    for (i = 0; i < current.coordinates.length; i++) {
        for (j = 0; j < current.coordinates[i].length; j++) {
            if (current.coordinates[i][0] == heightInBlocks - 1) {
                return true;
            }
        }
    }

    //TODO: TRATAMENTO PARA AS OUTRAS BORDAS

    //TODO: TRATAMENTO PARA PEÇA QUE COLIDE COM AS ANTIGAS,
    //1: get coordinates from the last pieces of its respective columns
    //How: get the biggest difference of each column
    return false;
};

let clearBlock = (row, col) => {
    context.clearRect(blockWidth * col, blockHeight * row, blockWidth - 1, blockHeight - 1);  
};

let clearTetro = () => {
    // current.coordinates.forEach(e => {
    //     let row = e[0] + current.rowPos;
    //     let col = e[1] + current.colPos;
    //     clearBlock(row, col);
    //     field[row][col] = 0;
    // });

    for(let i = 0; i < current.coordinates.length; i++){
        let row = current.coordinates[i][0] + current.rowPos;
        let col = current.coordinates[i][1] + current.colPos;
        clearBlock(row, col);
        field[row][col] = 0;
    }
    
};

let clearAll = () => {
    context.clearRect(1, 1, canvas.width - 2, canvas.height - 2);
};


let update = () => {
    if (isEmpty()) {
        newPiece();

    } else {
        clearTetro();
    }

    drawTetro();
    clearInterval(game);
    // clearInterval(game);
    //TODO INSERT CODE THAT CHECK IF THERE'S MORE ROOM TO SLIDE
    //Check space goes down here
    if (isBlocked(current.coordinates)) {
        // settleDown(current.coordinates);
        // current = {};
        // clearTetro(current.coordinates);
        clearInterval(game);
    }

};

init();

document.addEventListener('keydown', event => {
    if(event.keyCode == 37){
        moveLeft();
    }
    if (event.keyCode == 39) {
        moveRight();
    }
    if (event.keyCode == 40){
        moveDown();
    }
});

let moveLeft = () => {
    // clearCurrentTetro();
    clearTetro();
    current.colPos--;
    drawTetro();
};

let moveRight = () => {
    // clearCurrentTetro();
    clearTetro();
    current.colPos++;
    drawTetro();
};

let moveDown = () => {
    // clearCurrentTetro();
    clearTetro();
    current.rowPos++;
    drawTetro();
};

const movement = {
    "default": 1,
    "right": 2,
    "left": 3,
};

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

// function printMatrixBtn() {
//     // clearInterval(game);
//     document.write(`<button id="myBtn">Click me to PRINT A field</button>`);

//     document.getElementById("myBtn").addEventListener("mousedown", function () {
//         printGrid(field);
//     });
// }
// printMatrixBtn();

