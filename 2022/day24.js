Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
    rotate: { value: function (n) { n = n % this.length; while (this.length && n < 0) n += this.length; this.push.apply(this, this.splice(0, n)); return this; } },
    firstn: { value: function (n) { return n >= 0 ? this.sort((a, b) => b - a).slice(0, n) : []; } }
});
Number.prototype.mod = function (n) {return ((this % n) + n) % n};
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
const input=require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');


let dat = input.split('\n').slice(1, input.split('\n').length - 1).map(e => e.split('').slice(1, e.split('').length - 1))
let bliz=[]
let symbols=['>','v','<','^']
for (i in dat) for (j in dat[i]) if (symbols.includes(dat[i][j])) bliz.push([i + ',' + j, dat[i][j]])
function step() {
    for (i in bliz) {
        if (bliz[i][1] == '>') bliz[i][0] = bliz[i][0].split(',').map(Number).map((e, j) => j == 1 ? (e + 1).mod(dat[0].length) : e).join(',')
        if (bliz[i][1] == '<') bliz[i][0] = bliz[i][0].split(',').map(Number).map((e, j) => j == 1 ? (e - 1).mod(dat[0].length) : e).join(',')
        if (bliz[i][1] == 'v') bliz[i][0] = bliz[i][0].split(',').map(Number).map((e, j) => j == 0 ? (e + 1).mod(dat.length) : e).join(',')
        if (bliz[i][1] == '<') bliz[i][0] = bliz[i][0].split(',').map(Number).map((e, j) => j == 0 ? (e - 1).mod(dat.length) : e).join(',')
    }
}
let pos=[0,0]
t=0
function move() {
    let mov=[1,1,1,1,1]
    for (i of bliz) {
        if (i[0] == pos.map((e, j) => j == 1 ? (e + 1).mod(dat[0].length) : e).join(',') | !pos[1] < dat[0].length-1) mov[0]=0
        if (i[0] == pos.map((e, j) => j == 0 ? (e + 1).mod(dat.length) : e).join(',') | !pos[0] < dat.length - 1) mov[1]=0
        if (i[0]==pos.join(','))mov[2]=0
        if (i[0] == pos.map((e, j) => j == 0 ? (e - 1).mod(dat.length) : e).join(',') | !pos[0] < dat.length - 1) mov[3]=0
        if (i[0] == pos.map((e, j) => j == 1 ? (e - 1).mod(dat[0].length) : e).join(',') | !pos[1] < dat[0].length - 1) mov[4]=0
    }
    let tak=mov.join('').indexOf('1')
    console.log('cl',tak,dat[0].length)
    switch(tak) {
        case 0:
            pos[1]++
            break
        case 1:
            pos[0]++
            break
        case 2:
            break
        case 3:
            pos[0]--
            break
        case 4:
            pos[1]-- 
            break
    }
    t++
}
while (t<100&&!(pos[0]==dat.length-1&pos[1]==dat[0].length-1)) {
    console.log(pos)
    step()
    move()
    
}
console.log(t)