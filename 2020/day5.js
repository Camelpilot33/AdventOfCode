const input = require('fs').readFileSync(String(__dirname).replace(/\\/g,'/')+"/inputs/day5.txt", "utf8").replace(/\r/g,'')
    .split("\n").map(e=>parseInt(e.replace(/[BR]/g,'1').replace(/[FL]/g,'0'),2)).sort((a,b)=>a-b)
for (var i=1,j,l=input.length;i<l;i++) if(input[i]!=input[i-1]+1)j=i+input[0]
console.log("1: "+input[l-1]+"\n2: "+j)