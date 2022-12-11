const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
});

const input = require('fs').readFileSync(String(__dirname)
    .replace(/\\/g, '/') + "/inputs/day11.txt", "utf8").replace(/\r/g, '')
    .split("\n\n").map(e => e.split('\n'));


let c1 = new Array(input.length).fill(0);
let c2 = new Array(input.length).fill(0);


function round (a,p1=false) {
    for (var i in m) {
        while (m[i].length > 0) {
            m[i][0] = eval(m[i][0].toString() + o[i][0] + (o[i][1] == 'old' ? m[i][0] : o[i][1]));
            if (p1)m[i][0] = Math.floor(m[i][0]/3)
            a[i]++;
            if (m[i][0] % t[i][0] == 0) m[t[i][1]].push(m[i][0] % gcd);
            else m[t[i][2]].push(m[i][0] % gcd);
            m[i].shift();
        }
    }
    return a;
}

let m = new Array(input.length).fill(0).map((e, _) => input[_][1].split(":")[1].replace(/ /g, '').split(',').map(Number));
let o = new Array(input.length).fill(0).map((e, _) => input[_][2].split('= ')[1].split(' ').slice(1));
let t = new Array(input.length).fill(0).map((e, _) => [Number(input[_][3].split('by ')[1]), Number(input[_][4].split('key ')[1]), Number(input[_][5].split('key ')[1])]);
let gcd = 1;
for (var i of t) { gcd *= i[0]; }
for (i = 0; i < 20; i++)c1 = round(c1,true);
m = new Array(input.length).fill(0).map((e, _) => input[_][1].split(":")[1].replace(/ /g, '').split(',').map(Number));
for (i = 0; i < 10000; i++)c2 = round(c2);
console.log(c1.sortf()[c1.length - 1] * c1.sortf()[c1.length - 2]);
console.log(c2.sortf()[c2.length - 1] * c2.sortf()[c2.length - 2]);