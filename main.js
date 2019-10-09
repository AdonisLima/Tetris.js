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

//The x represents the leftmost block of the piece to be rendered
//The y represents the uppermost block of the piece to be rendered
class Piece {
    constructor(id, x, y, shape, color) {
        this._id = id;
        this._x = x;
        this._y = y;
        this._shape = shape;
        this._color = color;
    }

    get id() {
        return this._id;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
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


//Draws a single block given the coordinates x and y
//TODO use rest operator
function drawBlock(x, y) {
    context.fillRect(blockWidth * x, blockHeight * y, blockWidth - 1, blockHeight - 1);
    context.strokeRect(blockWidth * x, blockHeight * y, blockWidth - 1, blockHeight - 1);
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
    [1, 1, 1, 1],
    '#27E2F4'//Light blue
);

let pJ = new Piece(1, 3, 0,
    [2, 0, 0, 2, 2, 2],
    '#1701FE' //Dark Blue
);

let pL = new Piece(2, 3, 0,
    [0, 0, 3, 3, 3, 3],
    '#E46F02' //Orange
);

let pO = new Piece(3, 3, 0,
    [0, 4, 4, 0, 4, 4],
    '#F4D800' //Yellow
);

let pS = new Piece(4, 3, 0,
    [0, 5, 5, 5, 5, 0],
    '#7BF800' //Green
);

let pZ = new Piece(5, 3, 0,
    [6, 6, 0, 0, 6, 6],
    '#D40D3A' //Red
);

let pT = new Piece(6, 3, 0,
    [0, 5, 0, 5, 5, 5],
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

//TODO draw the first piece and put it in the array
function spawnTetro(tetro) {
    current = tetro;
    let dataLength = current.shape.length;
    let posX = current.x;
    let posY = current.y;
    console.log(dataLength);

    // x ~ j ~ row
    //y ~ i ~ col
    //TODO draw any piece with that 

    let j = 0;
    let x = 0;
    for (let i = 0; i < dataLength; i++) {
        console.log(x, j);
        if (current.shape[i]) {
            drawBlock(posX + x, posY + j);
        }

        if ((i + 1) % (dataLength % 3 == 0 ? 3 : 4) === 0) {
            j++;
            x = 0;
        } else {
            x++;
        }

    }


    //Get the coordinates and print using the piece spawn coordinate
    // console.log(blocksCoordinates);
}

//spawnTetro(pS);
//spawnTetro(pZ);
//spawnTetro(pT);
