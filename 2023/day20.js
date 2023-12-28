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
const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);
const minAreaRect = (points) => (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const log = (...a) => { for (b of a) console.log(JSON.stringify(b, null, 2)) }
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');

let a = input.split('\n').map(e => e.split(' ->').map(w => w.replace(/ /g, '').split(',')))
let [m,flips, conj] = [{},{}, {}]
for (i of a) {
    m[i[0][0].replace(/[%&]/g, '')] = i[1]
}
for (i of a) if (i[0][0][0] == "%") {
    flips[i[0][0].replace(/[%&]/g, '')] = 0
} else if (i[0][0][0] == "&") {
    conj[i[0][0].replace(/[%&]/g, '')] = {}
}
for (i of Object.keys(conj)) for (j of a) {
    if (j[1].includes(i)) {
        conj[i][j[0][0].replace(/[%&]/g, '')] = 0
    }
}
let s = [0, 0]//[low,high]
let bt = { "js": [], "qs": [], "dt": [], "ts": [] }//loop
//lead to cl which leads to rx
const a0 = "js";
const a1 = "qs";
const a2 = "dt";
const a3 = "ts";
function press(idx) {
    // log('e')
    let queue = [["broadcaster", 0, "button"]]
    while (queue.length) {
        let [node, lvl, from] = queue.shift()
        // if (node=="rx"&&lvl==0) log(idx)
        if (["js", "qs", "dt", "ts"].includes(from) && lvl == 1) bt[from].push(idx)
        // log(`${from}-${lvl}->${node}`)
        s[lvl]++
        if (node == "broadcaster") {
            for (i of m[node]) { queue.push([i, 0, node]) }
            continue
        }
        if (Object.keys(flips).includes(node)) {
            if (lvl == 0) {
                flips[node] = (flips[node] + 1) % 2
                for (i of m[node]) queue.push([i, flips[node], node])
            }
        }
        if (Object.keys(conj).includes(node)) {
            conj[node][from] = lvl
            let pls = Object.values(conj[node]).filter(e => e == 0).length == 0
            // log(pls)
            for (i of m[node]) queue.push([i, pls ? 0 : 1, node])
        }
    }
}

for (idx = 0; idx < 1000; idx++) press(idx)
log(s[0] * s[1])
for (idx = 1001; idx < 5000; idx++) {//all mine ~4000 so 5000 is safe
    press(idx)
}
log(
    Object.values(bt).map(e => e[0]).reduce(lcm)
)