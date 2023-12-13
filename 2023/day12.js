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
const log = (...a)=>{for(b of a)console.log(JSON.stringify(b, null, 2))}
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');



// p1
let a=input.split('\n').map(e=>e.split(' '))
function check(arr) {
    let x=arr[0].split(/\.+/g).map(e=>e.length).filter(e=>e!=0)
    let y=arr[1].split(',').map(Number)
    let t=true
    if (x.length!=y.length) return false
    for (let i=0;i<x.length;i++) {
        if (x[i]!=y[i]) {
            t=false
            break
        }
    }
    return t
}
let s1=0
for (i of a) {
    let q=i[0].split('').filter(e=>e=='?').length
    let i1=i[1]
    let possible=[i[0]]
    for (j=0;j<q;j++) {
        let possible2=[]
        for (k of possible) {
            possible2.push(k.replace('?','.'))
            possible2.push(k.replace('?','#'))
        }
        possible=possible2.slice()
    }
    for (j of possible) {
        if (check([j,i1])) s1++
    }
}
//p2
let b=input.split('\n')

let cache={}
function solve(s, withinRun, remain) {
    let key=(s+":"+withinRun+":"+remain)
    if ( key in cache) return cache[key]
    if (!s) {
        if (withinRun === null && remain.length === 0) {
            return 1;
        }
        if (remain.length === 1 && withinRun !== null && withinRun === remain[0]) {
            return 1;
        }
        return 0;
    }
    let possibleMore = 0;
    for (let ch of s) {
        if (ch === '#' || ch === '?') {
            possibleMore += 1;
        }
    }
    if (withinRun !== null && possibleMore + withinRun < remain.reduce((a, b) => a + b, 0)) {
        return 0;
    }
    if (withinRun === null && possibleMore < remain.reduce((a, b) => a + b, 0)) {
        return 0;
    }
    if (withinRun !== null && remain.length === 0) {
        return 0;
    }
    let poss = 0;
    if (s[0] === '.' && withinRun !== null && withinRun !== remain[0]) {
        return 0;
    }
    if (s[0] === '.' && withinRun !== null) {
        poss += solve(s.slice(1), null, remain.slice(1));
    }
    if (s[0] === '?' && withinRun !== null && withinRun === remain[0]) {
        poss += solve(s.slice(1), null, remain.slice(1));
    }
    if ((s[0] === '#' || s[0] === '?') && withinRun !== null) {
        poss += solve(s.slice(1), withinRun + 1, remain);
    }
    if ((s[0] === '?' || s[0] === '#') && withinRun === null) {
        poss += solve(s.slice(1), 1, remain);
    }
    if ((s[0] === '?' || s[0] === '.') && withinRun === null) {
        poss += solve(s.slice(1), null, remain);
    }
    cache[key]=poss
    return poss;
}

//memoize
let s2=0
let c=0
for (l of b) {
    c++
    // if (c%10==0) console.log((c/10)+"%");
    s=l.split(' ')[0]
    let v = l.split(" ")[1].split(",").map(x => parseInt(x));
    let news = "";
    for (let j = 0; j < 5; j++) {
        news += "?";
        news += s;
    }
    s2 += solve(news.slice(1), null, new Array(5).fill(v).flat());
}
console.log(
    "p1",s1,
    "\np2",s2
)