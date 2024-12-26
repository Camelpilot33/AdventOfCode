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


// moves = moves.replace(/[\n\r]/g, '').split('');

// // Double the width of the map
// map = map.split('\n').map(line =>
//     line.split('').map(char => {
//         switch (char) {
//             case '#': return '##';
//             case 'O': return '[]';
//             case '@': return '@.';
//             case '.': return '..';
//             default: return char + char;
//         }
//     }).join('')
// );
// let width = map[0].length;
// let height = map.length;
// let boxes = [];
// let robot = [0, 0];
// for (let row = 0; row < height; row++) {
//     for (let col = 0; col < width; col++) {
//         if (map[row][col] === '@') {
//             robot = [row, col];
//         } else if (map[row][col] === '[') {
//             boxes.push([row, col]);
//         }
//     }
// }
// map = map.map(e => e.replace(/[\[\]\@]/g, '.'))
// function logmap() {
//     let map2 = map.map(e => e.split(''));
//     map2[robot[0]][robot[1]] = '@';
//     boxes.forEach(e => map2[e[0]][e[1]] = '[');
//     boxes.forEach(e => map2[e[0]][e[1] + 1] = ']');
//     console.log(map2.map(e => e.join('')).join('\n'));
// }
// function moveRobot(direction) {
//     let [row, col] = robot;
//     let [drow, dcol] = [[-1, 0], [1, 0], [0, -1], [0, 1]][direction];
//     let [nrow, ncol] = [row + drow, col + dcol];
//     let b = boxes.map((e, i) => [e, i]).filter(e => e[0][0] == nrow && (e[0][1] == ncol || e[0][1] + 1 == ncol));
//     if (b.length) {
//         success = boxpush(b[0], direction);
//     }
//     if (b.length > 0 && success) {
//         robot = [nrow, ncol];
//     }
//     if (map[nrow][ncol] == '.' && !b) {
//         robot = [nrow, ncol];
//     }
// }
// function boxpush(box, direction) {
//     let [row, col] = box[0];
//     let [drow, dcol] = [[-1, 0], [1, 0], [0, -1], [0, 1]][direction];
//     if (direction == 0) {
//         let [nrow, ncol] = [row + drow, col + dcol];
//         if (map[nrow][ncol] == '.') {
//             boxes[box[1]] = [nrow, ncol];
//             return true;
//         }
//     }
//     let [nrow, ncol] = [row + drow, col + dcol];
//     if (map[nrow][ncol] == '.') {
//         boxes[box[1]] = [nrow, ncol];
//         return true;
//     }
//     return false;
// }
/// :( not working sadge
// logmap();
// moveRobot(2)
// logmap();
let [map, moves] = input.split('\n\n');
// map = map.split('\n').map(e => e.split('')); //uncomment for p1
// let height = map.length;
// let width = map[0].length;
map = map.split('\n').map(line =>
    line.split('').map(char => {
        switch (char) {
            case '#': return '##';
            case 'O': return '[]';
            case '@': return '@.';
            case '.': return '..';
            default: return char + char;
        }
    })
).map(e=>e.map(w=>w.split('')).flat());
// console.log(map.map(e=>e.join('')).join('\n'));
let height = map.length;
let width = map[0].length;

let [sr, sc] = map.reduce((acc, row, r) => row.reduce((a, cell, c) => cell === '@' ? [r, c] : a, acc), []);
map[sr][sc] = '.';

for (let inst of moves) {
    if (inst === '\n') continue;
    let [dr, dc] = { '^': [-1, 0], '>': [0, 1], 'v': [1, 0], '<': [0, -1] }[inst];
    let rr = sr + dr, cc = sc + dc;
    if (map[rr][cc] === '#') continue;
    else if (map[rr][cc] === '.') {
        sr = rr;
        sc = cc;
    } else if (['[', ']', 'O'].includes(map[rr][cc])) {
        let queue = [[sr, sc]];
        let visited = new Set();
        let ok = true;
        while (queue.length > 0) {
            let [ar, ac] = queue.shift();
            if (visited.has(`${ar},${ac}`)) continue;
            visited.add(`${ar},${ac}`);
            let tr = ar + dr, tc = ac + dc;
            if (map[tr][tc] === '#') {
            ok = false;
            break;
            }
            if (['O', '[', ']'].includes(map[tr][tc])) {
            queue.push([tr, tc]);
            if (map[tr][tc] === '[') queue.push([tr, tc + 1]);
            if (map[tr][tc] === ']') queue.push([tr, tc - 1]);
            }
        }
        if (!ok) continue;
        while (visited.size > 0) {
            for (let [ar, ac] of Array.from(visited).map(s => s.split(',').map(Number)).sort()) {
                let tr = ar + dr, tc = ac + dc;
                if (!visited.has(`${tr},${tc}`)) {
                    if (map[tr][tc] !== '.') throw new Error('Assertion failed');
                    map[tr][tc] = map[ar][ac];
                    map[ar][ac] = '.';
                    visited.delete(`${ar},${ac}`);
                }
            }
        }
        sr += dr;
        sc += dc;
    }
}
log(map.reduce((s, rw, r) => s + rw.reduce((s, cell, c) => s + (['[', 'O'].includes(cell) ? 100 * r + c : 0), 0), 0))
