Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
    rotate: { value: function (n) { n = n % this.length; while (this.length && n < 0) n += this.length; this.push.apply(this, this.splice(0, n)); return this; } },
    firstn: { value: function (n) { return n >= 0 ? this.sort((a, b) => b - a).slice(0, n) : []; } },
    occur: { value: function () { return this.reduce((acc, curr) => { acc[curr] = acc[curr] + 1 || 1; return acc }, {}); } }
});
Number.prototype.mod = function (n) { return ((this % n) + n) % n; };
const mergeint = intervals => {
    if (intervals.length < 2) return intervals;
    intervals.sortf();
    const result = [];
    let previous = intervals[0];
    for (let i = 1; i < intervals.length; i += 1) {
        if (previous[1] >= intervals[i][0]) previous = [previous[0], Math.max(previous[1], intervals[i][1])];
        else {
            result.push(previous);
            previous = intervals[i];
        }
    }
    result.push(previous);
    return result;
};
const gcd = (alpha, beta) => alpha ? gcd(beta % alpha, alpha) : beta;
const lcm = (alpha, beta) => alpha * beta / gcd(alpha, beta);
const minAreaRect = (points) => (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const log = (...alpha) => { for (beta of alpha) console.log(JSON.stringify(beta, null, 2)) }
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');

let a = input.split('\n').map(e=>e.split(',').map(Number))
const map = new Set();
for (let i = 0; i < 1024; i++) {
    map.add(`${a[i][0]},${a[i][1]}`);
}
let target = [70, 70];
function shortest() {
    let queue = [[0, 0, 0]];
    let visited = new Set(['0,0']);
    let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    while (queue.length) {
        const [x, y, steps] = queue.shift();
        
        if (x === target[0] && y === target[1]) {
            return steps;
        }

        for (const [dx, dy] of dirs) {
            const newX = x + dx;
            const newY = y + dy;
            const key = `${newX},${newY}`;

            if (newX >= 0 && newX <= 70 && 
                newY >= 0 && newY <= 70 && 
                !map.has(key) && 
                !visited.has(key)) {
                    queue.push([newX, newY, steps + 1]);
                    visited.add(key);
            }
        }
    }
}
console.log(shortest())

for (const [x, y] of a) {
    map.add(`${x},${y}`);
    if (!shortest()) {
        console.log(`${x},${y}`);//3.143s, could improve, too lazy
        break;
    }
}