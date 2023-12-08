Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
    rotate: { value: function (n) { n = n % this.length; while (this.length && n < 0) n += this.length; this.push.apply(this, this.splice(0, n)); return this; } },
    firstn: { value: function (n) { return n >= 0 ? this.sort((a, b) => b - a).slice(0, n) : []; } }
});
Number.prototype.mod = function (n) { return ((this % n) + n) % n; };
const mergeint = intervals => {
    if (intervals.length < 2) return intervals;
    intervals.sortf();
    const result = [];
    let previous = intervals[0];
    for (let i = 1; i < intervals.length; i += 1) {
        if (previous[1] >= intervals[i][0]) previous = [previous[0], Math.max(previous[1], intervals[i][1])];
        else {
            result.push(previous);
            previous = intervals[i];
        }
    }
    result.push(previous);
    return result;
};
const minAreaRect = (points) => (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const log = (...a)=>{for(b of a)console.log(JSON.stringify(b, null, 2))}
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');
let a=input.split('\n\n')
let i=a[0].replace(/R/g,'1').replace(/L/g,'0')
let b=a[1].split('\n').map(e=>e.split(' = ')).map(e=>[e[0],e[1].slice(1).slice(0,-1).split(', ')])
// console.log(Object.assign(b.map(e=>e[0]),b.map(e=>e[1])))
let z={}
for (b0 of b) z[b0[0]]=b0[1]


let loc="AAA"
let s=0
while (loc!="ZZZ") {
    // console.log(z["CCC"][i[s.mod(i.length)]])
    // console.log(loc,i[s.mod(i.length)])
    loc=z[loc][i[s.mod(i.length)]]
    s++
}



let pos=Object.keys(z).filter(e=>e[2]=='A')
let ret=[]
for (p of pos) {
    st=0
    while (true) {
        p = z[p][i[st % i.length] === "0" ? 0 : 1];

        
            if (p.endsWith("Z")) {
                break;
            }
        st += 1;
    }
    ret.push(st + 1);
}

function gcd(a, b) 
{ 
    if (b == 0) 
        return a; 
    return gcd(b, a % b); 
}  
function findlcm(arr, n) 
{ 
    // Initialize result 
    let ans = arr[0]; 
 
    // ans contains LCM of arr[0], ..arr[i] 
    // after i'th iteration, 
    for (let i = 1; i < n; i++) 
        ans = (((arr[i] * ans)) / 
                (gcd(arr[i], ans))); 
 
    return ans; 
} 
 
log(s)
log(findlcm(ret,ret.length))