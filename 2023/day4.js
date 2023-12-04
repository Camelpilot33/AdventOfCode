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

let a=input.split('\n').map(e=>e.split(": ")[1].split(' | ').map(e=>e.trim()).map(e=>e.split(/ +/g).map(Number)))
let s=0
for (i of a) {
    let winning=i[0]
    let urs=i[1]
    let sc=0
    for (j of urs) {
        // console.log(j,winning)
        if (winning.includes(j)) sc++
    }
    // console.log(sc,sc>0?2**(sc-1):0)
    s+=sc>0?2**(sc-1):0
}
log(
    s
)
let lines=input.split('\n')
let mult = new Array(lines.length).fill(1);
let s2 = 0;

for (let i = 0; i < lines.length; i++) {
	let winning = a[i][0]
	let have = a[i][1]
	have = have.filter(x => winning.includes(x));
	const mm = mult[i];
	for (let j = i + 1; j < Math.min(i + have.length + 1, lines.length); j++) {
		mult[j] += mm;
	}
	
	s2 += mm;
}

log(s2);