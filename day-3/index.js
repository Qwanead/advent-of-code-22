const fs = require("fs");

let fileContent = fs.readFileSync("input", "utf8");

const getPriorities = (char) => {
    const LOWER_A_PRIORITY = 1;
    const UPPER_A_PRIORITY = 27;
    const lowerACharCode = 'a'.charCodeAt(0);
    const upperACharCode = 'A'.charCodeAt(0);
    const charCode = char.charCodeAt(0);
    const isUpperCase = char === char.toUpperCase();
    if (isUpperCase) {
        return charCode - upperACharCode + UPPER_A_PRIORITY;
    } else {
        return charCode - lowerACharCode + LOWER_A_PRIORITY;
    }
};
// console.log(
//     fileContent
//         .split('\n')
//         .filter((it) => it)
//         .map((it) => {
//             const length = it.length;
//             const middle = Math.floor(length / 2);
//             return [it.slice(0, middle), it.slice(middle, length)]
//         })
//         .map(([left, right]) => [...left]
//             .filter((char) => right.includes(char))[0]
//         )
//         .map(getPriorities)
//         .reduce((acc, prev) => acc + prev, 0),
// );

const result = []
const arr = fileContent
    .split('\n')
    .filter((it) => it);

for (let i = 3; i < arr.length + 1; i += 3) {
    result.push([arr[i - 3], arr[i - 2], arr[i - 1]]);
}

console.log(
    result
        .map(([a, b, c]) => {
            let temp = [...a].filter((char) => b.includes(char));
            temp = [...c].filter((char) => temp.includes(char));
            return temp[0];
        })
        .map(getPriorities)
        .reduce((acc, prev) => acc + prev, 0),
);