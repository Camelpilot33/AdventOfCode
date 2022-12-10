const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
});

const input = require('fs').readFileSync(String(__dirname)
.replace(/\\/g, '/') + "/inputs/day10.txt", "utf8").replace(/\r/g, '')
.split("\n")
let t=1
let x=1
let s=0
let [w,h]=[40,6]
let map=new Array(h).fill(0).map(e=>new Array(w).fill('.'))
let draw=()=>{
    let p = t % 40;
    if (p == x | p == x +1 | p == x +2) map[Math.floor(t / 41)][p - 1] = '#';
}
for (var i in input) {
    if ((t + 20) % 40 == 0) s+=x*t
    if (input[i].split(' ')[0]=='noop') {
        draw()
        t++
        continue
    }
    draw()
    t++
    if ((t + 20) % 40 == 0) s += x * t
    draw()
    t++
    x += Number(input[i].split(' ')[1])
}


//rglrbzau
console.log(s,map.map(e=>e.join('')))