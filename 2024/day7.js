Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
    rotate: { value: function (n) { n = n % this.length; while (this.length && n < 0) n += this.length; this.push.apply(this, this.splice(0, n)); return this; } },
    firstn: { value: function (n) { return n >= 0 ? this.sort((a, b) => b - a).slice(0, n) : []; } },
    occur: { value: function () { return this.reduce((acc, curr) => { acc[curr] = acc[curr] + 1 || 1; return acc }, {}); } }
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

let lines = input.split('\n').map(e => e.split(': ')).map(e=>[e[0],e[1].split(' ').map(Number)])


console.log(
    lines.filter(e=>{
        let val = e[0], nums = e[1]
        for (let i=0;i<2**(nums.length-1);i++){
            let combo = i.toString(2).padStart(nums.length-1, '0')
            let s = nums[0]
            for (let j=0;j<combo.length;j++){
                if (combo[j]==0) s+=nums[j+1]
                else s*=nums[j+1]
            }
            if (s===+val) return true
        }

    }).map(e=>+e[0]).sum()
)
console.log(
    lines.filter(e=>{
        let val = +e[0], nums = e[1]
        let len = nums.length-1
        let max = 3**len
        for (let i=0;i<max;i++){
            let combo = i.toString(3).padStart(len, '0')
            let res = nums[0]
            for (let j=0;j<combo.length;j++){
                if (combo[j]=='0') res+=nums[j+1]
                else if (combo[j]=='1') res*=nums[j+1]
                else res = parseInt(String(res)+String(nums[j+1]))
            }
            if (res==val) return true
        }
    }).map(e=>+e[0]).sum()
)