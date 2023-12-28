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
const log = (...a) => { for (b of a) console.log(JSON.stringify(b, null, 2)) }
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');

//lol how does this even work
let aa = input.split('\n\n')
let A_ = (...a) => a.sum() + 1
let R_ = () => 1
let [x, m, a, s] = new Array(4).fill(0)
eval(aa[0].replace(/:/g, '&&').replace(/,/g, '_(x,m,a,s)||').replace(/{/g, '_=(x,m,a,s)=>').replace(/}/g, '_(x,m,a,s)'))
let set = (aa[1].split('\n').map(e => e.replace(/,/g, '\n').replace(/[{}]/g, '')))
let sum = 0
for (let i of set) {
    eval(i)
    sum += in_(x, m, a, s) - 1
}
log(sum)

const ranges = {
    x: [4000],
    m: [4000],
    a: [4000],
    s: [4000]
};
for (let i = 0; i < input.split('\n').indexOf(""); i++) {
    //get function elements
    let split = input.split('\n')[i].split("{")[1].split("}")[0].split(/:|,/);
    for (let el of split)
        //find bool evaluations
        if (el.match(/(<|>)/)) {
            //log numbers (ranges) to look for, for x,m,a & s
            //if "<" decrement by 1 
            ranges[el.substring(0, 1)].push(+el.substring(2) + (el.substring(1, 2) == ">" ? 0 : -1));
        }
}
x = [...new Set(ranges.x)].sort((a, b) => a - b);
m = [...new Set(ranges.m)].sort((a, b) => a - b);
a = [...new Set(ranges.a)].sort((a, b) => a - b);
s = [...new Set(ranges.s)].sort((a, b) => a - b);
let camul_index = 0
sum = 0
for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < m.length; j++) {
        for (let k = 0; k < a.length; k++) {
            for (let l = 0; l < s.length; l++) {
                //there is a high chance that this is extremely broken
                camul_index++
                if (in_(x[i], m[j], a[k], s[l]) > 1) {
                    sum += (x[i] - x[i - 1] || x[i]) * (m[j] - m[j - 1] || m[j]) * (a[k] - a[k - 1] || a[k]) * (s[l] - s[l - 1] || s[l])
                }
                if (camul_index % 30000000 == 0) {
                    console.log(`${(camul_index / (x.length * m.length * a.length * s.length)).toFixed(4)}%`)
                }
            }
        }
    }
}
log(sum)//takes ~4 min to run on my pc


// let [wk,rate]=input.split('\n\n')
// wk=wk.split('\n').map(e=>e.replace(/\}/g,'').split('{')).map(w=>[w[0],w[1].split(',')])
// let w={}
// for(i of wk){
//     w[i[0]]=i[1]
// }
// rate=rate.split('\n').map(e=>e.replace(/[\{\}]/g,'').split(',').map(e=>e.split('=')[1]).map(Number)).map(e=>new Object({x:e[0],m:e[1],a:e[2],s:e[3]}))

// function work(a,flow) {
//     let wf=w[flow]
//     // return a
//     for (i of wf) {
//         // console.log(i,a)
//         let key;
//         if (!i.includes(':')) key=i
//         else {
//             let left=i.split(':')[0]
//             if (left.includes('>')&&a[left.split(/[\>]/)[0]]>left.split(/[\>]/)[1]
//             ||left.includes('<')&&a[left.split(/[\<]/)[0]]<left.split(/[\<]/)[1]) {
//                 key=i.split(':')[1]
//             } else continue
//         }
//         switch (key) {
//             case "R":
//                 return 0
//                 break
//             case "A":
//                 return Object.values(a).sum()
//                 break
//             default:
//                 // console.log(key)
//                 return work(a,key)
//         }
//     }
// }

// // let s=0
// // for (i of rate) {
// //     s+=work(i,"in")
// // }
// // log(s)

// function work2(flow,ranges) {
//     let wf=w[flow]
//     for (i of wf) {
//         log(i)
//     }
// }


// log(work2("gd"))