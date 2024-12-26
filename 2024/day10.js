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
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const neighbors = (i, j) => dirs.map(([di, dj]) => [i + di, j + dj]).filter(([ni, nj]) => ni >= 0 && ni < H && nj >= 0 && nj < W);
const gcd = (alpha, beta) => alpha ? gcd(beta % alpha, alpha) : beta;
const lcm = (alpha, beta) => alpha * beta / gcd(alpha, beta);
const minAreaRect = (points) => (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const log = (...alpha) => { for (beta of alpha) console.log(JSON.stringify(beta, null, 2)) }
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');

let map = input.split('\n').filter(x => x).map(row => row.split('').map(Number));
let H = map.length;
let W = map[0].length;

let s = 0;
for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
        if (map[i][j] === 0) {
            let visited = new Set();
            let nines = new Set();
            let dfs = (i, j, h) => {
                let key = `${i},${j}`;
                if (visited.has(key)) return;
                visited.add(key);
                if (map[i][j] === 9) nines.add(key);
                for (let [ni, nj] of neighbors(i, j)) {
                    if (map[ni][nj] === h + 1) {
                        dfs(ni, nj, h + 1);
                    }
                }
            };
            dfs(i, j, 0);
            s += nines.size;
        }
    }
}
console.log(s);//p1

let s1 = 0;
for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
        if (map[i][j] === 0) {
            let memo = new Map();
            let dfs = (i, j, h) => {
                let key = `${i},${j},${h}`;
                if (memo.has(key)) return memo.get(key);
                if (h === 9) return 1;
                let paths = 0;
                for (let [ni, nj] of neighbors(i, j)) {
                    if (map[ni][nj] === h + 1) {
                        paths += dfs(ni, nj, h + 1);
                    }
                }
                memo.set(key, paths);
                return paths;
            };
            s1 += dfs(i, j, 0);
        }
    }
}
console.log(s1);//p2