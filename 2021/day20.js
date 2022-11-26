const read = require('fs').readFileSync(String(__dirname).replace(/\\/g,'/')+"/inputs/day20.txt", "utf8").replace(/\r/g,'')
    .split("\n\n")
const inst=read[0].replace(/\n/g,'')
var ex="."
function getn(r,c,map=input) {
    let n=[...new Array(9).fill(null)]
    n[0]=(r==0)|(c==0)?ex:map[r-1][c-1]
    n[1]=(r==0)?ex:map[r-1][c]
    n[2]=(r==0)|(c==width-1)?ex:map[r-1][c+1]
    n[3]=(c==0)?ex:map[r][c-1]
    n[4]=map[r][c]
    n[5]=(c==width-1)?ex:map[r][c+1]
    n[6]=(r==height-1)|(c==0)?ex:map[r+1][c-1]
    n[7]=(r==height-1)?ex:map[r+1][c]
    n[8]=(r==height-1)|(c==width-1)?ex:map[r+1][c+1]
    return parseInt(n.join('').replace(/\./g,0).replace(/\#/g,1),2)
}
function run(n,map) {
    ex="."
    let prevmap=map
    let curmap=new Array(height).fill(null).map(w=>new Array(width).fill(null))
    for (let i=0;i<n;i++) {
        for (let row=0;row<height;row++) {
            for (let col=0;col<width;col++) {
                curmap[row][col]=inst[getn(row,col,prevmap)]
            }
        }
        ex=(i%2)&(inst[0]=="#")?inst[inst.length-1]:inst[0]
        prevmap=curmap
        curmap=new Array(height).fill(null).map(w=>new Array(width).fill(null))
    }
    return prevmap
}

//PART1
input=read[1].split("\n").map(e=>".."+e+"..")
let buf=".".repeat(input[0].length)
input=[buf,buf,...input,buf,buf]//.join("\n")
let [width,height] = [input[0].length,input.length]
console.log("1: "+run(2).map(e=>e.join('')).join('\n').match(/\#/g).length)

//PART2
const t=50
input=read[1].split("\n").map(e=>".".repeat(t)+e+".".repeat(t))
buf=".".repeat(input[0].length)
input=[...new Array(t).fill(buf),...input,...new Array(t).fill(buf)]//.join("\n")
ex="."
width=input[0].length
height=input.length
console.log("2: "+run(t,input).map(e=>e.join('')).join('\n').match(/\#/g).length)