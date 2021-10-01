const gridObjects = {};

gridObjects["tree1"] = new GridObject({ code: "tree1", name: "Maple Tree", description: "a young maple tree" });
gridObjects["tree2"] = new GridObject({ code: "tree2", name: "Willow Tree", description: "a young willow tree" });

gridObjects["closed-chest"] = new GridObject({ code: "closed-chest", name: "Closed Chest", description: "a closed chest" });
gridObjects["opened-chest"] = new GridObject({ code: "opened-chest", name: "Opened Chest", description: "a opened chest" });

gridObjects["jar"] = new GridObject({ code: "jar", name: "Jar", description: "a golden jar" });
gridObjects["broken-jar"] = new GridObject({ code: "broken-jar", name: "Broken Jar", description: "a jar broken to pieces", walkable: true });

gridObjects["map-arrow-up"] = new GridObject({ code: "map-arrow-up", name: "Arrow up sign", description: "a arrow up sign", walkable: false });
gridObjects["map-arrow-left"] = new GridObject({ code: "map-arrow-left", name: "Arrow left sign", description: "a arrow left sign", walkable: false });
gridObjects["map-arrow-down"] = new GridObject({ code: "map-arrow-down", name: "Arrow down sign", description: "a arrow down sign", walkable: false });
gridObjects["map-arrow-right"] = new GridObject({ code: "map-arrow-right", name: "Arrow right sign", description: "a arrow right sign", walkable: false });
