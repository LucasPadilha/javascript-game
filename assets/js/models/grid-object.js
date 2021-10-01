class GridObject {
    constructor({ code, name, description = null, walkable = false }) {
        this._code = code;
        this._name = name;
        this._description = description;
        this._walkable = walkable;
    }

    get code() {
        return this._code;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get walkable() {
        return this._walkable;
    }

    set code(code) {
        this._code = code;
    }

    set name(name) {
        this._name = name;
    }

    set description(description) {
        this._description = description;
    }

    set walkable(walkable) {
        this._walkable = walkable;
    }
}