const input = require('fs').readFileSync(String(__dirname).replace(/\\/g,'/')+"/inputs/day6.txt", "utf8").replace(/\r/g,'').split("\n\n")
let [j,k]=[0,0]
let x=input.forEach(e=>j+=[...new Set(e.replace(/\n/g,''))].length),
    y=input.forEach(e=>k+=e.split("\n").map(w=>w.split('')).reduce((a, b) => a.filter(c => b.includes(c))).length)
console.log("1: "+j)
console.log("2: "+k)