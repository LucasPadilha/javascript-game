class Backpack {
    constructor(size) {
        this._storage = {};

        for (var i = 0; i < size; i++) {
            this._storage[`storage${i}`] = new Storage();
        }
    }

    get storage() {
        return this._storage;
    }

    get freeStorage() {
        const freeStorage = {};

        for (const [slot, storage] of Object.entries(this._storage)) {
            if (!storage.isFilled) {
                freeStorage[slot] = storage;
            }
        }

        return freeStorage;
    }

    hasItem(itemCode) {
        for (const [slot, storage] of Object.entries(this._storage)) {
            if (storage.item && storage.item.code == itemCode) {
                return true;
            }
        }

        return false;
    }

    getItem(itemCode, quantity = 1) {
        for (const [slot, storage] of Object.entries(this._storage)) {
            if (storage.item && storage.item.code == itemCode) {
                return storage.removeItem(quantity);
            }
        }

        return false;
    }

    getStorage(storageKey) {
        if (this._storage.hasOwnProperty(storageKey)) {
            return this._storage[storageKey];
        }

        return false;
    }

    getStorageByItemCode(itemCode) {
        for (const [slot, storage] of Object.entries(this._storage)) {
            if (storage.item && storage.item.code == itemCode) {
                return this.getStorage(slot);
            }
        }

        return false;
    }

    storeItem(item, quantity = 1) {
        // Store in free storage slot
        if (!this.hasItem(item.code) || !item.stackable) {
            const firstFreeSlot = this.getStorage(Object.keys(this.freeStorage)[0]);
            firstFreeSlot.storeItem(item, quantity);
        } else { // Stack item
            const stackSlot = this.getStorageByItemCode(item.code);
            stackSlot.stackItem(quantity);
        }
    }
}