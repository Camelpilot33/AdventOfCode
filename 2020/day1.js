const fs = require('fs')
let input = fs.readFileSync(String(__dirname).replace(/\\/g,'/')+"/inputs/day1.txt", "utf8")
input=input.split('\n').map(Number)
let k
for (let i of input) {
    let cont=true
    for (let j of input) {
        if (parseInt(i)+parseInt(j)==2020) {
            cont==false
            k=[parseInt(i),parseInt(j)]
            break
        }
    }
    if (!cont) break
}
console.log("Part 1: "+k[0]*k[1])
for (let i of input) {
    let cont=true
    for (let j of input) {
        for (let h of input) {
            if (i+j+h==2020) {
                cont==false
                k=[i,j,h]
                break
            }
        }
        if (!cont) break
    }
    if (!cont) break
}
console.log("Part 2: "+k[0]*k[1]*k[2])