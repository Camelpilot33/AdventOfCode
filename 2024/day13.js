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

let machines = input.split('\n\n');
let A = machines.map(e=>e.split('\n')[0].match(/-?\d+/g).map(Number));
let B = machines.map(e=>e.split('\n')[1].match(/-?\d+/g).map(Number));
let prizes = machines.map(e=>e.split('\n')[2].match(/-?\d+/g).map(Number));
let s1 = 0;
for (let i = 0; i < machines.length; i++) {
    let [a1, a2] = A[i];
    let [b1, b2] = B[i];
    let [p1, p2] = prizes[i].map(x=>x);

    let x = (p1 * b2 - p2 * b1) / (a1 * b2 - a2 * b1);
    let y = (a1 * p2 - a2 * p1) / (a1 * b2 - a2 * b1);

    if (x%1==0 && y%1==0) {
        s1 += x * 3 + y;
    }
}
console.log(s1);
let s2 = 0;
for (let i = 0; i < machines.length; i++) {
    let [a1, a2] = A[i];
    let [b1, b2] = B[i];
    let [p1, p2] = prizes[i].map(x=>x+10000000000000);

    let x = (p1 * b2 - p2 * b1) / (a1 * b2 - a2 * b1);
    let y = (a1 * p2 - a2 * p1) / (a1 * b2 - a2 * b1);

    if (x%1==0 && y%1==0) {
        s2 += x * 3 + y;
    }
}
console.log(s2);
