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
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');

console.log(
    input.split('\n').map(e=>e.split('').filter(e=>Number(e)==e).join('')).map(e=>e.length>1?Number(e[0]+e[e.length-1]):Number(e[0]+e[0])).sum()
)



function reverseString(str) {
    return str.split("").reverse().join("");
}
a=input.split('\n')
let s=0
for (b of a){
    let c=b.match(/([0-9]|one|two|three|four|five|six|seven|eight|nine)/g)
    let l=reverseString(b).match(/([0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g)
    // console.log(e)
    d=(c.map(e=>e=="one"?1:e=="two"?2:e=="three"?3:e=="four"?4:e=="five"?5:e=="six"?6:e=="seven"?7:e=="eight"?8:e=="nine"?9:Number(e)).join(''))
    d=String(d)
    p=(l.map(e=>e=="eno"?1:e=="owt"?2:e=="eerht"?3:e=="ruof"?4:e=="evif"?5:e=="xis"?6:e=="neves"?7:e=="thgie"?8:e=="enin"?9:Number(e)).join(''))
    p=String(p)
    // console.log(p)
    // console.log(d[0]+d[d.length-1])
    s+=Number(d[0]+p[0])
}

console.log(s)



