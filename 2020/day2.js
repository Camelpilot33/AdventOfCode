const fs=require('fs')
let input=5
input=fs.readFileSync(__dirname.replace(/\\/g,'/')+'/inputs/day2.txt', {encoding:'utf8', flag:'r'})
input=input.split('\n').map(e=>[...e.split(': ')[0].split(' '),e.split(': ')[1]])
for (var i=0;i<input.length;i++) {
    input[i][0]=input[i][0].split("-").map(Number)
}
let sum=[0,0]
for (var i in input) {
    let len=(input[i][2].match(new RegExp(`${input[i][1]}`,'g')) || []).length
    if(len>=input[i][0][0]&&len<=input[i][0][1])sum[0]++
    if (input[i][1]==input[i][2][input[i][0][0]-1]^input[i][1]==input[i][2][input[i][0][1]-1])sum[1]++
}
console.log("1: "+sum[0]+"\n2: "+sum[1])
