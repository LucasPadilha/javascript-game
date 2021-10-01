const switchToGrid = ({ grid, initialX, initialY, initialDirection}) => {
    map.grid = grid;
    map.characterDirection = initialDirection;
    map.setCharacterPosition(initialX, initialY);
}

const reversibleInteraction = (gridSqm, objectStatusOn, objectStatusOff) => {
    if (gridSqm.interacted) {
        gridSqm.object = objectStatusOn;
    } else {
        gridSqm.object = objectStatusOff;
    }

    gridSqm.interacted = !gridSqm.interacted;
}

const irreversibleInteraction = (gridSqm, objectAfterInteraction) => {
    if (gridSqm.interacted) {
        return;
    }

    gridSqm.object = objectAfterInteraction;
    gridSqm.interacted = true;
}

const rewardItemInteraction = (gridSqm, rewardedItem) => {
    if (!gridSqm.interacted) {
        map.character.backpack.storeItem(rewardedItem);
    }
};

// MAP 1
grids["map1"].getSqm(24, 15).interactionEvent = function () {
    rewardItemInteraction(this, items["item2"]);
    irreversibleInteraction(this, gridObjects["opened-chest"]);

    map.changed();
};

grids["map1"].getSqm(26, 17).interactionEvent = function () {
    reversibleInteraction(this, gridObjects["opened-chest"], gridObjects["closed-chest"]);

    map.changed();
};

grids["map1"].getSqm(13, 10).interactionEvent = function () {
    irreversibleInteraction(this, gridObjects["broken-jar"]);

    map.changed();
};

grids["map1"].getSqm(19, 0).interactionEvent = function () {
    const gridSqm = this;

    switchToGrid({ grid: grids["map2"], initialX: gridSqm.x, initialY: 38, initialDirection: Map.DIRECTION_UP });
};

grids["map1"].getSqm(20, 0).interactionEvent = function () {
    const gridSqm = this;

    switchToGrid({ grid: grids["map2"], initialX: gridSqm.x, initialY: 38, initialDirection: Map.DIRECTION_UP })
};

// MAP 2
grids["map2"].getSqm(19, 39).interactionEvent = function () {
    const gridSqm = this;

    switchToGrid({ grid: grids["map1"], initialX: gridSqm.x, initialY: 1, initialDirection: Map.DIRECTION_DOWN })
};

grids["map2"].getSqm(20, 39).interactionEvent = function () {
    const gridSqm = this;

    switchToGrid({ grid: grids["map1"], initialX: gridSqm.x, initialY: 1, initialDirection: Map.DIRECTION_DOWN })
};