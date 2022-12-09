const fs = require("fs");

let fileContent = fs.readFileSync("input", "utf8");

const isOneContainsOther = (first, second) => {
    const [a, b] = first.split('-').map(Number);
    const [x, y] = second.split('-').map(Number);

    return (a >= x && b <= y) || (x >= a && y <= b);
};

const isOneCrossOther = (first, second) => {
    const [a, b] = first.split('-').map(Number);
    const [x, y] = second.split('-').map(Number);

    return (b >= x && b <= y)
        || (x >= a && x <= b)
        || (a >= x && a <= y)
        || (y >= a && y <= b);
};

console.log(
    fileContent
        .split('\n')
        .filter((it) => it)
        .map((it) => it.split(','))
        .map(([a, b]) => isOneCrossOther(a, b) ? 1 : 0)
        .reduce((acc, prev) => acc + prev, 0),
);