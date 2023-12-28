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

let a=input.split('\n')
let [x,y]=[0,0]
const pts = [];
let p = 0;
for (i in a) {
    //p1:
    // let [dir,l]=["RDLU".split('').indexOf(a[i].split(' ')[0]),Number(a[i].split(' ')[1])]

    //p2:
    const inst = a[i].split('#')[1].slice(0,-1)
    let [l,dir]=[parseInt(inst.slice(0, -1), 16),parseInt(inst.slice(-1))]

    if (dir==0)x+=l
    if (dir==1)y+=l
    if (dir==2)x-=l
    if (dir==3)y-=l
    p += l;
    pts.push([x, y]);
}
let s=p
for (let i = 0; i < pts.length - 1; i++) {
    s += pts[i][0] * pts[i + 1][1] - pts[i + 1][0] * pts[i][1];
}
log(Math.floor(s / 2) + 1);