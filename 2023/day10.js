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

let a = input.split('\n').map(e => e.split(''))
let start = [a.findIndex(e => e.includes('S')), a[a.findIndex(e => e.includes('S'))].findIndex(e => e == 'S')]

//farthest point
let q = [start]
let visited = []
let lenarr=new Array(a.length).fill(0).map(e=>new Array(a[0].length).fill(0))
while (q.length) {
    // console.log(q)
    let [x, y] = q.shift()
    if (visited.includes(x + ':' + y)) continue
    visited.push(x + ':' + y)
    switch (a[x][y]) {
        case '|':
            if (["L","J","|"].includes(a[x+1][y])){q.push([x + 1, y]);lenarr[x+1][y]=lenarr[x][y]+1}
            if (["F","7","|"].includes(a[x-1][y])){q.push([x - 1, y]);lenarr[x-1][y]=lenarr[x][y]+1}
            break;
        case '-':
            if (["7","J","-"].includes(a[x][y+1])){q.push([x, y + 1]);lenarr[x][y+1]=lenarr[x][y]+1}
            if (["F","L","-"].includes(a[x][y-1])){q.push([x, y - 1]);lenarr[x][y-1]=lenarr[x][y]+1}
            break;
        case 'F':
            if (["L","J","|"].includes(a[x+1][y])){q.push([x + 1, y]);lenarr[x+1][y]=lenarr[x][y]+1}
            if (["7","J","-"].includes(a[x][y+1])){q.push([x, y + 1]);lenarr[x][y+1]=lenarr[x][y]+1}
            break;
        case '7':
            if (["L","J","|"].includes(a[x+1][y])){q.push([x + 1, y]);lenarr[x+1][y]=lenarr[x][y]+1}
            if (["F","L","-"].includes(a[x][y-1])){q.push([x, y - 1]);lenarr[x][y-1]=lenarr[x][y]+1}
            break;
        case 'L':
            if (["F","7","|"].includes(a[x-1][y])){q.push([x - 1, y]);lenarr[x-1][y]=lenarr[x][y]+1}
            if (["7","J","-"].includes(a[x][y+1])){q.push([x, y + 1]);lenarr[x][y+1]=lenarr[x][y]+1}
            break;
        case 'J':
            if (["F","7","|"].includes(a[x-1][y])){q.push([x - 1, y]);lenarr[x-1][y]=lenarr[x][y]+1}
            if (["F","L","-"].includes(a[x][y-1])){q.push([x, y - 1]);lenarr[x][y-1]=lenarr[x][y]+1}
            break;
        case 'S':
            if (["L","J","|"].includes(a[x+1][y])){q.push([x + 1, y]);lenarr[x+1][y]=lenarr[x][y]+1}
            if (["F","7","|"].includes(a[x-1][y])){q.push([x - 1, y]);lenarr[x-1][y]=lenarr[x][y]+1}
            if (["7","J","-"].includes(a[x][y+1])){q.push([x, y + 1]);lenarr[x][y+1]=lenarr[x][y]+1}
            if (["F","L","-"].includes(a[x][y-1])){q.push([x, y - 1]);lenarr[x][y-1]=lenarr[x][y]+1}
            break;
        default:
            break;
    }
}

let m=lenarr.slice()
m[start[0]][start[1]]=1
m=m.map((e,x)=>e.map((w,y)=>Number(w)>0?(a[x][y]=="S"?"L":a[x][y]):'.').join(''))

//rip floodfill 1981-2023
// let path=lenarr.map(e=>e.map(w=>Number(w>0)).join(''))
// let pathlen=path.map(e=>e.split('').map(Number).sum()).sum()
// let q1=[[0,0],[0,a.length-1]]
// let c=0
// while(q1.length){
//     let [x,y]=q1.shift()
//     if (path[x][y]=='1') continue
//     path[x]=path[x].split('')
//     path[x][y]='1'
//     path[x]=path[x].join('')
//     c++
//     if (x + 1 < a.length) q1.push([x + 1, y]);
//     if (x - 1 >= 0) q1.push([x - 1, y]);
//     if (y + 1 < a[0].length) q1.push([x, y + 1]);
//     if (y - 1 >= 0) q1.push([x, y - 1]);
// }

let s=0
// let [x,y]=[0,0]
for (i of m) {
    // y=0
    let bar=0
    let open=null
    for (j of i) {
        if (j=='|') bar++
        if (j=='F'&&open==null) open="F"
        if (j=='L'&&open==null) open="L"
        if (j=='J'&&open=="F") bar++
        if (j=='7'&&open=="L") bar++
        if (['J','7'].includes(j)) open=null
        if (j=='.') {
            s+=bar%2
        }
    }
}

log(
    lenarr[visited[visited.length - 1].split(':').map(Number)[0]][visited[visited.length - 1].split(':').map(Number)[1]],
    s
)