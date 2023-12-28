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
const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);
const minAreaRect = (points) => (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const log = (...a)=>{for(b of a)console.log(JSON.stringify(b, null, 2))}
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');

let a=input.split('\n').map(e=>e.replace(/S/g,'.').split(''))
let dim=a.length/2-0.5
let n=(26501365-dim)/(2*dim+1)

let q=[[dim,dim,0]]
let visited=[]
while (q.length) {
    let [x,y,p]=q.shift()
    if (!(visited.map(e=>e[0]).includes(x+','+y))) {
        visited.push([x+','+y,p])
        if (x>0&&a[x-1][y]==".") q.push([x-1,y,p+1])
        if (x<a.length-1&&a[x+1][y]==".") q.push([x+1,y,p+1])
        if (y>0&&a[x][y-1]==".") q.push([x,y-1,p+1])
        if (y<a[0].length-1&&a[x][y+1]==".") q.push([x,y+1,p+1])
    }
}
let sqe=visited.filter(e=>e[1]%2==0).length
let sqo=visited.filter(e=>e[1]%2==1).length
let outero=visited.filter(e=>e[1]%2==1&&e[1]>dim).length
let outere=visited.filter(e=>e[1]%2==0&&e[1]>dim).length
log(
    sqe-outere,
    (n+1)**2*sqo+n**2*sqe-(n+1)*outero+n*outere,
)