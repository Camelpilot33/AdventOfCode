/* AOC HEADER
string abc: alphabet
Array.prototype..
*/
const abc = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
    rotate: { value: function (n) { n = n % this.length; while (this.length && n < 0) n += this.length; this.push.apply(this, this.splice(0, n)); return this; } }
});
Number.prototype.mod = function (n) {
    "use strict";
    return ((this % n) + n) % n;
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
function minAreaRect (points) {
    return (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
}
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, "utf8").replace(/\r/g, '');
var elves=[]
var map = input.split('\n').map(e=>e.split(''))
let rounds=10
for (i=0;i<rounds;i++) {
    for (j=0;j<map.length;j++)map[j]=['.',...map[j],'.']
    map.unshift('.'.repeat(map[0].length).split(''))
    map.push('.'.repeat(map[1].length).split(''))
}
map =map.map((e, r) => e.map((w, c) => { if (w == '#') elves.push(r + ':' + c); return w; }));

let steps='NSWE'.split('')
function check(ps,n,consider) {
    if (steps[ps] == 'N') {
        if (map[n[0] - 1][n[1] - 1] == '.' & map[n[0] - 1][n[1]] == '.' & map[n[0] - 1][n[1] + 1] == '.') consider.push((n[0] - 1) + ':' + n[1]);
        else return 1
        return 0
    } else if (steps[ps] == 'S') {
        if (map[n[0] + 1][n[1] - 1] == '.' & map[n[0] + 1][n[1]] == '.' & map[n[0] + 1][n[1] + 1] == '.') consider.push((n[0] + 1) + ':' + n[1]);
        else return 1
        return 0
    } else if (steps[ps] == 'W') {
        if (map[n[0] + 1][n[1] - 1] & map[n[0] - 1][n[1] - 1] & map[n[0]][n[1] - 1]) consider.push(n[0] + ':' + (n[1] - 1));
        else return 1
        return 0
    } else if (steps[ps] == 'E') {
        if (map[n[0] + 1][n[1] + 1] & map[n[0] - 1][n[1] + 1] & map[n[0]][n[1] + 1]) consider.push(n[0] + ':' + (n[1] + 1));
        else return 1
        return 0
    }
    return 1
}
function step() {
    let consider=[]
    for (e of elves) {
        let n=e.split(':').map(Number)
        let ps=0//dont use map
        if (map[n[0] - 1][n[1] - 1] == '.' & map[n[0] - 1][n[1]] == '.' & map[n[0] - 1][n[1] + 1] == '.'
            & (map[n[0] + 1][n[1] - 1] == '.' & map[n[0] + 1][n[1]] == '.' & map[n[0] + 1][n[1] + 1] == '.')
            & (map[n[0] + 1][n[1] - 1] & map[n[0] - 1][n[1] - 1] & map[n[0]][n[1] - 1])
            & (map[n[0] + 1][n[1] + 1] & map[n[0] - 1][n[1] + 1] & map[n[0]][n[1] + 1])) {consider.push(n[0]+':'+n[1]);continue
        }
        let cou=0
        while (check(ps,n,consider)==1&cou<4) {ps=(ps+1).mod(4);cou++}
        if (cou==4)consider.push(n[0] + ':' + n[1])
    }
    for (i in elves) {
        let cons=consider[i]
        let count=0
        for (j in consider) if (consider[j]==cons) count++
        if (count>1) continue
        elves[i]=cons
    }
    steps.rotate(1);
    let [r,c]=[map.length,map[0].length]
    map=new Array(r).fill().map(e=>new Array(c).fill('.'))
    for (e of elves) {
        let xy = e.split(':').map(Number)
        map[xy[0]][xy[1]]='#'
    }
}
console.log(elves)
for (E=0;E<10;E++) {step()}
console.log(minAreaRect(elves.map(e=>e.split(':').map(Number)))-elves.length)