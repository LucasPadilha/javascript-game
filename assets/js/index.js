const mapWrapper = document.querySelector('#map-wrapper');

const map = new Map({ grid: grids["map1"], domWrapper: mapWrapper, character: Player });

map.characterDirection = Map.DIRECTION_DOWN;
map.setCharacterPosition(24, 13);

const drawLoop = () => {
    map.draw(containers);

    requestAnimationFrame(drawLoop);
};

requestAnimationFrame(drawLoop);