let canvas = [];
let context = [];
let field = [];
let current = [];
let score = 0;
let lose = false;
let randomBag = [];
let randomBagIndex = 0;

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
let initField = () => {
    for (let i = 0; i < heightInBlocks; i++)
        field[i] = new Array(widthInBlocks).fill(0);
};

//Draws a single block given the column and the row
let drawBlock = (row, col) => {
    context.fillStyle = current.color;
    context.fillRect(blockWidth * col, blockHeight * row, blockWidth - 1, blockHeight - 1);
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
        [0, 0],
        [1, 0],
        [1, 1],
        [1, 2]
    ],
    '#1701FE' //Dark Blue
);

let pL = new Piece(3, 3, 0,
    [
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
    ],
    '#E46F02' //Orange
);

let pO = new Piece(4, 3, 0,
    [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
    ],
    '#F4D800' //Yellow
);

let pS = new Piece(5, 3, 0,
    [
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1]
    ],
    '#7BF800' //Green
);

let pZ = new Piece(6, 3, 0,
    [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2]
    ],
    '#D40D3A' //Red
);

let pT = new Piece(7, 3, 0,
    [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, 2]
    ],
    '#9B00FC' //Purple
);

let drawTetro = () => {
    for (let i = 0; i < current.coordinates.length; i++) {
        let row = current.coordinates[i][0] + current.startRowPos;
        let col = current.coordinates[i][1] + current.startColPos;
        drawBlock(row, col);
    }
};

let newPiece = () => {
    current = new Piece();
    current = Object.assign(current, getNewPieceFromRandomBag());
}

let fillRandomBag = () => {
    let bag = new Array();
    if (randomBag.length == 0) {
        randomBag.push(pI);
        randomBag.push(pJ);
        randomBag.push(pL);
        randomBag.push(pO);
        randomBag.push(pS);
        randomBag.push(pZ);
        randomBag.push(pT);
    }
    shuffleBag();
    console.log(randomBag);
};

let shuffleBag = () => {
    for (let i = randomBag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomBag[i], randomBag[j]] = [randomBag[j], randomBag[i]];
    }
};

let getNewPieceFromRandomBag = () => {
    if(randomBagIndex == 7 || randomBag.length == 0){
        fillRandomBag();
        randomBagIndex = 0;
    }

    let piece = randomBag[randomBagIndex++];
    return piece;
}

let isEmpty = (obj = current) => {
    for (let _id in obj)
        if (obj.hasOwnProperty(_id))
            return false;

    return true;
}

let clearBlock = (row, col) => {
    context.clearRect(blockWidth * col, blockHeight * row, blockWidth - 1, blockHeight - 1);
};

let clearTetro = () => {
    for (let i = 0; i < current.coordinates.length; i++) {
        let row = current.coordinates[i][0] + current.startRowPos;
        let col = current.coordinates[i][1] + current.startColPos;
        clearBlock(row, col);
        field[row][col] = 0;
    }
};

let clearCanvas = () => {
    context.clearRect(1, 1, canvas.width - 2, canvas.height - 2);
};

let clearField = () => {
    field = [];
};

document.addEventListener('keydown', event => {
    if (!lose) {
        if (event.keyCode == 38) {
            rotate();
        } else if (event.keyCode == 37) {
            moveLeft();
        } else if (event.keyCode == 39) {
            moveRight();
        } else if (event.keyCode == 40) {
            moveDown();
        }
    }
});

let moveLeft = () => {
    let hasRoom = true;
    for (let coordinate of current.coordinates) {
        let col = coordinate[1] + current.startColPos;
        if (col == 0) {
            hasRoom = false;
            break;
        }
    }

    //Check for collision to the left
    for (let i = 0; i < current.coordinates.length; i++) {
        let row = current.coordinates[i][0] + current.startRowPos;
        let col = current.coordinates[i][1] + current.startColPos;
        if (field[row][col - 1] != 0) {
            hasRoom = false;
        }
    }

    if (hasRoom) {
        clearTetro();
        current.startColPos--;
        drawTetro();
    }

};

let moveRight = () => {
    let hasRoom = true;
    for (let coordinate of current.coordinates) {
        let col = coordinate[1] + current.startColPos;
        if (col == widthInBlocks - 1) {
            hasRoom = false;
            break;
        }
    }

    //Check for collision to the right
    for (let i = 0; i < current.coordinates.length; i++) {
        let row = current.coordinates[i][0] + current.startRowPos;
        let col = current.coordinates[i][1] + current.startColPos;
        if (field[row][col + 1] != 0) {
            hasRoom = false;
        }
    }

    //Check for collision with another tetros
    if (hasRoom) {
        clearTetro();
        current.startColPos++;
        drawTetro();
    }
};

let moveDown = () => {
    let hasReachedBottom = false;
    for (let coordinate of current.coordinates) {
        let row = coordinate[0] + current.startRowPos;
        if (row == heightInBlocks - 1)
            hasReachedBottom = true;
    }

    //Check for collision below
    let isCollidedBelow = false;
    if (!hasReachedBottom) {
        for (let i = 0; i < current.coordinates.length; i++) {
            let row = current.coordinates[i][0] + current.startRowPos;
            let col = current.coordinates[i][1] + current.startColPos;
            if (field[row + 1][col] != 0) {
                isCollidedBelow = true;
            }
        }
    }

    if (!hasReachedBottom && !isCollidedBelow) {
        clearTetro();
        current.startRowPos++;
        drawTetro();
    }
    if (isCollidedBelow || hasReachedBottom) {
        settleDown();
        checkForFilledRows();
        current = [];
    }
};

let checkForFilledRows = () => {
    let filledRows = getFilledRows();
    if (filledRows.length > 0) {
        realocateTetros(filledRows);
        redrawField();
    }
};

let realocateTetros = (filledRows) => {
    let filtered = field.filter((value, index, arr) =>
        arr[index].some(elem => elem == 0));
    for (let i = 0; i < filledRows.length; i++)
        filtered.unshift(new Array(widthInBlocks).fill(0));
    field = filtered;
    console.log(field);
};


let redrawField = () => {
    clearCanvas();
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            context.fillStyle = (() => {
                for (let piece of randomBag) {
                    if (piece.id == field[i][j]) {
                        return piece.color;
                    }
                }
                return "#ffffff";
            })();
            context.fillRect(blockWidth * j, blockHeight * i, blockWidth - 1, blockHeight - 1);
        }
    }
};

let getFilledRows = () => {
    let filledRows = [];
    for (let i = 0; i < field.length; i++) {
        let isFilled = true;
        for (let j = 0; j < field[0].length; j++) {
            if (field[i][j] == 0) {
                isFilled = false;
                break;
            }
        }
        if (isFilled) filledRows.push(i);
    }
    return filledRows;
};

let settleDown = () => {
    for (let i = 0; i < current.coordinates.length; i++) {
        let row = current.coordinates[i][0] + current.startRowPos;
        let col = current.coordinates[i][1] + current.startColPos;
        field[row][col] = current.id;
    }
};

let rotate = () => {
    let rotatedTetro = new Piece();
    rotatedTetro = Object.assign(rotatedTetro, current);
    let newCoordinates = [];

    current.coordinates.forEach((coord, i) => {
        let row = coord[0];
        let col = coord[1];
        let newRowCoord = getLastSquareRow() - col;
        let newColCoord = row;
        newCoordinates.push([newRowCoord, newColCoord]);
    });

    if (areCoordinatesValid(newCoordinates)) {
        rotatedTetro.coordinates = newCoordinates;
        clearTetro();
        current = rotatedTetro;
        drawTetro();
    }
};

let areCoordinatesValid = (newCoordinates) => {
    for (let coord of newCoordinates) {
        let row = coord[0] + current.startRowPos;
        let col = coord[1] + current.startColPos;
        if (row < 0) return false;
        if (row > 19) return false;
        if (col < 0) return false;
        if (col > 9) return false;
        if (field[row][col] != 0) return false;
    }
    return true;
};

let getLastSquareRow = () => {
    let lastRow = 0;
    current.coordinates.forEach(coord => {
        if (coord[0] > lastRow) lastRow = coord[0];
    });
    return lastRow;
};

let isSpawnAreaOcuppied = () => {
    for (let coord of current.coordinates) {
        let row = coord[0] + current.startRowPos;
        let col = coord[1] + current.startColPos;
        if (field[row][col] != 0) return true;
    }
    return false;
};

let loseGame = () => {
    // clearCanvas();
    clearField();
    clearInterval(game);
    document.write("You lose. Refresh to play again.");
};

let setup = () => {
    initCanvas();
    initField();
};

let update = () => {
    if (isEmpty()) {
        newPiece();
        if (isSpawnAreaOcuppied()) {
            loseGame();
        } else drawTetro();
    } else {
        moveDown();
    }
};

setup();
let game = setInterval(update, tick);