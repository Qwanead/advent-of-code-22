const fs = require("fs");

let fileContent = fs.readFileSync("input", "utf8");
const [a, b, c] =
    fileContent
        .split('\n\n')
        .map((arr) => arr.split('\n')
            .map((it) => Number(it)))
        .map((arr) => arr.reduce((acc, prev) => acc + prev), 0)
        .sort((a, b) => b - a);
console.log(a + b + c);