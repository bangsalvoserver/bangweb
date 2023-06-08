function playerItemString(numPlayers, playerIndex, gridColumn, gridRow) {
    let gridColumnValue = '';
    let textAlignValue = '';
    switch (gridColumn) {
    case 0: gridColumnValue = '1 / span 2'; textAlignValue = 'center'; break;
    case 1: gridColumnValue = '1 / span 1'; textAlignValue = 'right'; break;
    case 2: gridColumnValue = '2 / span 1'; textAlignValue = 'left'; break;
    }
    return `.player-grid[num-players="${numPlayers}"] `
        + `.player-grid-item[player-index="${playerIndex}"] { `
        + `grid-column: ${gridColumnValue}; `
        + `grid-row: ${gridRow}; `
        + `z-index: ${gridRow}; `
        + `text-align: ${textAlignValue}; }`;
}

for (let numPlayers = 1; numPlayers <= 8; ++numPlayers) {
    let grid = [];
    for (let i = 0; i < Math.floor(numPlayers / 2); ++i) {
        grid.push([null, null]);
    }
    for (let playerIndex = 1; playerIndex < numPlayers; ++playerIndex) {
        let x = 1;
        let y = playerIndex - 1;
        if (y >= grid.length) {
            y = grid.length * 2 - y - 1;
            x = 0;
            if (numPlayers % 2 == 0) {
                --y;
            }
        }
        grid[y][x] = playerIndex;
    }
    for (let y=0; y<grid.length; ++y) {
        let row = grid[y];
        if (row[0] === null) {
            console.log(playerItemString(numPlayers, row[1], 0, y + 2));
        } else {
            for (let x=0; x<row.length; ++x) {
                console.log(playerItemString(numPlayers, row[x], x + 1, y + 2));
            }
        }
    }
    console.log('');
}