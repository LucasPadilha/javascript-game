class Sqm {
    constructor({ x, y, tile = null, object = null, interacted = false, interactionEvent = null }) {
        this._x = x;
        this._y = y;
        this._tile = tile;
        this._object = object;
        this._interacted = interacted;
        this._interactionEvent = interactionEvent;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get tile() {
        return this._tile;
    }

    get object() {
        return this._object;
    }

    get isFilled() {
        return this._tile != null;
    }

    get hasObject() {
        return this._object != null;
    }

    get isWalkable() {
        if (this.hasObject) {
            return this._object.walkable;
        }

        return this._tile.walkable;
    }

    get interactionEvent() {
        return this._interactionEvent;
    }

    get interacted() {
        return this._interacted;
    }

    set x(x) {
        this._x = x;
    }

    set y(y) {
        this._y = y;
    }

    set tile(tile) {
        this._tile = tile;
    }

    set object(object) {
        this._object = object;
    }

    set interactionEvent(interactionEvent) {
        this._interactionEvent = interactionEvent;
    }

    set interacted(interacted) {
        this._interacted = interacted;
    }
}