const abc = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
});
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
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, "utf8").trim().replace(/\r/g, '');
let bps = input.split('\n').map(e => e.split('costs ').slice(1).map(w => w.split('and ').map(k => k.replace(/[ A-Za-z\.]/g, '')).map(Number))).map(l => l.map((e, _) => _ == 0 ? [e[0], 0, 0, 0] : _ == 1 ? [e[0], 0, 0, 0] : _ == 2 ? [e[0], e[1], 0, 0] : [e[0], 0, e[1], 0]))
// ore, ore, ore clay, ore obi
function step (t,bp, bots = [1, 0, 0, 0],src=[0,0,0,0],c=0) {//ore,clay,obi,geode
    if (t==0)return src[2]
    let able=[true,true,bots[1]!=0,bots[2]!=0]
    let benefit=[0]
    for (let i=1;i<4;i++) {//path
        if (able[i]) {
            let cost = bps[bp][i].map((e, l) => Math.ceil(bots[l] == 0 ? 0 : e / bots[l]))
            let ttb=Math.max(...cost)
            console.log('|'.repeat(c)+(24-t+1)+' t: ' + t + ', making: ' + i+", in "+ttb, bots, src, src.map((e, l) => e + (ttb * bots[l]) - cost[l]))
            if (t-ttb<0) continue
            benefit.push(step(t - ttb, bp, bots.map((e, l) => l == i ? e + 1 : e), src.map((e, l) => e + (ttb * bots[l]) - cost[l]) ,c+1))
        }
    }
    return src[2]+bots[2]*t
}
// console.log(bps[0])
console.log(step(20,0,[1]))
// console.log(step(24, 0))
// console.log(step(32, 0))

//bp--