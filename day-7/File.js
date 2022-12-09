class File {
    constructor(name, parent = null, size = 0) {
        this.name = name;
        this.parent = parent;
        this.size = size;
        this.type = 'file';

        if (name !== '/' && parent === null) {
            throw Error('Parent cannot be empty');
        }
    }
}

module.exports = File;
