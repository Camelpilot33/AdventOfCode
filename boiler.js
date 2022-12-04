const sumArray = e => e.reduce((p, a) => p + a, 0);
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperty(Array.prototype, 'sortf', {
    value: function (compare) { return [].concat(this).sort(compare); }
});

const input = require('fs').readFileSync(String(__dirname)
    .replace(/\\/g, '/') + "/inputs/day_.txt", "utf8").replace(/\r/g, '')
    .split("\n");


console.log(input.sortf());