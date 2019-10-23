class Piece {
    constructor(id, colSpawnPoint, rowSpawnPoint, shape, color) {
        this._id = id;
        this._colSpawnPoint = colSpawnPoint;
        this._rowSpawnPoint = rowSpawnPoint;
        this._shape = shape;
        this._color = color;
    }

    get id() {
        return this._id;
    }

    get colSpawnPoint() {
        return this._colSpawnPoint;
    }

    set colSpawnPoint(newSpawnPointCol) {
        this.colSpawnPoint = newColSpawnPoint;
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

    rotate() {
        let m = this.shape;
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
    }

}