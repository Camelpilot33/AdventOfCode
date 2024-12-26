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

let map = input.split('').map(Number)


// let data = [...map].map((e, i) => new Array(e).fill(i%2?'.':i/2)).flat()
// while (true) {
//     let right = data.length-1
//     while (right>=0 && data[right] == '.') right--
//     let left = 0
//     while (left<data.length && data[left] != '.') left++
//     if (right<left) break;
//     data[left] = data[right]
//     data[right] = '.'
// }
// console.log(
//     data.map((e,i)=>e=='.'?0:e*i).sum()
// )

let f = []
let data1 = [...map].map((e, i) => new Array(e).fill(i % 2 ? '.' : i / 2)).flat()
for (let i = 0,idx=0; i < map.length; i++) {
    if (i % 2 == 0) {
        f.push({id: i / 2,s: idx,l: map[i]})
        idx += map[i]
    } else idx += map[i]
}
f.sort((a, b) => b.id - a.id)
for (const file of f) {
    let [best, start, len] = [-1, -1, 0]
    for (let i = 0; i < file.s; i++) {
        if (data1[i] === '.') {
            if (start === -1) start = i
            len++
            if (len >= file.l) {
                best = start
                break
            }
        } else [start, len] = [-1, 0]
    }
    if (best !== -1) {
        for (let i = file.s; i < file.s + file.l; i++) data1[i] = '.'
        for (let i = 0; i < file.l; i++) data1[best + i] = file.id
    }
}
console.log(data1.map((e, i) => e == '.' ? 0 : e * i).sum())