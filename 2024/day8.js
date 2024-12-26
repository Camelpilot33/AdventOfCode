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

function p1() {
    let locs = {}
    let [w, h] = [input.split('\n').length, input.split('\n')[0].length]

    input.split('\n').map(e => e.split('')).forEach((e, i) => {
        e.forEach((f, j) => {
            if (f === '.') return;
            locs[f] = locs[f] || []
            locs[f].push([i, j])
        })
    });

    let pos = new Set();
    for (l of Object.keys(locs)) {
        for (i = 0; i < locs[l].length - 1; i++) {
            for (j = i + 1; j < locs[l].length; j++) {
                let l1 = locs[l][i]
                let l2 = locs[l][j]
                let diff = [l2[0] - l1[0], l2[1] - l1[1]]
                pos.add(`${l2[0] + diff[0]} ${l2[1] + diff[1]}`)
                pos.add(`${l1[0] - diff[0]} ${l1[1] - diff[1]}`)
            }
        }
    }
    for (p of pos) {
        let [x, y] = p.split(' ').map(Number)
        if (x < 0 || y < 0 || x >= w || y >= h) pos.delete(p)
    }
    return pos.size
}

log(p1())


function p2() {
    let locs = {}
    let [w, h] = [input.split('\n').length, input.split('\n')[0].length]

    input.split('\n').map(e => e.split('')).forEach((e, i) => {
        e.forEach((f, j) => {
            if (f === '.') return;
            locs[f] = locs[f] || []
            locs[f].push([i, j])
        })
    });

    let pos = new Set();
    for (l of Object.keys(locs)) {
        for (i = 0; i < locs[l].length - 1; i++) {
            for (j = i + 1; j < locs[l].length; j++) {
                let l1 = locs[l][i]
                let l2 = locs[l][j]
                for (let k = 0; k < 1000; k++) {
                    let diff = [k*(l2[0] - l1[0]), k*(l2[1] - l1[1])]
                    pos.add(`${l2[0] + diff[0]} ${l2[1] + diff[1]}`)
                    pos.add(`${l1[0] - diff[0]} ${l1[1] - diff[1]}`)
                }
            }
        }
    }
    for (p of pos) {
        let [x, y] = p.split(' ').map(Number)
        if (x < 0 || y < 0 || x >= w || y >= h) pos.delete(p)
    }

    return pos.size
}
log(p2())