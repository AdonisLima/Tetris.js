class Piece {
    constructor(id, startColPos, startRowPos, coordinates, color) {
        this._id = id;
        this._startColPos = startColPos;
        this._startRowPos = startRowPos;
        this._coordinates = coordinates;
        this._color = color;
    }

    get id() {
        return this._id;
    }

    get startColPos() {
        return this._startColPos;
    }

    set startColPos(newStartColPos) {
        this._startColPos = newStartColPos;
    }

    get startRowPos() {
        return this._startRowPos;
    }

    set startRowPos(newStartRowPos) {
        this._startRowPos = newStartRowPos;
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
    
}
