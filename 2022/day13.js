const abc = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
});
const input=require('fs').readFileSync(String(__dirname)
.replace(/\\/g, '/') + "/inputs/day13.txt", "utf8").replace(/\r/g, '')

let input0 = input.split("\n\n").map(e=>e.split('\n'))
let input1 = input.replace(/\n\n/g,'\n').split('\n').map(e=>eval(e))
input1.push([[2]])
input1.push([[6]])
let sum=0
for (let i in input0) {
    let a=eval(input0[i][0])
    let b = eval(input0[i][1])
    if (comp(a,b,false))sum+=Number(i)+1
}
function comp(f,l,t=true) {
    if (typeof (f) == 'number' && typeof (l) == 'number') {
        if (f==l) return -1
        if (f>l) return 0
        return 1
    }
    if (typeof f=='number')f=[f]
    if (typeof l == 'number') l = [l]
    for (let i in f) {
        if (i==l.length) return !t?0:1
        let a=f[i]
        let b=l[i]
        let c=comp(a,b,false)
        if (c==-1) continue
        return !t?c:!c?1:-1
    }
    if (t) return f.length - l.length
    return f.length == l.length ? -1 : f.length < l.length
}
function p (arr) {
    let str = "";
    for (let item of arr) {
        if (Array.isArray(item)) str += p(item);
        else str += item + ", ";
    }
    return '['+str+']';
}
input1 = input1.sort(comp).map(e=>p(e).replace(/ /g,''))
console.log(sum, (input1.indexOf('[[6,]]')+1) * (input1.indexOf('[[2,]]')+1))