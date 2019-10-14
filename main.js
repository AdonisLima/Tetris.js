let canvas = [];
let context = [];
let matrix = [];
let currentPiece = [];
let score = 0;
const widthInPixels = 300;
const heightInPixels = 600;
const widthInBlocks = 10;
const heightInBlocks = 20;
const blockWidth = widthInPixels / widthInBlocks;
const blockHeight = heightInPixels / heightInBlocks;

//TODO change all functions to arrow functions

class GameField {
    constructor(grid) {
        this._grid = grid;
    }

    get grid() {
        return this._grid;
    }

    set grid(grid) {
        this._grid = grid;
    }

    static initMatrix(widthInBlocks, heightInBlocks) {
        let grid = new Array(heightInBlocks);
        for (let i = 0; i < heightInBlocks; i++) {
            grid[i] = new Array(widthInBlocks).fill(0);
        }
        return grid;
    }
}

class Piece {
    constructor(id, colSpawnPoint, rowSpawnPoint, shape, color) {
        this._id = id;
        this._spawnPointCol = colSpawnPoint;
        this._rowSpawnPoint = rowSpawnPoint;
        this._shape = shape;
        this._color = color;
    }

    get id() {
        return this._id;
    }

    get colSpawnPoint() {
        return this._spawnPointCol;
    }

    set colSpawnPoint(newSpawnPointCol) {
        this._spawnPointCol = newSpawnPointCol;
    }

    get rowSpawnPoint() {
        return this._rowSpawnPoint;
    }

    set rowSpawnPoint(newRowSpawnPoint) {
        this._rowSpawnPoint = newRowSpawnPoint;
    }

    get shape() {
        return this._shape;
    }

    set shape(newShape) {
        this._shape = newShape;
    }

    get color() {
        return this._color;
    }

    set color(newColor) {
        this._color = newColor;
    }

    //Apply offset to the rotations
    rotate90deg() {
        //TODO
    }
}

function initCanvas() {
    canvas = document.getElementById("game-canvas");
    if (canvas.getContext) {
        context = canvas.getContext("2d");
        context.strokeRect(0, 0, widthInPixels, heightInPixels);
    }
}

//Inicia matrix vazia do campo do jogo.
//Retorna um objeto Gamefield
function initMatrix() {
    let field = new GameField((() => {
        let grid = new Array(heightInBlocks);
        for (let i = 0; i < heightInBlocks; i++) {
            grid[i] = new Array(widthInBlocks).fill(0);
        }
        return grid;
    })());

    return field;
}


//Draws a single block given the column and the row
//TODO use rest operator
function drawBlock(row, col) {
    context.fillRect(blockWidth * col, blockHeight * row, blockWidth - 1, blockHeight - 1);
    context.strokeRect(blockWidth * col, blockHeight * row, blockWidth - 1, blockHeight - 1);
}

//For testing purposes only
function testDraw() {
    document.write(`<button id="myBtn">Click me to draw a single block</button>`);
    let active = false;
    document.getElementById("myBtn").addEventListener("click", function () {
        if (!active) {
            drawBlock(1, 1);
        } else {
            context.clearRect(1, 1, widthInPixels - 2, heightInPixels - 2);
        }
        active = !active;
    });
}

function init() {
    initCanvas();
    matrix = initMatrix();
}

init();

let pI = new Piece(0, 3, 0,
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    '#27E2F4' //Light blue
);

let pJ = new Piece(1, 3, 0,
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    '#1701FE' //Dark Blue
);

let pL = new Piece(2, 5, 0,
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
    ],
    '#E46F02' //Orange
);

let pO = new Piece(3, 3, 0,
    [
        [0, 4, 4],
        [0, 4, 4],
        [0, 0, 0]
    ],
    '#F4D800' //Yellow
);

let pS = new Piece(4, 4, 0,
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ],
    '#7BF800' //Green
);

let pZ = new Piece(5, 3, 0,
    [
        [6, 6, 0],
        [0, 6, 6],
        [0, 0, 0],
    ],
    '#D40D3A' //Red
);

let pT = new Piece(6, 4, 0,
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

// function spawnTetro(tetro) {
//     current = tetro;

//     let posX = current.x;
//     let posY = current.y;
//     let dataLength = current.shape.length;

//     // x ~ j ~ row
//     //y ~ i ~ col
//     let j = 0;
//     let x = 0;
//     for (let i = 0; i < dataLength; i++) {
//         if (current.shape[i]) {
//             drawBlock(posX + x, posY + j);
//             matrix.grid[posY + j][posX + x] = current.shape[i];
//         }
//         if ((i + 1) % (dataLength % 5 == 0 ? 5 : 3) === 0) {
//             j++;
//             x = 0;
//         } else {
//             x++;
//         }
//     }
//     // drawOnCanvas(current);
// }

let rotateTetro = (tetro) => {
    let m = tetro.shape;
    console.log(m);
    let n = m.length;

    for (let i = 0; i < Math.floor(n / 2); i++) {
        for (let j = 0; j < n - (2 * i) - 1; j++) {
            let t = m[i + j][n - 1 - i]; // t = B
            m[i + j][n - 1 - i] = m[i][i + j]; //B = A
            m[i][i + j] = t; //A = t

            t = m[n - 1 - i][n - 1 - i - j];
            m[n - 1 - i][n - 1 - i - j] = m[i][i + j];
            m[i][i + j] = t;

            t = m[n - 1 - i - j][i];
            m[n - 1 - i - j][i] = m[i][i + j];
            m[i][i + j] = t;
        }
    }

    //Setar novos spawnPoints
    /* for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (tetro.shape[i][j]) {
                tetro.rowSpawnPoint = i;
                tetro.colSpawnPoint = j;

                console.log(`j: ${j} i:${i}`);

                return tetro;
            }
        }
    } */

    return tetro;

};

let spawnTetro = (tetro) => {

    current = tetro;

    let col = current.colSpawnPoint,
        row = current.rowSpawnPoint,
        tetroLength = current.shape.length,
        previousColPosition = 0,
        previousRowPosition = 0;
    let firstBlockDrawn = false;

    for (let i = 0; i < tetroLength; i++) {
        for (let j = 0; j < tetroLength; j++) {
            if (current.shape[i][j]) {
                if (!firstBlockDrawn) {

                    drawBlock(row, col);
                    firstBlockDrawn = !firstBlockDrawn;
                } else {
                    drawBlock(row = (i - previousRowPosition) + row, col = (j - previousColPosition) + col);
                }

                previousColPosition = j;
                previousRowPosition = i;


                matrix.grid[row][col] = current.shape[i][j];
            }
        }
    }
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

//spawnTetro(pI);
//spawnTetro(pJ);
//spawnTetro(pL);
// spawnTetro(pO);
// spawnTetro(pS);
//spawnTetro(pZ);
//spawnTetro(pT);

//drawBlock(0, 3);

// pJ = rotateTetro(pJ);
// spawnTetro(rotateTetro(rotateTetro(rotateTetro(rotateTetro(pJ)))));
// spawnTetro(rotateTetro(rotateTetro(rotateTetro(pJ))));
spawnTetro(pZ)


printGrid(matrix);