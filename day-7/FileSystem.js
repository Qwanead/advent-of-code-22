const File = require('./File');
const Directory = require('./Directory');

class FileSystem {
    constructor() {
        this.root = new Directory('/');
        this.pointer = this.root;
    }

    mkDir(name) {
        const newDir = new Directory(name, this.pointer);
        this.pointer.content.push(newDir);
    }

    touch(name, size) {
        const newFile = new File(name, this.pointer, size);
        this.pointer.content.push(newFile);
        this.pointer.setSize();
    }

    cd(dirName) {
        switch (dirName) {
            case '/':
                this.pointer = this.root;
                break;
            case '..':
                this.pointer = this.pointer.parent;
                break;
            default:
                this.pointer = this.pointer.content
                    .find((it) => it.name === dirName);
                break;
        }
    }

    isDirExist(name) {
        return this.pointer.content
            .some((dir) => dir.type === 'dir' && dir.name === name);
    }

    isFileExist(name) {
        return this.pointer.content
            .some((file) => file.type === 'file' && file.name === name);
    }
}

module.exports = FileSystem;
