const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Array.prototype.sum = () => { return this; };
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } }
});

function isUnique (str) {
    return new Set(str).size == str.length;
}

const input = require('fs').readFileSync(String(__dirname)
.replace(/\\/g, '/') + "/inputs/day6.txt", "utf8").replace(/\r/g, '')
let s = new Array(14).fill(-1).map((e,_)=>input[_])
x=-1
for (var i=4;i<input.length;i++) {
    if (isUnique(s.join(''))) {
        x= i
        break
    }
    for (var j=0;j<13;j++) {
        s[j]=s[j+1]
    }
    s[13] = input[i];
}



console.log(x);