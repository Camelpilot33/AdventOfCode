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
const log = a=>{console.log(JSON.stringify(a))}
const minAreaRect = (points) => (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');

let a = input.split('\n').map(e=>e+'.')
let locs=[]
let nums=[]
for (i in a) {
    let cm=""
    let s=-1
    let e=-1
    for (j in a[i]){
        // console.log(a[i][j])
        if (a[i][j]==Number(a[i][j])) {
            cm+=a[i][j]
            if (s==-1) s=j
            e=j
        }
        else if (cm!=""){
            nums.push([Number(i)-1,Number(s)-1,Number(i)+1,Number(e)+1,Number(cm)])
            s=-1
            e=-1
            cm=""
        }
        if(!".0123456789".split('').includes(a[i][j])) locs.push([i,j].map(Number).concat(a[i][j]))
    }
}
let s=0
let gears={}

for (i of nums) {
    // console.log(i)
    let p=false
    for (j of locs) {
        if (i[0]<=j[0]&&j[0]<=i[2]&&i[1]<=j[1]&&j[1]<=i[3]){
            p=true
            let key=j[0]+":"+j[1]
            if (j[2]=='*') gears[key]=gears[key]?[gears[key][0]+1,gears[key][1]*i[4]]:[1,i[4]]
        }
    }
    if (p)s+=i[4]
}
console.log(s)

console.log(Object.values(gears).filter(e=>e[0]==2).map(e=>e[1]).sum())