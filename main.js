let canvas = '';
let context = '';
let score = 0;
const widthInPixels = 300;
const heightInPixels = 600;
const widthInBlocks = 10;
const heightInBlocks = 20;
const blockWidth = widthInPixels / widthInBlocks;
const blockHeight = heightInPixels / heightInBlocks;

class GameField {
    constructor(grid, widthInBlocks, heightInBlocks) {
        this.grid = grid;
        this.widthInBlocks = widthInBlocks;
        this.heightInBlocks = heightInBlocks;
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

    rotate90deg() {
        //TODO
    }
}

function init() {
    canvas = document.getElementById("game-canvas");
    if (canvas.getContext) {
        context = canvas.getContext("2d");
        context.strokeRect(0, 0, widthInPixels, heightInPixels);
    }
}

function drawBlock(x, y) {
    context.fillRect(blockWidth * x, blockHeight * y, blockWidth - 1, blockHeight - 1);
    context.strokeRect(blockWidth * x, blockHeight * y, blockWidth - 1, blockHeight - 1);
}

init();


let field = new GameField();
field.grid = GameField.initMatrix(widthInBlocks, heightInBlocks);
// console.log(field.grid);

let pI = new Piece(0, 3, 0,
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ]
);
//TODO instantiate the other pieces

