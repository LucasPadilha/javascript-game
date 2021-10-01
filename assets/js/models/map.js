class Map {
    static get DIRECTION_UP() {
        return 0;
    }
    
    static get DIRECTION_RIGHT() {
        return 1;
    }
    
    static get DIRECTION_DOWN() {
        return 2;
    }
    
    static get DIRECTION_LEFT() {
        return 3;
    }

    constructor({ grid, domWrapper, character = null }) {
        this._grid = grid;
        this._domWrapper = domWrapper;
        this._character = character;
        this._character_x = 0;
        this._character_y = 0;
        this._character_direction = this.DIRECTION_UP;
        this._changed = false;
        this._rendered = false;
    }

    get grid() {
        return this._grid;
    }

    get domWrapper() {
        return this._domWrapper;
    }

    get character() {
        return this._character;
    }

    get characterX() {
        return this._character_x;
    }

    get characterY() {
        return this._character_y;
    }

    get characterDirection() {
        return this._character_direction;
    }

    get shouldRender() {
        return (!this._rendered || this._changed);
    }

    set grid(grid) {
        this._grid = grid;

        this.changed()
    }

    set domWrapper(domWrapper) {
        this._domWrapper = domWrapper;

        this.changed()
    }

    set character(character) {
        this._character = character;

        this.changed()
    }

    set characterX(character_x) {
        this._character_x = character_x;

        this.changed()
    }

    set characterY(character_y) {
        this._character_y = character_y;

        this.changed()
    }

    set characterDirection(character_direction) {
        this._character_direction = character_direction;

        this.changed()
    }

    draw(containers) {
        if (!this.shouldRender) {
            return;
        }

        this.applyGrid(containers["grids"]);
        this.drawMap(containers["map"]);
        this.drawGridObjects(containers["grid-objects"]);
        this.drawCharacter(containers["character"]);

        this._rendered = true;
        this._changed = false;
    }

    drawGridObjects(container) {
        if (!this.shouldRender) {
            return;
        }

        container.innerHTML = "";

        this._grid.sqms.forEach((gridSqm) => {
            if (!gridSqm.hasObject) {
                return;
            }

            const gridObject = document.createElement('div');

            gridObject.classList.add('grid-object');
            gridObject.dataset.posx = gridSqm.x;
            gridObject.dataset.posy = gridSqm.y;
            gridObject.dataset.walkable = gridSqm.object.walkable;
            gridObject.dataset.code = gridSqm.object.code;
            gridObject.dataset.name = gridSqm.object.name;
            gridObject.dataset.description = gridSqm.object.description;
            
            const pos = this.calculateGridPosition(gridSqm.x, gridSqm.y);
            gridObject.style.gridColumnStart = pos.startX;
            gridObject.style.gridRowStart = pos.startY;
            gridObject.style.gridColumnEnd = pos.endX;
            gridObject.style.gridRowEnd = pos.endY;

            container.appendChild(gridObject);
        });
    }

    drawMap(container) {
        if (!this.shouldRender) {
            return;
        }

        container.innerHTML = "";

        this._grid.sqms.forEach((gridSqm) => {
            const mapTile = document.createElement('div');

            mapTile.classList.add('map-tile');
            mapTile.dataset.posx = gridSqm.x;
            mapTile.dataset.posy = gridSqm.y;

            // Set tile properties
            if (gridSqm && gridSqm.isFilled) {
                if (gridSqm.tile.color.indexOf('#') !== -1) {
                    mapTile.style.backgroundColor = `${gridSqm.tile.color}`;
                } else {
                    mapTile.classList.add(`tile-${gridSqm.tile.color}`);
                }

                mapTile.dataset.walkable = gridSqm.tile.walkable;
                mapTile.dataset.description = gridSqm.tile.name;
                mapTile.dataset.description = gridSqm.tile.description;
            }

            container.appendChild(mapTile);
        });
    }

    drawCharacter(container) {
        if (!this.shouldRender || !this._character) {
            return;
        }

        let characterEl = container.querySelector('.character');
        if (characterEl == null) {
            characterEl = document.createElement('div');
            characterEl.classList.add('character');
        }

        const sexClass = new RegExp(/\bsex-.+?\b/, 'g');
        if (characterEl.className.match(sexClass)) {
            characterEl.className = characterEl.className.replace(sexClass, '');
        }

        characterEl.classList.add(`sex-${this._character.sex}`);

        const pos = this.calculateGridPosition(this._character_x, this._character_y);
        characterEl.style.gridColumnStart = pos.startX;
        characterEl.style.gridRowStart = pos.startY;
        characterEl.style.gridColumnEnd = pos.endX;
        characterEl.style.gridRowEnd = pos.endY;

        const directionClass = new RegExp(/\bfacing-.+?\b/, 'g');
        if (characterEl.className.match(directionClass)) {
            characterEl.className = characterEl.className.replace(directionClass, '');
        }

        switch (this._character_direction) {
            case Map.DIRECTION_UP:
                characterEl.classList.add('facing-up');
                break;
            case Map.DIRECTION_RIGHT:
                characterEl.classList.add('facing-right');
                break;
            case Map.DIRECTION_DOWN:
                characterEl.classList.add('facing-down');
                break;
            case Map.DIRECTION_LEFT:
                characterEl.classList.add('facing-left');
                break;
        }

        container.appendChild(characterEl);
    }

    applyGrid(containers) {
        const sqmSize = this._domWrapper.offsetWidth / this._grid.size;

        containers.forEach((container) => {
            container.style.gridTemplateColumns = `repeat(${this._grid.size}, ${sqmSize}px)`;
            container.style.gridTemplateRows = `repeat(${this._grid.size}, ${sqmSize}px)`;
        });
    }

    setCharacterPosition(X, Y) {
        const targetSqm = this._grid.getSqm(X, Y);
        
        if (targetSqm.isWalkable) {
            this._character_x = X;
            this._character_y = Y;
        }

        this.changed()
    }

    calculateNewPosition(direction) {
        const pos = {
            X: 0,
            Y: 0
        };

        if (direction == Map.DIRECTION_UP) {
            const newY = ((this._character_y - 1) >= 0 ? this._character_y - 1 : this._character_y);

            pos.X = this._character_x;
            pos.Y = newY;
        } else if (direction == Map.DIRECTION_RIGHT) {
            const newX = ((this._character_x + 1) < this._grid.size ? this._character_x + 1 : this._character_x);

            pos.X = newX;
            pos.Y = this._character_y;
        } else if (direction == Map.DIRECTION_DOWN) {
            const newY = ((this._character_y + 1) < this._grid.size ? this._character_y + 1 : this._character_y);

            pos.X = this._character_x;
            pos.Y = newY;
        } else if (direction == Map.DIRECTION_LEFT) {
            const newX = ((this._character_x - 1) >= 0 ? this._character_x - 1 : this._character_x);

            pos.X = newX;
            pos.Y = this._character_y;
        }

        return pos;
    }

    calculateGridPosition(X, Y) {
        return {
            startX: X + 1,
            startY: Y + 1,
            endX: X + 2,
            endY: Y + 2,
        };
    }

    changed() {
        this._changed = true;
    }

    move(direction) {
        const newPosition = this.calculateNewPosition(direction);

        this.setCharacterPosition(newPosition.X, newPosition.Y);
        this._character_direction = direction;
        this.changed()
    }

    rotate() {
        if (this._character_direction < Map.DIRECTION_LEFT) {
            this._character_direction = this._character_direction + 1;
        } else {
            this._character_direction = Map.DIRECTION_UP;
        }

        this.changed()
    }

    look() {
        const lookingAtPosition = this.calculateNewPosition(this._character_direction);

        const gridSqm = this._grid.getSqm(lookingAtPosition.X, lookingAtPosition.Y);

        if (gridSqm.hasObject) {
            return alert(`You see ${gridSqm.object.description}`);
        }

        if (gridSqm.isFilled) {
            return alert(`You see ${gridSqm.tile.description}`);
        }
    }

    interact() {
        const lookingAtPosition = this.calculateNewPosition(this._character_direction);

        const gridSqm = this._grid.getSqm(lookingAtPosition.X, lookingAtPosition.Y);

        if (typeof gridSqm.interactionEvent != 'function') {
            return;
        }

        return gridSqm.interactionEvent();
    }
}