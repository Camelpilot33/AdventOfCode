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


let p='AKQJT98765432j'.split('').reverse().join('')

function score(hand) {
    let scr=0//5.12
    let high=0
    let c={}
    for (i of hand) c[i]=c[i]?c[i]+1:1

    if (Math.max(...Object.values(c))==5) scr=6
    else if (Math.max(...Object.values(c))==4) scr=5
    else if (Math.max(...Object.values(c))==3&&Object.values(c).includes(2))scr=4
    else if (Math.max(...Object.values(c))==3) scr=3
    else if (Math.max(...Object.values(c))==2&&Object.values(c).sortf()[1]==2) scr=2
    else if (Math.max(...Object.values(c))==2) scr=1
    else scr=0
    high=hand.split('').map(e=>p.indexOf(e)).map(String).map(e=>e.padStart(2,'0')).join('')
    return Number(scr+'.'+high)
}
function s(hand,j) {
    hand=hand.replace(/j/g,j)
    let scr=0
    let c={}
    for (i of hand) c[i]=c[i]?c[i]+1:1
    if (Math.max(...Object.values(c))==5) scr=6
    else if (Math.max(...Object.values(c))==4) scr=5
    else if (Math.max(...Object.values(c))==3&&Object.values(c).includes(2))scr=4
    else if (Math.max(...Object.values(c))==3) scr=3
    else if (Math.max(...Object.values(c))==2&&Object.values(c).sortf()[1]==2) scr=2
    else if (Math.max(...Object.values(c))==2) scr=1
    else scr=0
    return scr
}
function score2(hand) {
    hand=hand.replace(/J/g,'j')
    let scr=Math.max(...p.split('').slice(1).map(e=>s(hand,e)))//5.12
    let c={}
    high=hand.split('').map(e=>p.indexOf(e)).map(String).map(e=>e.padStart(2,'0')).join('')
    return scr+'.'+high
}
let p0=input.split(/\n/g).map(e=>e.split(' '))
let p1=p0.map(e=>[score(e[0]),Number(e[1])]).sort((a,b)=>b[0]-a[0])
    .map((e,_)=>(input.split(/\n/g).length-_)*e[1]).sum()

let p2=p0.map(e=>[score2(e[0]),Number(e[1])]).sort((a,b)=>b[0]-a[0])
    .map((e,_)=>(input.split(/\n/g).length-_)*e[1]).sum()

log(
    p1,
    p2
)