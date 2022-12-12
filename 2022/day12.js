const abc = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
});

let input = require('fs').readFileSync(String(__dirname)
.replace(/\\/g, '/') + "/inputs/day12.txt", "utf8").replace(/\r/g, '')
.split("\n").map(e=>e.split('').map(e=>abc.indexOf(e)))
let s = [0,0]
let e = [2,5]
console.log(abc[input[s[0]][s[1]]], abc[input[e[0]][e[1]]])
input[s[0]][s[1]]=1
input[e[0]][e[1]]=26
var R=input.length
var C=input[0].length
function bfs(part) {
    Q=[]
    for (let r=0;r<R;r++) {
        for (let c=0;c<C;c++) {
            if ((part==1&r==s[0]&c==s[1])|(part==2&input[r][c]==1)) {
                Q.push([[r,c],0])
            }
        }
    }
    let S=new Set()
    while (Q.length>0){
        a=Q.shift()
        let [r,c]=a[0]
        d=a[1]
        if (r+":"+c in S) return d
        for (b of [[-1, 0], [0, 1], [1, 0], [0, -1]]) {
            dr=b[0]
            dc=b[1]
            rr=r+dr
            cc=c+dc
            if (0 <= rr & rr < R & 0 <= cc & cc < C) {
                if (input[rr][cc] <= 1 + input[r][c])Q.push([[rr,cc],d+1])
            } 
        }
    }
}


console.log(bfs(1));