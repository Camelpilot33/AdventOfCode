const abc = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
});
Number.prototype.mod = function (n) {
    "use strict";
    return ((this % n) + n) % n;
};
Array.prototype.rotate = function (n) {
    n = n % this.length;
    while (this.length && n < 0) n += this.length;
    this.push.apply(this, this.splice(0, n));
    return this;
};
const firstn = (arr, n) => n >= 0 ? arr.sort((a, b) => b - a).slice(0, n) : [];
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
const log = (a, b = "") => console.log('[' + a.join(', ') + ']', b);


const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, "utf8").trim().replace(/\r/g, '');
let dat = input.split('\n').map(e => e.split(': '));
let a = {};
for (i of dat) a[i[0]] = i[1];
function trace (b, p = 3) {
    if (p == 2 | p == 3) {
        if (b == "humn") return "X";
        if (b == "root") {
            let r = a[b];
            if (Number(r).toString() == r) return r;
            r = r.split(' ');
            return trace(r[0]) + "=" + trace(r[2]);
        }
    }
    let r = a[b];
    if (Number(r).toString() == r) return r;
    r = r.split(' ');
    if (p == 1) return eval("(" + trace(r[0], 1) + r[1] + trace(r[2], 1) + ")");
    return "(" + trace(r[0]) + r[1] + trace(r[2]) + ")";
}
console.log(trace('root', 1));
console.log(trace('root', 2));