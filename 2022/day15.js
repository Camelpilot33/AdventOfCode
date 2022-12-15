const abc = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
});
const firstn = (arr, n) => n >= 0 ? arr.sort((a, b) => b - a).slice(0, n) : [];
const merge = intervals => {
    if (intervals.length < 2) return intervals;

    intervals.sort((a, b) => a[0] - b[0]);

    const result = [];
    let previous = intervals[0];

    for (let i = 1; i < intervals.length; i += 1) {
        if (previous[1] >= intervals[i][0]) {
            previous = [previous[0], Math.max(previous[1], intervals[i][1])];
        } else {
            result.push(previous);
            previous = intervals[i];
        }
    }

    result.push(previous);

    return result;
};
const input = require('fs').readFileSync(String(__dirname).replace(/\\/g, '/') + "/inputs/day15.txt", "utf8").trim().replace(/\r/g, '');
let dat = input.split('\n').map(e => e.split(/[=, :]/g)).map(w => [[w[3], w[6]].map(Number), [w[13], w[16]].map(Number)])
const dist=(x,y,x1,y1)=>Math.abs(x1 - x) + Math.abs(y1 - y)
yn = 2000000
let ans=0
//part2
for (y = 0; y <= 4000000;y++) {
    ranges=[]
    for (d of dat) {
        min=dist(...d[0],...d[1])
        let dx=Math.abs(d[0][1]-y)
        mult=min-dx
        if (mult<0) continue
        ranges.push([d[0][0] - mult, d[0][0] + mult])
    }
    ranges=merge(ranges)
    if (ranges.length!=1) {
        let x=ranges[0][1]+1
        console.log(BigInt(x) * 4000000n+BigInt(y))
        break
    }
}
//part1
// for (let x=-9000000;x<9000000;x++) {
//     for (let d of dat) {
//         if (dist(...d[0],x,y)<=dist(...d[0],...d[1])) {
//             ans++
//             break
//         }
//     }
// }
