class Tile {
    constructor(name, description, color, walkable = true) {
        this._name = name;
        this._description = description;
        this._color = color;
        this._walkable = walkable;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get color() {
        return this._color;
    }

    get walkable() {
        return this._walkable;
    }

    set name(name) {
        this._name = name;
    }

    set description(description) {
        this._description = description;
    }

    set color(color) {
        this._color = color;
    }

    set walkable(walkable) {
        this._walkable = walkable;
    }
}