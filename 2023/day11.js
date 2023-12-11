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

let a=input.split('\n')

// for (i=0;i<a.length;i++) {
//     if (!a[i].split('').includes('#')){
//         //add an extra row after i
//         a.splice(i+1,0,'.'.repeat(a[i].length))
//         i++
//     }
// }
// //make b the nth column of a
// for (i=0;i<a[0].length;i++) {
//     let b=[]
//     for (j=0;j<a.length;j++) {
//         b.push(a[j][i])
//     }
//     if (!b.includes('#')) {
//         //add an extra column after i
//         for (j=0;j<a.length;j++) {
//             a[j]=a[j].slice(0,i+1)+'.'+a[j].slice(i+1)
//         }
//         i++
//     }
//     // console.log(b)
// }
//loop through each pair of coordinates
let c=[]
for (i=0;i<a.length;i++) {
    for (j=0;j<a[i].length;j++) {
        if (a[i][j]==='#') {
            c.push([i,j])
        }
    }
}

let emptyrows=[]
let emptycols=[]
for (i=0;i<a.length;i++) {
    if (!a[i].split('').includes('#')){
        emptyrows.push(i)
        // i++
    }
}
for (i=0;i<a[0].length;i++) {
    // if (i==76) console.log(a.map(e=>e[i]))
    if (!a.map(e=>e[i]).includes('#')){
        emptycols.push(i)
        // i++
    }
}
// loop through any two in c
let s=0
let s1=0
for (i=0;i<c.length;i++) {
    for (j=i+1;j<c.length;j++) {
        s+=dist(c[i],c[j],1)//Math.abs(c[i][0]-c[j][0])+Math.abs(c[i][1]-c[j][1])
        s1+=dist(c[i],c[j],999999)
    }
}


function dist(x,y,l) {
    d=Math.abs(x[0]-y[0])+Math.abs(x[1]-y[1])
    for (p of emptycols) {
        if ((x[1]<p && y[1]>p)||(x[1]>p && y[1]<p)) {
            d+=l
        }
    }
    for (p of emptyrows) {
        if ((x[0]<p && y[0]>p)||(x[0]>p && y[0]<p)) {
            d+=l
        }
    }
    return d
}




log(
    s,s1
)