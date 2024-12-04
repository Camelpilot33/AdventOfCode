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

grid = input.split('\n').map(e => e.split(''));
const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, 1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [1, -1]
];

let sum = 0;
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        for (let [dy, dx] of dirs) {
            let end = [i + dy * 3, j + dx * 3];
            if (end[0] < 0 || end[0] >= grid.length || end[1] < 0 || end[1] >= grid[i].length) continue;
            let w = '';
            for (let k = 0; k < 4; k++) {
                w += grid[i + dy * k][j + dx * k];
            }
            sum += w == 'XMAS';
        }
    }
}
console.log(sum);


let sum2 = 0;
for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
        if (grid[i][j] == 'A') {
            let bool = [
                grid[i - 1][j - 1] == 'M' && grid[i + 1][j + 1] == 'S',
                grid[i - 1][j - 1] == 'S' && grid[i + 1][j + 1] == 'M',
                grid[i - 1][j + 1] == 'M' && grid[i + 1][j - 1] == 'S',
                grid[i - 1][j + 1] == 'S' && grid[i + 1][j - 1] == 'M',
            ]
            if ((bool[0] || bool[1]) && (bool[2] || bool[3])) sum2++;
        }
    }
}
console.log(sum2);
