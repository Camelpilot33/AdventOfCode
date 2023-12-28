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
const gcd = (alpha, beta) => alpha ? gcd(beta % alpha, alpha) : beta;
const lcm = (alpha, beta) => alpha * beta / gcd(alpha, beta);
const minAreaRect = (points) => (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const log = (...alpha) => { for (beta of alpha) console.log(JSON.stringify(beta, null, 2)) }
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');


let a = input.split('\n').map(e => e.replace(/ /g, '').split('@').map(w => w.split(',').map(Number)))
let b = a.map(e => e.map(w => [w[0], w[1]]))


let s=0
lb=200000000000000
ub=400000000000000
for(i=0;i<b.length-1;i++) for (j=i+1;j<b.length;j++) {
    // console.log(i,j,b[i])
    let p=b[i]
    // console.log(p)
    let q=b[j]
    let x=(0-p[1][1]*p[0][0]/p[1][0]+p[0][1]-q[0][1]+q[1][1]/q[1][0]*q[0][0])/(q[1][1]/q[1][0]-p[1][1]/p[1][0])
    let t=(x-p[0][0])/p[1][0]
    let y=p[0][1]+p[1][1]*t

    let temp=p.slice()
     p=q.slice()
     q=temp.slice()
    let x0=(0-p[1][1]*p[0][0]/p[1][0]+p[0][1]-q[0][1]+q[1][1]/q[1][0]*q[0][0])/(q[1][1]/q[1][0]-p[1][1]/p[1][0])
     t0=(x0-p[0][0])/p[1][0]
    // console.log(x,y)
    if (lb<=x&&x<=ub&&lb<=y&&y<=ub&&t>0&&t0>0) {
        // log('e')
        s++
    }
}
//p2: solved with calculator, 9 eqns with 9 variables:
// (x,y,z)+(vx,vy,vz)*t0=(x0,y0,z0)+t0*(vx0,vy0,vz0)
// (x,y,z)+(vx,vy,vz)*t1=(x1,y1,z1)+t1*(vx1,vy1,vz1)
// (x,y,z)+(vx,vy,vz)*t2=(x2,y2,z2)+t2*(vx2,vy2,vz2)
//x,y,z,vx,vy,vz,t0,t1,t2 unknowns
//I chose 3 random points from input

log(
    s,
    "p2 solved elsewhere"
)