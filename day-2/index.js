const fs = require("fs");
// A Rock 1
// B Paper 2
// C Scissors 3
// X lose, 0
// Y draw, 3
// Z win 6

const cost = {
    'A X': 3 + 0,
    'B X': 1 + 0,
    'C X': 2 + 0,
    'A Y': 1 + 3,
    'B Y': 2 + 3,
    'C Y': 3 + 3,
    'A Z': 2 + 6,
    'B Z': 3 + 6,
    'C Z': 1 + 6,
};

let fileContent = fs.readFileSync("input", "utf8");
console.log(fileContent
    .split('\n')
    .map((it) => cost[it])
    .filter((it) => it)
    .reduce(((acc, prev) => acc + prev), 0)
);