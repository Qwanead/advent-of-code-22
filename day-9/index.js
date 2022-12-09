const fs = require("fs");
let fileContent = fs.readFileSync("temp", "utf8");

class Rope {
    head = { x: 0, y: 0 };
    knots = [];

    addKnot(knot) {
        const lastKnot = this.knots[this.knots.length - 1];
        if (lastKnot) {
            lastKnot.addTail(knot);
        }
        this.knots.push(knot);
    }

    move(direction, stepCount) {
        for( let i = 1; i <= stepCount; i += 1) {
            this.moveHead(direction);
        }
    }

    moveHead(direction) {
        switch(direction) {
            case 'U':
                this.head.y += 1;
                break;
            case 'R':
                this.head.x += 1;
                break;
            case 'D':
                this.head.y -= 1;
                break;
            case 'L':
                this.head.x -= 1;
                break;
            default:
                throw Error(`Unknown direction: "${direction}`);
        }

        if (this.knots[0]) {
            this.knots[0].moveKnot(direction, this.head);
        }
    }

    getTailPath() {
        const lastKnot = this.knots[this.knots.length - 1];
        return lastKnot ? lastKnot.knotPath : [];
    }
}

class Knot {
    knot = { x: 0, y: 0 };
    tail = null;
    knotPath = [];

    addTail(tail) {
        this.tail = tail;
    }

    addKnotPath([x, y]) {
        if (this.knotPath.some((([itX, itY]) => itX === x && itY === y))) {
            return;
        }
        this.knotPath.push([x, y]);
    }

    moveKnot(direction, head) {
        const { x: headX, y: headY } = head;
        const { x: knotX, y: knotY } = this.knot;
        const deltaX = Math.abs(headX - knotX);
        const deltaY = Math.abs(headY - knotY);

        if (deltaX === 2 || deltaY === 2) {
            switch(direction) {
                case 'U':
                    this.knot.y += 1;
                    this.knot.x = head.x;
                    break;
                case 'R':
                    this.knot.x += 1;
                    this.knot.y = head.y;
                    break;
                case 'D':
                    this.knot.y -= 1;
                    this.knot.x = head.x;
                    break;
                case 'L':
                    this.knot.x -= 1;
                    this.knot.y = head.y;
                    break;
                default:
                    throw Error(`Unknown direction: "${direction}`);
            }
        }
        this.addKnotPath([this.knot.x, this.knot.y]);

        if (this.tail) {
            this.tail.moveKnot(direction, this.knot);
        }
    }
}

const arr = fileContent
    .split('\n')
    .filter((it) => it)
    .map((it) => it.split(' '))
    .map(([d, s]) => [d, Number(s)]);
const rope = new Rope();

for (let i = 1; i <= 7; i += 1) {
    const knot = new Knot();
    rope.addKnot(knot);
}

arr.forEach(([direction, stepCount]) => {
    rope.move(direction, stepCount);
});

console.log(rope.getTailPath().length);
