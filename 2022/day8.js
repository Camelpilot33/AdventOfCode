const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } }
});
Object.defineProperties(String.prototype, {
    uniq: {value: function () { return new Set(this).size == this.length; }}
});
let input = require('fs').readFileSync(String(__dirname)
.replace(/\\/g, '/') + "/inputs/day8.txt", "utf8").replace(/\r/g, '')
.split("\n").map(e=>e.split('').map(Number))
let s=2*input.length+(2*input[0].length)-4
let p = -1;
for (let i=1;i<input.length-1;i++) {
    for (let j = 1; j < input[0].length - 1; j++) {
        let v = [true, true, true, true]
        for (let k=0;k<j;k++) {
            if (input[i][k]>=input[i][j]) {v[0]=false}
        }
        for (let k = input[0].length-1; k > j; k--) {
            if (input[i][k] >= input[i][j]) { v[1] = false; }
        }
        for (let k = 0; k < i; k++) {
            if (input[k][j] >= input[i][j]) { v[2] = false; }
        }
        for (let k = input.length-1; k > i; k--) {
           if (input[k][j] >= input[i][j]){v[3]=false}
        }
        if (v.includes(true))s++
        v = [0, 0, 0, 0];
        for (let k = j - 1; k >= 0; k--) {
            v[0]++;
            if (input[i][k] >= input[i][j]) { break; }
        }
        for (let k = j + 1; k < input[0].length; k++) {
            v[1]++;
            if (input[i][k] >= input[i][j]) { break; }
        }
        for (let k = i - 1; k >= 0; k--) {
            v[2]++;
            if (input[k][j] >= input[i][j]) { break; }
        }
        for (let k = i + 1; k < input.length; k++) {
            v[3]++;
            if (input[k][j] >= input[i][j]) { break; }
        }
        if (v.prod() > p) p = v.prod();
    }
}




console.log(s,p)