const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Array.prototype.sum = () => { return this; };
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } }
});

const input = require('fs').readFileSync(String(__dirname)
    .replace(/\\/g, '/') + "/inputs/day5.txt", "utf8").replace(/\r/g, '')
    .split("\n");


console.log(input);