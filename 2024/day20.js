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

const neigh = (grid, pos) => {
    const [x, y] = pos;
    return [[0, 1], [1, 0], [0, -1], [-1, 0]]
        .map(([dx, dy]) => [x + dx, y + dy])
        .filter(([nx, ny]) =>
            nx >= 0 && nx < grid.length &&
            ny >= 0 && ny < grid[0].length &&
            grid[nx][ny] !== '#'
        );
};
const bfs = (grid, start) => {
    const distances = new Map();
    const queue = [[start, 0]];
    distances.set(start.join(','), 0);
    while (queue.length) {
        const [[x, y], dist] = queue.shift();
        for (const [nx, ny] of neigh(grid, [x, y])) {
            const key = [nx, ny].join(',');
            if (!distances.has(key)) {
                distances.set(key, dist + 1);
                queue.push([[nx, ny], dist + 1]);
            }
        }
    }
    return distances;
};

const grid = input.split('\n').map(line => line.split(''));
const height = grid.length;
const width = grid[0].length;
let start, end;
const validPos = [];
for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if (grid[i][j] !== '#') {
            validPos.push([i, j]);
            if (grid[i][j] === 'S') start = [i, j];
            if (grid[i][j] === 'E') end = [i, j];
        }
    }
}
const fromStart = bfs(grid, start);
const fromEnd = bfs(grid, end);
const normalDist = fromStart.get(end.join(','));


const cheats = [];
for (const [x1, y1] of validPos) {
    const startKey = `${x1},${y1}`;
    const distToStart = fromStart.get(startKey);
    if (distToStart === undefined) continue;

    for (const [x2, y2] of validPos) {
        const endKey = `${x2},${y2}`;
        if (startKey === endKey) continue;

        const distFromEnd = fromEnd.get(endKey);
        if (distFromEnd === undefined) continue;
        const manhattanDist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
        if (manhattanDist > 20) continue;
        const totalDist = distToStart + manhattanDist + distFromEnd;
        const saved = normalDist - totalDist;
        if (saved > 0) {
            cheats.push(saved);
        }
    }
}

log(cheats.filter(e => e >= 100).length)