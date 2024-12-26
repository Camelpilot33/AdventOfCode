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

//part1
let a = input.split(' ').map(Number)
function blink(arr) {
    let newarr = [];
    for (q of arr) {
        let s = String(q);
        if (q == 0) newarr.push(1);
        else if (s.length % 2 == 0) {
            newarr.push(Number(s.slice(0, s.length / 2)));
            newarr.push(Number(s.slice(s.length / 2)));
        } else newarr.push(q * 2024)
    }
    return newarr
}
for (i = 0; i < 25; i++) a = blink(a)
console.log(a.length)

//part2
a = input.split(' ').map(Number)
let count = a.reduce((x, y) => {
    x[y] = (x[y] || 0) + 1;
    return x;
}, {});
function b(stone) {
    if (stone === 0) return [1]
    const str = stone.toString();
    const len = str.length;
    if (!(len % 2)) {
        return [Number(str.slice(0, len / 2)), Number(str.slice(len / 2))];
    } else {
        return [2024 * stone];
    }
}
function blinko(stoneCounts) {
    const neww = {};
    for (const [stone, count] of Object.entries(stoneCounts)) {
        b(Number(stone)).forEach(newStone => {
            neww[newStone] = (neww[newStone] || 0) + count;
        });
    }
    return neww;
}

for (let i = 0; i < 75; i++) count = blinko(count)
const answer = Object.values(count).sum()
console.log(answer);