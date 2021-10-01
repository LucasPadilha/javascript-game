class Character {
    constructor(name, sex) {
        this._name = name;
        this._sex = sex;
        this._backpack = new Backpack(20);
    }

    get name() {
        return this._name;
    }

    get sex() {
        return this._sex;
    }

    get backpack() {
        return this._backpack;
    }

    set name(name) {
        this._name = name;
    }

    set sex(sex) {
        this._sex = sex;
    }

    set backpack(backpack) {
        this._backpack = backpack;
    }
}