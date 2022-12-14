const abc = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
});
const firstn=(arr, n)=>n >= 0 ? arr.sort((a, b) => b - a).slice(0, n):[];

let input = require('fs').readFileSync(String(__dirname)
.replace(/\\/g, '/') + "/inputs/day14.txt", "utf8").trim().replace(/\r/g, '')
.split('\n').map(e=>e.split(' -> ').map(e=>e.split(',').map(Number)))


let cave0={}
for (parts of input) {
    let [x, y] = [parts[0].shift(), parts[0].shift()]
    parts.shift()
    cave0[x+':'+y]="#"
    for (a of parts) {
        let [dx,dy] = [a[0]-x,a[1]-y]
        if (dx!=0) dx=Math.floor(dx/Math.abs(dx))
        if (dy != 0) dy = Math.floor(dy / Math.abs(dy))
        while (x!=a[0]|y!=a[1]) {
            x+=dx
            y+=dy
            cave0[x + ':' + y]="#"
        }
    }
}
function gen(cave, x,y,max_y) {
    while (!(x+":"+y in cave)) {
        if (y>max_y) return false
        if (!((x + ":" + (y+1)) in cave)) {y++;continue}
        if (!((x - 1) + ":" +(y + 1) in cave)) {x--;y++;continue}
        if (!((x +1) + ":" + (y + 1) in cave)) {x++;y++;continue}
        cave[x + ':' + y]= 'o'
        return true
    }
}
let cave=cave0
ymax=Math.max(...Object.keys(cave0).map(e=>e.split(':')[1]))
ans=0
while (gen(cave0,500,0,ymax)) ans++
console.log(ans)
fl=ymax+2
for (x=500-fl-2;x<500+fl+3;x++) cave[x+':'+fl]='#'
ans=0
while(cave['500:0'] == undefined) {
    gen(cave,500,0,fl)
    ans++
}
console.log(ans)
