const input = require('fs').readFileSync(String(__dirname)
    .replace(/\\/g, '/') + "/inputs/day2.txt", "utf8").replace(/\r/g, '')
    .split("\n").map(e => e.split(' '));
let sum = 0;
for (var i of input) {
    switch (i[0]) {
        case "A":
            if (i[1] == "X") sum += 3 + 1;
            if (i[1] == "Z") sum += 0 + 3;
            if (i[1] == "Y") sum += 6 + 2;
            break;
        case "B":
            if (i[1] == "X") sum += 0 + 1;
            if (i[1] == "Z") sum += 6 + 3;
            if (i[1] == "Y") sum += 3 + 2;
            break;
        case "C":
            if (i[1] == "X") sum += 6 + 1;
            if (i[1] == "Z") sum += 3 + 3;
            if (i[1] == "Y") sum += 0 + 2;
            break;
    }
}
console.log(sum);
sum = 0;
for (var i of input) {
    let a = 0;
    switch (i[0]) {
        case "A":
            //x lose y draw z win
            if (i[1] == "X") a += 0 + 3;
            if (i[1] == "Z") a += 6 + 2;
            if (i[1] == "Y") a += 3 + 1;
            break;
        case "B":
            if (i[1] == "X") a += 0 + 1;
            if (i[1] == "Z") a += 6 + 3;
            if (i[1] == "Y") a += 3 + 2;
            break;
        case "C":
            if (i[1] == "X") a += 0 + 2;
            if (i[1] == "Z") a += 6 + 1;
            if (i[1] == "Y") a += 3 + 3;
            break;
    }
    //console.log(a)
    sum += a;
}
//===
//rock ax
//p by
//s cz

console.log(sum);