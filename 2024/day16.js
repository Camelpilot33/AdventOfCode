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

const grid = input.split('\n').filter(line => line.length);
const height = grid.length;
const width = grid[0].length;
let start, end;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        if (grid[y][x] === 'S') start = [y, x];
        if (grid[y][x] === 'E') end = [y, x];
    }
}
const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const turncost = (fromDir, toDir) => {
    if (fromDir === toDir) return 0;
    const diff = Math.abs(fromDir - toDir);
    return diff === 2 ? 2000 : 1000;
};
const isValid = (y, x) => {
    return y >= 0 && y < height && x >= 0 && x < width && grid[y][x] !== '#';
};

const shortpath = () => {
    const queue = [[0, start[0], start[1], 0]];
    const visited = new Set();
    while (queue.length > 0) {
        queue.sort((a, b) => a[0] - b[0]);
        const [cost, y, x, dir] = queue.shift();
        const state = `${y},${x},${dir}`;
        if (visited.has(state)) continue;
        visited.add(state);
        if (y === end[0] && x === end[1]) {
            return [cost,visited];
        }
        for (let newDir = 0; newDir < 4; newDir++) {
            const turnCost = turncost(dir, newDir);
            const [dy, dx] = dirs[newDir];
            let newY = y + dy;
            let newX = x + dx;
            let moveCost = 1;
            if (isValid(newY, newX)) {
                queue.push([cost + turnCost + moveCost, newY, newX, newDir]);
            }
        }
    }
    
    return Infinity;
};
console.log(shortpath()[0]);
