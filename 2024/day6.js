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

const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const grid = input.split('\n').map(e => e.split(''));
let startpos = [-1, -1];
let startdir = 0;
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == '^') {
            startpos = [i, j];
            grid[i][j] = '.';
            break;
        }
    }
    if (startpos[0] !== -1) break;
}
let pos = [...startpos];
let dir = startdir;


visited = new Set();
visited.add(`${pos[0]},${pos[1]}`);
const ingrid = (row, col) => row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;

while (true) {
    let nextpos = [pos[0] + dirs[dir][0], pos[1] + dirs[dir][1]];
    if (!ingrid(nextpos[0], nextpos[1])) {
        break;
    }
    if (grid[nextpos[0]][nextpos[1]] === '#') {
        dir++;
        dir %= 4;
    } else {
        pos = [nextpos[0], nextpos[1]];
        visited.add(`${pos[0]},${pos[1]}`);
    }
}

console.log(visited.size)

let loops = (obs) => {
    let temp = grid.map(e => e.map(e => e));
    temp[obs[0]][obs[1]] = '#';
    let pos = [...startpos];
    let dir = startdir;
    let visited = new Set();
    while (true) {
        let state = `${pos[0]},${pos[1]},${dirs[dir][0]},${dirs[dir][1]}`;
        if (visited.has(state)) return true;
        visited.add(state);
        let nextpos = [pos[0] + dirs[dir][0], pos[1] + dirs[dir][1]];
        if (!ingrid(nextpos[0], nextpos[1])) return false;
        if (temp[nextpos[0]][nextpos[1]] == '#') {
            dir++;
            dir %= 4;
        } else {
            pos = [nextpos[0], nextpos[1]];
        }
    }
}
let loopPositions = 0;
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        if (!visited.has(`${i},${j}`)) continue;
        if (grid[i][j] == '#') continue;
        if (i == startpos[0] && j == startpos[1]) continue;
        if (loops([i, j])) {
            loopPositions++;
        }
    }
}
console.log(loopPositions); //2.116s :(
