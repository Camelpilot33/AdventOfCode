const fs = require('fs')
let input = fs.readFileSync(String(__dirname).replace(/\\/g,'/')+"/inputs/day3.txt", "utf8").split("\n")
let [sum,len]=[0,input[0].length-1]
function checkslope(r,d) {
    let sum=0
    for (let i=0;i<input.length;i+=d) {
        if (input[i][(r*i/d)%len]=='#') sum++
    }
    return sum
}
console.log("1: "+checkslope(3,1))
let slopes=[[1,1],[3,1],[5,1],[7,1],[1,2]]
let prod=1
for (var j of slopes) {
    prod*=checkslope(...j)
}
console.log("2: "+prod)