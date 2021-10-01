class Storage {
    constructor(item = null, quantity = 0) {
        this._item = item;
        this._quantity = quantity;
    }

    get item() {
        return this._item;
    }
    
    get quantity() {
        return this._quantity;
    }

    get isFilled() {
        return this._item != null && this._quantity > 0;
    }
    
    set quantity(quantity) {
        this._quantity = quantity;
    }

    set item(item) {
        this._item = item;
    }

    storeItem(item, quantity) {
        this._item = item;
        this._quantity = quantity;

        return this;
    }

    removeItem(quantity) {
        const newQuantity = this._quantity - quantity;
        const removedItem = this._item;
        
        if (this._quantity > 0 && newQuantity >= 0) {
            this._quantity = this._quantity - quantity;
            
            if (newQuantity == 0) {
                this._item = null;
            }

            return removedItem;
        }

        return false;
    }

    stackItem(quantity) {
        this._quantity = this._quantity + quantity;

        return this;
    }
}