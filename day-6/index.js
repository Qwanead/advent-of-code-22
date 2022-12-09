const fs = require("fs");
const TARGET_LENGTH = 14;
let str = fs.readFileSync("input", "utf8");
for (let i = 0; i <= str.length - TARGET_LENGTH; i += 1) {
    if (new Set([...str.slice(i, i + TARGET_LENGTH)]).size === TARGET_LENGTH) {
        console.log(i + TARGET_LENGTH);
        break;
    }
}