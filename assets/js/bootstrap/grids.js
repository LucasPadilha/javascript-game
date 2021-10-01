const grids = {};

grids["map1"] = new Grid({ size: 40 });
grids["map2"] = new Grid({ size: 40 });

// map1 grid setup

// top-left corner
for (let x = 0; x < 19; x++) {
    for (let y = 0; y < 19; y++) {
        grids["map1"].getSqm(x, y).tile = tiles["grass"];
    }
}

// bottom-left corner
for (let x = 0; x < 19; x++) {
    for (let y = 21; y < 40; y++) {
        grids["map1"].getSqm(x, y).tile = tiles["grass"];
    }
}

// bottom-right corner
for (let x = 21; x < 40; x++) {
    for (let y = 21; y < 40; y++) {
        grids["map1"].getSqm(x, y).tile = tiles["grass"];
    }
}

// top-right corner
for (let x = 21; x < 40; x++) {
    for (let y = 0; y < 19; y++) {
        grids["map1"].getSqm(x, y).tile = tiles["grass"];

        if (y > 4 && y < 14) {
            if (x > 25 && x < 35) {
                grids["map1"].getSqm(x, y).tile = tiles["water"];
            }
        }
    }
}

// dirt paths
for (let x = 19; x < 21; x++) {
    for (let y = 0; y < 40; y++) {
        grids["map1"].getSqm(x, y).tile = tiles["dirt"];
    }
}

for (let y = 19; y < 21; y++) {
    for (let x = 0; x < 40; x++) {
        grids["map1"].getSqm(x, y).tile = tiles["dirt"];
    }
}

// end map1 grid setup

// map2 grid setup

for (let x = 0; x < 40; x++) {
    for (let y = 0; y < 40; y++) {
        grids["map2"].getSqm(x, y).tile = tiles["grass"];
    }
}

// dirt path
for (let y = 0; y < 40; y++) {
    grids["map2"].getSqm(19, y).tile = tiles["dirt"];
    grids["map2"].getSqm(20, y).tile = tiles["dirt"];
}

// end map2 grid setup

