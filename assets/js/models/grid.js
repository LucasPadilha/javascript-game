class Grid {
    constructor({ size }) {
        this._size = size;
        
        this.setup();
    }

    get size() {
        return this._size;
    }

    get sqms() {
        const orderedSqms = Object.values(this._sqms).sort((a, b) => {
            if (a.y < b.y) {
                return -1;
            }

            if (a.y > b.y) {
                return 1;
            }

            return 0;
        });

        return orderedSqms;
    }

    set size(size) {
        this._size = size;

        this.setup();
    }

    setup() {
        this._sqms = {};

        for (let x = 0; x < this._size; x++) {
            for (let y = 0; y < this._size; y++) {
                this._sqms[`${x}_${y}`] = new Sqm({ x, y });
            }
        }
    }

    getSqm(x, y) {
        if (this._sqms.hasOwnProperty(`${x}_${y}`)) {
            return this._sqms[`${x}_${y}`];
        }

        return false;
    }
}