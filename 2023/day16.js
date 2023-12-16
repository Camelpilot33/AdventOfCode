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
const log = (...a) => { for (b of a) console.log(JSON.stringify(b, null, 2)) }
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');


let a = input.split('\n').map(e => e.split(''));
function run(a1, b, c, d) {
    let energize = a.map(e => e.map(w => new Object({})));
    
    function trace(x, y, dx, dy) {
        if (x < 0 || y < 0 || x >= a[0].length || y >= a.length) return;
        let key = `${dx},${dy}`;
        if (energize[y][x][key] == 1) return;
        energize[y][x][key] = 1;
        switch (a[y][x]) {
            case ".":
                trace(x + dx, y + dy, dx, dy);
                break;
            case "\\":
                if (dx != 0) {
                    trace(x, y + dx, 0, dx);
                } else {
                    trace(x + dy, y, dy, 0);
                }
                break;
            case "/":
                if (dx != 0) {
                    trace(x, y - dx, 0, -dx);
                } else {
                    trace(x - dy, y, -dy, 0);
                }
                break;
            case "|":
                if (dx == 0) trace(x + dx, y + dy, dx, dy);
                trace(x, y + 1, 0, 1);
                trace(x, y - 1, 0, -1);
                break;
            case "-":
                if (dy == 0) trace(x + dx, y + dy, dx, dy);
                trace(x + 1, y, 1, 0);
                trace(x - 1, y, -1, 0);
                break;
        }
    }

    trace(a1, b, c, d)
    return energize.map(e => e.map(w => Object.keys(w).length > 0 ? 1 : 0).sum()).sum()
}
let max = 0
for (let i = 0; i < a[0].length; i++) {
    let val = run(i, 0, 0, 1)
    if (val > max) max = val;
    val = run(i, a.length - 1, 0, -1)
    if (val > max) max = val;
}
for (let i = 0; i < a.length; i++) {
    let val = run(0, i, 1, 0)
    if (val > max) max = val;
    val = run(a[0].length - 1, i, -1, 0)
    if (val > max) max = val;
}

log(
    run(0,0,1,0),
    max
    // energize.map(e=>e.map(w=>w>0?1:0).join('')),
    // energize.map(e=>e.map(w=>Object.keys(w).length>0?1:0).sum()).sum()
)