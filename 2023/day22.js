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
const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);
const minAreaRect = (points) => (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const log = (...a) => { for (b of a) console.log(JSON.stringify(b, null, 2)) }
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');

let blocks = input.split("\n").map(line => line.split('~').map(c => c.split(',').map(Number)))
                  .map(v => [...v, [], []]);
const gstate = blocks => blocks.map(b => b[1][2]).join(',');
let dim=3
let map = new Array(10).fill(0).map(e=>new Array(dim).fill(0).map(e=>new Array(dim).fill(0)))
for (i of a) {
    fill(1,i)
}
function fill(val,i) {
    let start=i[0]
    let end=i[1]
    for (let x=start[0];x<=end[0];x++) for (let y=start[1];y<=end[1];y++) for (let z=start[2];z<=end[2];z++)
        map[z][y][x]=val
}

// function frame(exclude=0) {
//     for (i of a) {
//         if (i.join(',')==exclude) continue
//         fill(0,i)
//         //check
//         if (i[0][2]>1&&i[1][2]>1) {
//             let fallable=true
//             for (let x=i[0][0];x<=i[1][0];x++) for (let y=i[0][1];y<=i[1][1];y++) {
//                 if (map[i[0][2]-1][y][x]==1) {
//                     fallable=false
//                 }
//             }
//             if (fallable) {
//                 i[0][2]--
//                 i[1][2]--
//             }
//         }
//         fill(1,i)
//     }
// }

// for (I of a) {
//     let dable=true
//     fill(0,I)
//     for (idx=0;idx<100;idx++) frame(I.join(','))
//     fill(1,I)
//     if (hsher(map)!=hsh) {
//         dable=false
//     }
//     console.log(map.map((e,i)=>e.map(w=>w.join('')).join('\n')).reverse().join('\n\n'))
//     map=hsh.split(',').map(e=>e.split('|').map(w=>w.split('_').map(Number)))
//     // console.log(map.map((e,i)=>e.map(w=>w.join('')).join('\n')).reverse().join('\n\n'))
//     log(I,dable)
//     a=snapshot.split('_').map(e=>e.split('|').map(w=>w.split(',').map(Number)))
//     s+=dable?1:0
// }
function frame(blocks) {
    blocks.forEach((b, i) => {
        if (b[0][2] <= 1) return true;

        let z = b[0][2]-1,
            canFall = true;

        for (let x = b[0][0]; x <= b[1][0]; x++) for (let y = b[0][1]; y <= b[1][1]; y++) {
            if (blocks.some((o, j) => i !== j && o[0][0] <= x && o[1][0] >= x && o[0][1] <= y && o[1][1] >= y && o[0][2] <= z && o[1][2] >= z)) {
                canFall = false;
                break;
            }
        }
        if (canFall) {
            b[1][2]--;
            b[0][2]--;
        }
    })
}
// console.log(
//     // map.map((e,i)=>e.map(w=>w.join('')).join('\n')).reverse().join('\n\n'),
//     s
//     // a[0]
// )
function sup (b) {
    b.forEach((b, i) => {
        if (b[0][2] <= 1) return true;
        
        let sups = [],
            z = b[0][2],
            g = false;
        
        while (z > 1 && !g) {
            z--;
            for (let x = b[0][0]; x <= b[1][0]; x++)
                for (let y = b[0][1]; y <= b[1][1]; y++)
                    for (let sId = 0; sId < b.length; sId++) {
                        let o = b[sId];
                        if (i !== sId && o[0][0] <= x && o[1][0] >= x && o[0][1] <= y && o[1][1] >= y && o[0][2] <= z && o[1][2] >= z) {
                            if (!sups.includes(sId)) sups.push(sId);
                            g = true;
                        }
                    }
        }
        b[2] = sups;
        sups.forEach(supId => {
            if (!b[supId][3].includes(i)) b[supId][3].push(i);
        })
    })
}
//
const fallFull = blocks => {
    let state;
    do {
        state = gstate(blocks);
        frame(blocks);
    } while (state !== gstate(blocks));
    return state;
}
let b=[];
const sums=i=>blocks[i][3].forEach(j=>{if(blocks[j][2].every(k=>b.includes(k))){b.push(j);sums(j)}})
fallFull(blocks);
sup(blocks);
log(blocks.filter(e => (!e[3].length)||!e[3].some(sId => blocks[sId][2].length == 1)).length)
log(blocks.reduce((e, _, i) => {b=[];b.push(i);sums(i);return e+b.length-1;},0))
