const abc = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
});
Number.prototype.mod = function (n) {
    "use strict";
    return ((this % n) + n) % n;
};
Array.prototype.rotate = function (n) {
    n = n % this.length;
    while (this.length && n < 0) n += this.length;
    this.push.apply(this, this.splice(0, n));
    return this;
};
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
let dat=input.split('\n').map(Number)
function array_move (arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};
f=n=>n<0?n-1:n
function mix(nums) {
    for (n of nums) {
        // n=nums[0]
        idx=nums.indexOf(n)
        nums.rotate(idx)
        nums.shift()
        nums.rotate(n)
        nums.unshift(n)
    }
    return nums
}
function p1 (s) {
    s=mix(s)
    z=s.indexOf(0)
    console.log(s)
    return s[(z + 1000).mod(s.length)] + s[(z + 2000).mod(s.length)] + s[(z + 3000).mod(s.length)];
}


console.log(p1(dat))