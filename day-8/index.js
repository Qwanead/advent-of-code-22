const fs = require('fs');

const fileContent = fs.readFileSync("input", "utf8");

const transpose = (matrix) => matrix[0]
    .map((_, c) => matrix.map((__, r) => matrix[r][c]));

const isTreeVisableInRow = (index, row) => {
    const left = row.slice(0, index);
    const right = row.slice(index + 1, row.length + 1);

    return left.every((it) => it < row[index])
        || right.every((it) => it < row[index]);
}

const isTreeVisable = (col, row, grid) => {
    if (col === 0
        || row === 0
        || col === grid[row].length - 1
        || row === grid.length - 1
    ) {
        return true;
    }

    const transposedGrid = transpose(grid);
    const rowVisable = isTreeVisableInRow(col, grid[row]);
    const colVisable = isTreeVisableInRow(row, transposedGrid[col]);

    return colVisable || rowVisable;
};


const getTreeRowScore = (index, row) => {
    let leftScore = 0;
    let rightScore = 0;
    const left = row.slice(0, index).reverse();
    const right = row.slice(index + 1, row.length + 1);

    left.every((it) => {
        leftScore += 1;
        return it < row[index];
    });
    right.every((it) => {
        rightScore += 1;
        return it < row[index];
    });    

    return leftScore * rightScore;
}

const getTreeScore = (col, row, grid) => {
    const transposedGrid = transpose(grid);
    const rowScore = getTreeRowScore(col, grid[row]);
    const colVisable = getTreeRowScore(row, transposedGrid[col]);

    return colVisable * rowScore;
};

const grid = fileContent
    .split('\n')
    .filter((it) => it)
    .map((it) => it.split(''))
    .map((it) => it.map(Number));

console.log(
    grid
        .map((it, row) => it
            .map((_, col) => isTreeVisable(col, row, grid))
            .map((it) => it ? 1 : 0)
            )
        .flat(1)
        .reduce((acc, cur) => acc + cur, 0)
);

console.log(
    grid
        .map((it, row) => it
            .map((_, col) => getTreeScore(col, row, grid)))
        .flat(1)
        .sort((a, b) => b - a)[0]
);
