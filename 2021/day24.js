let input = require('fs').readFileSync(String(__dirname).replace(/\\/g,'/')+"/inputs/day24.txt", "utf8").replace(/\r/g,'')
    .split("inp w")
input.shift()
input=input.map(e=>("inp w"+e).split('\n').map(e=>e.split(' '))).map((e,i)=>{
    return [e[4],e[5],e[15]]
    if (e[e.length-1][0]=='') e.pop()
    return e
})
const c=(a,b)=>{
    let n=parseInt(input[a][2][2])+parseInt(input[b][1][2])
    return n
}

let inp=input.map(e=>e[0][2]) 
let stack=[]
let pairs=[]
for (let i in inp){
    if (inp[i]=="1") stack.push(i)
    else {
        pairs.push([stack.pop(),i])
    }
}
let big=new Array(14).fill(9)
let small=new Array(14).fill(1)
for (let pair of pairs) {
    let d=c(...pair)
    if (d>0) big[pair[0]]-=d
    else big[pair[1]]+=d
    if (d>0) small[pair[1]]+=d
    else small[pair[0]]-=d

}
console.log("1: "+big.join(''))
console.log("2: "+small.join(''))