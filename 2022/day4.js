const sumArray=e=>e.reduce((p, a) => p + a, 0);
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperty(Array.prototype, 'sortf', {
    value: function (compare) { return [].concat(this).sort(compare); }
});

const input = require('fs').readFileSync(String(__dirname)
.replace(/\\/g, '/') + "/inputs/day4.txt", "utf8").replace(/\r/g, '')
.split("\n").map(e=>e.split(",").map(w=>w.split("-").map(Number)))
let sum=0
let sum1=0
for (var i of input) {
    if (i[0][0] >= i[1][0] && i[0][1] <= i[1][1] || (i[0][0] <= i[1][0] && i[0][1] >= i[1][1])) {
        sum++
    }
    if (
        (i[0][0] >= i[1][0] && i[0][0] <= i[1][1]) ||
        (i[0][1] >= i[1][0] && i[0][1] <= i[1][1]) ||
        (i[1][1] >= i[0][0] && i[1][1] <= i[0][1]) ||
        (i[1][0] >= i[0][0] && i[1][0] <= i[0][1])
    ) {
        sum1++;
    }
}
console.log(sum)
console.log(sum1)