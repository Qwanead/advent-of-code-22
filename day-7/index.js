const fs = require("fs");
const FileSystem = require('./FileSystem');

let fileContent = fs.readFileSync("input", "utf8");

const arr = fileContent
    .split('\n')
    .filter((it) => it);

const execute = (command, name, fileSystem) => {
    switch (command) {
        case 'cd':
            if (name !== '..' && name !== '/' && !fileSystem.isDirExist(name)) {
                fileSystem.mkDir(name);
            }
            fileSystem.cd(name);
            break;
        case 'ls':
            break;
        case 'dir':
            if (!fileSystem.isDirExist(name)) {
                fileSystem.mkDir(name);
            }
            break;
        default:
            const size = Number(command);
            if (Number.isNaN(size)) {
                throw Error(`Unkown command: "${command}"`);
            }
            if (!fileSystem.isFileExist(name)) {
                fileSystem.touch(name, size);
            }
    }
}

const parseInput = (str, fileSystem) => {
    if (str.startsWith('$ ')) {
        const [_, command, name] = str.split(' ');
        execute(command, name, fileSystem);
    } else {
        const [size, name] = str.split(' ');
        execute(size, name, fileSystem);
    }

};

const DISK_SPACE = 70000000;
const UPDATE_SIZE = 30000000;

const fileSystem = new FileSystem();
arr.forEach((str) => {
    parseInput(str, fileSystem);
})
fileSystem.root.print();

const freeSpace = DISK_SPACE - fileSystem.root.size;
const requiredSpace = UPDATE_SIZE - freeSpace;

console.log(
    fileSystem.root.getAllDirs()
        .map(({ size }) => size)
        .filter((it) => it >= requiredSpace)
        .sort((a, b) => a - b)[0]
);