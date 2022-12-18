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
let dat = input.split('\n');
let f=(a,b,c)=>a+','+b+','+c
let ans=0
let part=2
function isS(x,y,z) {
    let s=6
    if (dat.includes(f(x + 1, y, z))) s--;
    if (dat.includes(f(x - 1, y, z))) s--;
    if (dat.includes(f(x, y + 1, z))) s--;
    if (dat.includes(f(x, y - 1, z))) s--;
    if (dat.includes(f(x, y, z + 1))) s--;
    if (dat.includes(f(x, y, z - 1))) s--;
    return part==1?false:s==0
}
for (let i of dat) {
    let s = 6
    let [x,y,z]=i.split(',').map(Number)
    if (dat.includes(f(x + 1, y, z)) | isS(x + 1, y, z)) s--
    if (dat.includes(f(x - 1, y, z)) | isS(x - 1, y, z)) s--;
    if (dat.includes(f(x, y + 1, z)) | isS(x , y+1, z)) s--;
    if (dat.includes(f(x, y - 1, z)) | isS(x, y - 1, z)) s--;
    if (dat.includes(f(x, y, z + 1)) | isS(x, y, z+1)) s--;
    if (dat.includes(f(x, y, z - 1)) | isS(x, y, z - 1)) s--;
    ans+=s
}





console.log(ans);