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
    constructor(id, x, y, shape) {
        this._id = id;
        this._x = x;
        this._y = y;
        this._shape = shape;
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

    set shape(shape) {
        this._shape = shape;
    }

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
// field.grid = GameField.initMatrix(widthInBlocks, heightInBlocks);
//console.log(matrix);

let pI = new Piece(0, 3, 0,
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ]
);

//TODO instantiate the other pieces

//TODO function thet randomize pieces

//TODO draw the first piece and put it in the array

function spawnTetro(tetro) {
    current = tetro;
    let rows = current.shape.length;
    let columns = current.shape[0].length;
    let posX = current.x;
    let posY = current.y;
    console.log(rows, columns);
    
    // x ~ j
    //y ~ i
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            if(current.shape[i][j]){
                //TODO DRAW BLOCKS 
                drawBlock(posX+j,posY);
            } 
        }
    }
    
}

spawnTetro(pI);
