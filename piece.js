class Piece {
    constructor(id, colPos, rowPos, coordinates, color) {
        this._id = id;
        this._colPos = colPos;
        this._rowPos = rowPos;
        this._coordinates = coordinates;
        this._color = color;
    }

    get id() {
        return this._id;
    }

    get colPos() {
        return this._colPos;
    }

    set colPos(newColPos) {
        this._colPos = newColPos;
    }

    get rowPos() {
        return this._rowPos;
    }

    set rowPos(newRowPos) {
        this._rowPos = newRowPos;
    }

    get coordinates() {
        return this._coordinates;
    }

    set coordinates(newCoordinates) {
        this._coordinates = newCoordinates;
    }

    get color() {
        return this._color;
    }

    set color(newColor) {
        this._color = newColor;
    }

    rotate() {
        let m = this.coordinates;
        console.log(m);
        let n = m.length;
        

        let a = (m) =>{
            for(let i = 0; i < m.length; i++){
                for(let j = 0; j < m.length; j++){
                    if(m[i][j]){
                        m.rowPos = i;
                        m.colPos = j;
                        return;
                    }
                }
            }
        };
        a(m);   
        

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
