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

let map = input.split('\n').map(x => x.split(''));
function search(map, visited, startRow, startCol) {
    const rows = map.length;
    const cols = map[0].length;
    const type = map[startRow][startCol];
    const dirs = [
        [0, 1], [1, 0], [0, -1], [-1, 0]
    ];

    let area = 0;
    let sides = 0;
    const queue = [[startRow, startCol]];
    visited[startRow][startCol] = true;

    while (queue.length > 0) {
        const [row, col] = queue.shift();
        area++;
        let localSides = 0;

        for (const [dr, dc] of dirs) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (
                newRow < 0 || newRow >= rows ||
                newCol < 0 || newCol >= cols ||
                map[newRow][newCol] !== type
            ) {
                localSides++;
            } else if (!visited[newRow][newCol]) {
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol]);
            }
        }

        sides += localSides;
    }

    return { area, sides };
}
function total(map) {
    const rows = map.length;
    const cols = map[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    let totalPrice = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!visited[row][col]) {
                const { area, sides } = search(map, visited, row, col);
                totalPrice += area * sides;
            }
        }
    }

    return totalPrice;
}

console.log(total(map));

let s = 0;
let visited = {};
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if (visited[`${y},${x}`]) continue;
        let w = {}, ch = map[y][x], area = 0, perm = 0;
        let search2 = (y, x, py, px) => {
            if (y < 0 || y >= map.length || x < 0 || x >= map[0].length || map[y][x] !== ch) {
                const key = x === px ? `y${y},${py}` : `x${x},${px}`;
                (w[key] = w[key] || []).push(x === px ? x : y);
                perm++;
                return;
            }
            if (visited[`${y},${x}`]) return;
            area++;
            visited[`${y},${x}`] = true;
            let dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (const [dy, dx] of dirs) {
                search2(y + dy, x + dx, y, x);
            }
        }
        search2(y, x);
        let walls = 0;
        for (let v of Object.values(w)) {
            v.sort((a, b) => a - b);
            walls += v.reduce((acc, n, i) => acc + (i === 0 || n > v[i - 1] + 1 ? 1 : 0), 0);
        }
        s += area * walls;
    }
}
console.log(s)