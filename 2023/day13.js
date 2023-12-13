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

a=input.split('\n\n').map(e=>e.split('\n'))


function check(i,n) {
    for (j=0;j<i[0].length;j++) {//0|#
        // split 2d into left and right around vertical  at j
        let left = i.map(e=>e.slice(0,j+1))
        let right = i.map(e=>e.slice(j+1))
        right = right.map((e)=>e.slice(0,left[0].length))
        left = left.map(e=>e.split('').reverse().join('')).map((e)=>e.slice(0,right[0].length)).map(e=>e.split('').reverse().join(''))
        right = right.map(e=>e.split('').reverse().join(''))
        // console.log(left.join('\n'))
        // console.log(right.join('\n'))
        let dif=0
        for (k in left.join('|')) {
            if (left.join('|')[k]!=right.join('|')[k]) dif++
        }
        // log(dif)
        if (dif==n) {
            // console.log('e')
            return j
        }
        // console.log(right.join('|')==left.join('|'))
    }
}
let [s0,s1]=[0,0]
for (i of a) {
    let q=check(i,0)
    if (q<i[0].length-1) s0+=(q+1)
    else {
        let j=i[0].split('').map((_,c)=>i.map(r=>r[c]).join(''))
        q=check(j,0)
        s0+=(100*(q+1))
    }
    let q1=check(i,1)
    if (q1<i[0].length-1) s1+=(q1+1)
    else {
        let j=i[0].split('').map((_,c)=>i.map(r=>r[c]).join(''))
        q1=check(j,1)
        s1+=(100*(q1+1))
    }
    
}




log(
    s0,
    s1
)