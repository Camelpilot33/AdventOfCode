Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
    rotate: { value: function (n) { n = n % this.length; while (this.length && n < 0) n += this.length; this.push.apply(this, this.splice(0, n)); return this; } },
    firstn: { value: function (n) { return n >= 0 ? this.sort((a, b) => b - a).slice(0, n) : []; } }
});
Number.prototype.mod = function (n) { return ((this % n) + n) % n; };
const intervals = {
    union: inter => {
        if (inter.length < 2) return inter;
        inter.sortf();
        const result = [];
        let previous = inter[0];
        for (let i = 1; i < inter.length; i += 1) {
            if (previous[1] >= inter[i][0]) previous = [previous[0], Math.max(previous[1], inter[i][1])];
            else {
                result.push(previous);
                previous = inter[i];
            }
        }
        result.push(previous);
        return result;
    },
    intersection: inter => { let j = [Math.max(...inter.map(e => e[0])), Math.min(...inter.map(e => e[1]))]; return j[0] > j[1] ? -1 : j; }
};
const minAreaRect = (points) => (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');

let dat = input.split('\n');
let sum = 0;
let num=e=>e=='-'?-1:e=='='?-2:Number(e)
for (let i of dat) {
    let l = i.length - 1;
    i = i.split('').map((e, j) => num(e) * (5 ** (l - j))).sum();
    sum += i;
}
function f (n) {
    let m = n % 5;
    return n === 0 ? [] :
        m == 0 ? ["0"].concat(f(Math.floor(n / 5))) :
            m == 1 ? ["1"].concat(f(Math.floor(n / 5))) :
                m == 2 ? ["2"].concat(f(Math.floor(n / 5))) :
                    m == 3 ? ["="].concat(f(Math.floor((n + 2) / 5))) :
                        ["-"].concat(f(Math.floor((n + 1) / 5)));
}
console.log(sum)
console.log(f(sum).reverse().join(""));