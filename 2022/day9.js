const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
});

const input = require('fs').readFileSync(String(__dirname)
    .replace(/\\/g, '/') + "/inputs/day9.txt", "utf8").replace(/\r/g, '')
    .split("\n").map(e => e.split(' ')).map(e => [e[0], Number(e[1])]);
function run (n) {
    let [pos, visited] = [new Array(n--).fill(0).map(e => [0, 0]), []];
    for (var i of input) {
        for (var j = 0; j < i[1]; j++) {
            pos[0][(i[0] == "R" | i[0] == "L") ? 0 : 1] += (i[0] == "R" | i[0] == "U") ? 1 : -1;
            for (var k = 0; k < n; k++) {
                let dx = pos[k][0] - pos[k + 1][0];
                let dy = pos[k][1] - pos[k + 1][1];
                if (Math.abs(dx) > 1) {
                    pos[k + 1][0] += dx > 0 ? 1 : -1;
                    if (Math.abs(dy) != 0) pos[k + 1][1] += dy > 0 ? 1 : -1;
                } else if (Math.abs(dy) > 1) {
                    pos[k + 1][1] += dy > 0 ? 1 : -1;
                    if (Math.abs(dx) != 0) pos[k + 1][0] += dx > 0 ? 1 : -1;
                }
            }
            if (!visited.includes(pos[n][0] + ":" + pos[n][1])) visited.push(pos[n][0] + ":" + pos[n][1]);
        }
    }
    return visited.length;
}


console.log(run(2), run(10));