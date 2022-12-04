const input = require('fs').readFileSync(String(__dirname)
    .replace(/\\/g,'/')+"/inputs/day1.txt", "utf8").replace(/\r/g,'')
    .split("\n\n").map(e=>e.split("\n").map(Number).reduce((ps, a) => ps + a, 0))
let l=[0,0,0]
for (let i of input) {
    if (i>l[0]) {
        l[2]=l[1]
        l[1]=l[0]
        l[0]=i
    } else if (i>l[1]) {
        l[2]=l[1]
        l[1]=i
    } else if (i>l[2]) {
        l[2]=i
    }
}

console.log(Math.max(...input))
console.log(l.reduce((ps, a) => ps + a, 0))
