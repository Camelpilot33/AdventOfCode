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
let ll=input.split('\n\n')
let seeds=ll[0].split(': ')[1].split(' ').map(Number)
let maps=ll.slice(1).map(e=>e.split('\n')).map(e=>[e[0].split(' ')[0].split('-')[0],e[0].split(' ')[0].split('-')[2],e.slice(1).map(e=>e.split(' ').map(Number))])

//vals is shallow copy
let vals=seeds.slice()
for (let v in vals) {
    for (let map of maps) {
        map=map[2]
        // console.log(map)
        let caught=false
        for (line of map) {
            if (!caught&&line[1] <= vals[v] && vals[v] < line[1]+line[2]) {
                caught=true
                vals[v]+=line[0]-line[1]
            }
        }
        // console.log(caught)
    }
}
console.log("p1",Math.min(...vals))

const seedInts = [];
for (let i = 0; i < seeds.length; i += 2)
    seedInts.push([seeds[i], seeds[i + 1] + seeds[i] - 1]);
const inters = (a, b, c, d) => (b >= c) && (d >= a);
const get_min = (ranges) => {
    let ref=maps.map(e=>e[2])
    for (let i = 0; i < ref.length; i++) {//each map
        let new_ranges = [];
        for (let j = 0; j < ref[i].length; j++) {
            let istart = ref[i][j][1];
            let iend = ref[i][j][1] + ref[i][j][2] - 1;
            let cut_ranges = [];
            for (let r of ranges) {
                if (inters(istart, iend, r[0], r[1])) {
                    let c1 = Math.max(istart, r[0]);
                    let c2 = Math.min(iend, r[1]);
                    new_ranges.push([c1 + ref[i][j][0] - ref[i][j][1], c2 + ref[i][j][0] - ref[i][j][1]]);
                    if (r[0] < c1) {
                        cut_ranges.push([r[0], c1 - 1]);
                    }
                    if (r[1] > c2) {
                        cut_ranges.push([c2 + 1, r[1]]);
                    }
                } else {
                    cut_ranges.push(r);
                }
            }
            ranges = cut_ranges
        }
        ranges=ranges.concat(new_ranges);
    }
    return Math.min(...ranges.map(r => r[0]));
};
console.log("p2",get_min(seedInts));