class Item {
    constructor({ code, name, description = null, stackable = false }) {
        this._code = code;
        this._name = name;
        this._description = description;
        this._stackable = stackable;
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

    get stackable() {
        return this._stackable;
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

    set stackable(stackable) {
        this._stackable = stackable;
    }
}