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

let key=input.split('\n\n')[0].split('\n').map(e=>e.split('|')).map(e=>e.map(e=>+e))
let updates = input.split('\n\n')[1].split('\n').map(e=>e.split(',').map(e=>+e))
console.log(
    updates.filter(e=>{
        for (j=0;j<key.length;j++) {
            let k = key[j]
            let i = [e.indexOf(k[0]),e.indexOf(k[1])]
            if (i[0] != -1 && i[1] != -1 && i[0] > i[1]) return false
        }
        return true
    }).map(e=>e[Math.floor(e.length/2)]).sum()
)

let incorrect = updates.filter(e=>{
    for (j=0;j<key.length;j++) {
        let k = key[j]
        let i = [e.indexOf(k[0]),e.indexOf(k[1])]
        if (i[0] != -1 && i[1] != -1 && i[0] > i[1]) return true
    }
})

let map = {}
for (k of key) {
    map[k[0]] = map[k[0]] || [];
    map[k[0]].push(k[1]);
}

for (let p of updates) {
    let changed = true;
    while (changed) {
        changed = false;
        for (let i = 0; i < p.length; i++) {
            for (let j = i + 1; j < p.length; j++) {
                if (map[p[j]] && map[p[j]].includes(p[i])) {
                    [p[i], p[j]] = [p[j], p[i]];
                    changed = true;
                }
            }
        }
    }
}

log(
    incorrect.map(e=>e[Math.floor(e.length/2)]).sum()
)