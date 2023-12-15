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


const hash=x=>x.split('').map(e=>e.charCodeAt(0)).reduce((p,a)=>((p+a)*17)%256,0)
let a=input.split(',').map(e=>hash(e)).sum()
let b=input.split(',')

let boxes=new Array(256).fill(0).map(e=>new Object({}))

for (i of b) {
    let h=hash(i.split(/[=-]/g)[0])
    if (i.includes('=')) {
        boxes[h][i.split('=')[0]]=[Number(i.split('=')[1]),Object.keys(boxes[h]).includes(i.split("=")[0])?boxes[h][i.split('=')[0]][1]:Object.keys(boxes[h]).length+1]
        // console.log(Object.keys(boxes[h]),Object.keys(boxes[h]).includes(i.split("=")[0]))
    } else if (i.includes('-')) {
        // console.log(boxes[h][i.split('-')[0]])
        if (boxes[h][i.split('-')[0]]!==undefined) {
            let idx=boxes[h][i.split('-')[0]][1]
            for (j of Object.keys(boxes[h]).filter(e=>boxes[h][e][1]>idx)) {
                // console.log('e')
                boxes[h][j][1]--
            }
        }
        delete boxes[h][i.split('-')[0]]
    }
    // console.log(boxes[h],i)
}

console.log(
    a,
    boxes.reduce((a,b,i)=>(a+Object.values(b).map(e=>(i+1)*(e[1])*(e[0])).sum()),0),
)