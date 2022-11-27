let input = require('fs').readFileSync(String(__dirname).replace(/\\/g,'/')+"/inputs/day24.txt", "utf8").replace(/\r/g,'')
    .split("inp w")
input.shift()
input=input.map(e=>("inp w"+e).split('\n').map(e=>e.split(' '))).map((e,i)=>{
    return [e[4],e[5],e[15]]
    if (e[e.length-1][0]=='') e.pop()
    return e
})
console.log(" n",input[0].map(e=>e[0]).join(' '.repeat(8)))
for (let i in input) {
    if(i<10)i=" "+i
    console.log(i,input[parseInt(i)]
        .map(e=>e.slice(1)[1]
            .padStart(5,' ').padEnd(10,' ')
        ).join('')
    )
}
console.log("\n\n")
const c=(a,b)=>{
    let n=String(parseInt(input[a][2][2])+parseInt(input[b][1][2]))
    console.log(
        "w"+a,
        n[0]=="-"?n:"+"+n,
        "= w"+b
    )
}
//pairings
c(0,13)
c(1,12)
c(2,3)
c(4,5)
c(6,7)
c(8,11)
c(9,10)
//console.log(input)