const File = require('./File');

class Directory extends File {
    constructor(...args) {
        super(...args);
        this.type = 'dir';
        this.content = [];
    }

    pritnItem(item, margin) {
        let marginStr = new Array(margin).fill('  ').join('');
        marginStr = item.type === 'dir' ? `${marginStr} -` : `${marginStr}  `;
        console.log(`${marginStr} ${item.name} (${item.type}, size=${item.size})`);
    }

    print(margin = 0) {
        this.pritnItem(this, margin);
        this.content.forEach((item) => {
            if (item.type === 'dir') {
                item.print(margin + 1);
            } else {
                this.pritnItem(item, margin + 1);
            }
        })
    }

    setSize() {
        this.size = this.content.reduce((acc, cur) => cur.size + acc, 0);
        if (this.parent) {
            this.parent.setSize();
        }
    }

    getAllDirs() {
        const result = [];
        result.push(this);

        const goDeep = (dir) => {
            const dirs = dir.content.filter((it) => it.type === 'dir');
            dirs.forEach((it) => {
                result.push(it);
                goDeep(it);
            });
        };

        goDeep(this);
        return result;
    }
}

module.exports = Directory;
