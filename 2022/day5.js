const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } }
});

let input = require('fs').readFileSync(String(__dirname)
    .replace(/\\/g, '/') + "/inputs/day5.txt", "utf8").replace(/\r/g, '')
    .split("\n\n").map(e => e.split("\n"));
let sn = input[0][input[0].length - 1].replace(/ /g, '').length;
input = [input[0].slice(0, input[0].length - 1), input[1]];
input[0] = input[0].map(e => e.replace(/[? ] {3}/g, "*").replace(/ /g, '').replace(/[\[\]]/g, ''));
let [stack0, stack1] = new Array(2).fill(0).map(e => new Array(sn).fill([]).map(e => []));
for (var i = input[0].length - 1; i >= 0; i--) {
    for (var j in input[0][i]) {
        if (input[0][i][j] != "*") {
            stack0[j].push(input[0][i][j]);
            stack1[j].push(input[0][i][j]);
        }
    }
}
input[1] = input[1].map(e => [e.split(' ')[1], e.split(' ')[3], e.split(' ')[5]]).map(w => w.map(Number));
for (var i of input[1]) {
    let buffer = [];
    for (var j = 0; j < i[0]; j++) {
        buffer.push(stack0[i[1] - 1].pop());
        stack1[i[2] - 1].push(stack1[i[1] - 1].pop());
    }
    stack0[i[2] - 1].push(...buffer.reverse());
}
let [ret0, ret1] = new Array(2).fill('');
for (var i in stack0) {
    ret0 += stack0[i][stack0[i].length - 1];
    ret1 += stack1[i][stack1[i].length - 1];
}


console.log(ret1, ret0);