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



let a=input.split('\n').map(e=>e.split(': '))
let paths={}
for (i of a) for (j of i[1].split(' ')){
    paths[i[0]]=!paths[i[0]]?[j]:paths[i[0]].concat([j])
    paths[j]=!paths[j]?[i[0]]:paths[j].concat([i[0]])
}


function pt(dis) {
    let visited=[]
    let s=0
    let l=[]
    for (i of Object.keys(paths)) {
        if (!visited.includes(i)) {
            s++
            l.push(0)
            let q=[i]
            while (q.length) {
                let j=q.shift()
                if (!visited.includes(j)) {
                    l[l.length-1]++
                    visited.push(j)
                    for (let path of paths[j]) {
                        if ((dis[0].includes(path)&&dis[0].includes(j))
                        ||(dis[1].includes(path)&&dis[1].includes(j))
                        ||(dis[2].includes(path)&&dis[2].includes(j))) continue
                        q.push(path)
                    }
                }
            }
        }
    }
    return [s,l]
}

let wires=[]

for (i of Object.keys(paths)) {
    for (j of paths[i]) {
        wires.push([i,j])
    }
}
// I used a visualizer here to find the 3 nodes: https://imgur.com/6Mn6kCn
// console.log(wires.map(e=>e.join('\t')).join('\n'))
// console.log(Object.keys(paths).join('\n'))


log(
    pt([["vph","mfc"],["fql","rmg"],["sfm","vmt"]])[1].prod()
)