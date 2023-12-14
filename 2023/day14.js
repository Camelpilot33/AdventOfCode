Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
    rotate: { value: function (n) { n = n % this.length; while (this.length && n < 0) n += this.length; this.push.apply(this, this.splice(0, n)); return this; } },
    firstn: { value: function (n) { return n >= 0 ? this.sort((a, b) => b - a).slice(0, n) : []; } }
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
const minAreaRect = (points) => (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const log = (...a)=>{for(b of a)console.log(JSON.stringify(b, null, 2))}
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');

let a=input.split('\n').map(e=>e.split(''))
let s=0
for (i in a[0]) {
    let pts=a.length
    for (j in a.map(e=>e[i])) {
        if (a.map(e=>e[i])[j] == 'O') {
            s+=pts
            pts--
        }
        if (a.map(e=>e[i])[j]=="#") {
            pts=a.length-j-1
            // console.log('.',pts)
        }
    }
    // console.log(s)
};log(s)
const get_score = (grid) => {
    const n = grid.length;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        ans += (n - i) * grid[i].filter((e) => e === "O").length;
    }
    return ans;
};

const slide = (grid) => {
    const n = grid.length;
    const m = grid[0].length;
    for (let j = 0; j < m; j++) {
        let ci = 0;
        for (let i = 0; i < n; i++) {
            if (grid[i][j] === "#") {
                ci = i + 1;
            }
            if (grid[i][j] === "O") {
                grid[i][j] = ".";
                grid[ci][j] = "O";
                ci += 1;
            }
        }
    }
};
const rotate = (grid) => {
    const n = grid.length;
    const m = grid[0].length;
    const newGrid = Array.from({ length: m }, () => Array.from({ length: n }, () => "."));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            newGrid[j][n - i - 1] = grid[i][j];
        }
    }
    return newGrid;
};

let d={}
let goal=1000000000
let idx=1
while (true) {
    for (let j = 0; j < 4; j++) {
        slide(a);
        a = rotate(a);
    }
    const key = JSON.stringify(a);
    if (key in d) {
        const cyclen = idx - d[key][0];
        for (const [a, b] of Object.values(d)) {
            if (a >= d[key][0] && a % cyclen === goal % cyclen) {
                console.log(b);
            }
        }
        break;
    }
    d[key] = [idx, get_score(a)];
    idx ++;
}