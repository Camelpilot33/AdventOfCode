let a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase() + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let input = require('fs').readFileSync(String(__dirname)
    .replace(/\\/g, '/') + "/inputs/day3.txt", "utf8").replace(/\r/g, '')
    .split(/\n/g).map(e => e + "_");
console.log(input.map(e => a.indexOf(e.substring(0, e.length / 2).match(
    new RegExp("[" + e.substring(e.length / 2, e.length) + "]"))[0]
) + 1).reduce((partialSum, a) => partialSum + a, 0));
let b = [];
let j = 0;
let str = "";
for (var i of input) {
    str += i;
    j++;
    if (j == 3) {
        j = 0;
        b.push(str);
        str = "";
    }

}
console.log(b.map(e => e.split("_")).map(e => e.slice(0, e.length - 1))
    .map(e => {
        return a.indexOf(e[1].match(
            new RegExp("[" + e[0] + "]", 'g')
        ).join('').match(
            new RegExp("[" + e[2] + "]", 'g')
        )[0]) + 1;
    }).reduce((partialSum, a) => partialSum + a, 0));