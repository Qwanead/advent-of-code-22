//         [G]         [D]     [Q]    
// [P]     [T]         [L] [M] [Z]    
// [Z] [Z] [C]         [Z] [G] [W]    
// [M] [B] [F]         [P] [C] [H] [N]
// [T] [S] [R]     [H] [W] [R] [L] [W]
// [R] [T] [Q] [Z] [R] [S] [Z] [F] [P]
// [C] [N] [H] [R] [N] [H] [D] [J] [Q]
// [N] [D] [M] [G] [Z] [F] [W] [S] [S]
//  1   2   3   4   5   6   7   8   9 

const fs = require("fs");

const boxes = {
    1: ['N', 'C', 'R', 'T', 'M', 'Z', 'P'],
    2: ['D', 'N', 'T', 'S', 'B', 'Z'],
    3: ['M', 'H', 'Q', 'R', 'F', 'C', 'T', 'G'],
    4: ['G', 'R', 'Z'],
    5: ['Z', 'N', 'R', 'H'],
    6: ['F', 'H', 'S', 'W', 'P', 'Z', 'L', 'D'],
    7: ['W', 'D', 'Z', 'R', 'C', 'G', 'M'],
    8: ['S', 'J', 'F', 'L', 'H', 'W', 'Z', 'Q'],
    9: ['S', 'Q', 'P', 'W', 'N'],
};

const getStringPart = (str, startWord, endWord = null) => {
    const startIndex = str.indexOf(startWord) + startWord.length;
    const endIndex = endWord !== null ? str.indexOf(endWord) : str.length;
    return str.slice(startIndex, endIndex).trim();
}

const move = (str) => {
    const KeyWord = {
        MOVE: 'move',
        FROM: 'from',
        TO: 'to',
    };

    const count = Number(getStringPart(str, KeyWord.MOVE, KeyWord.FROM));
    const start = Number(getStringPart(str, KeyWord.FROM, KeyWord.TO));
    const end = Number(getStringPart(str, KeyWord.TO));
    let buffer = [];
    for (let i = 0; i < count; i += 1) {
        buffer.push(boxes[start].pop());
    }
    buffer.reverse();
    boxes[end] = [...boxes[end], ...buffer];
};

let fileContent = fs.readFileSync("input", "utf8");
fileContent
    .split('\n')
    .filter((it) => it)
    .forEach(move);
console.log(Object.values(boxes).map((it) => it[it.length - 1]).join(''));
