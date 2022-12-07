const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Array.prototype.sum = function () { return this.map(Number).reduce((p, a) => p + a, 0); };
Array.prototype.sortf = function () { return this.sort((a, b) => a - b); };
String.prototype.uniq = function () { return new Set(this).size == this.length; };

let input = require('fs').readFileSync(String(__dirname)
.replace(/\\/g, '/') + "/inputs/day7.txt", "utf8").replace(/\r/g, '').replace(/\$ ls\n/g,'')
    .split('\n')

let x={0:[NaN,[]]}//dir:[base,[..elem]]
var dir="0"
for (var i=0;i<input.length;i++) {
    if (input[i][0]=="$"){
        if (input[i][input[i].length-1]=="/") dir="0"
        else if (input[i].split(' ')[2] == "..") 10//dir = x[dir][0]
        else {
            dir = input[i].split(' ')[2]
        }
    } else if (input[i].split(' ')[0]=="dir") {
        x[input[i].split(' ')[1]] = [dir, []]
        x[dir][1].push(input[i].split(' ')[1])
    } else {
        x[dir][1].push(parseInt(input[i].split(' ')[0]))
    }
}
function siz(dir) {
    let sum=0
    for (var i=0;i<x[dir][1].length;i++) {
        if (typeof x[dir][1][i] == "number") sum += x[dir][1][i]
        else sum += siz(x[dir][1][i])
    }
    return sum
} 
let a={}
for (var i of Object.keys(x)) {
    a[i]=siz(i)
}
let sum=0
for (var i of Object.values(a)) {
    if (i <= 100000) sum+=i
}
console.log(sum)
limit = Object.values(a).sum()-4*10**7
let b=[]
for (var i of Object.values(a)) {
    if (i > 100000) b.push(i);
}
console.log(Math.min(...b))