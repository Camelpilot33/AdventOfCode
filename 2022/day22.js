const { type } = require('os');

const abc = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
    rotate: {value: function (n) { n = n % this.length;while (this.length && n < 0) n += this.length;this.push.apply(this, this.splice(0, n));return this}}
});
Number.prototype.mod = function (n) {
    "use strict";
    return ((this % n) + n) % n;
};
const firstn = (arr, n) => n >= 0 ? arr.sort((a, b) => b - a).slice(0, n) : [];
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
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, "utf8").replace(/\r/g, '');
let buf = input.split('\n\n')[1];
let ins = [buf[0]];
for (let i=1;i<buf.length;i++) {
    if (buf[i - 1] == Number(buf[i - 1]) & buf[i] == Number(buf[i])) ins[ins.length-1]+=buf[i]
    else ins.push(buf[i])
}
ins=ins.map(e=>e==Number(e)?Number(e):e)
let map=input.split('\n\n')[0].split('\n')
let [w,h]=[0,map.length]
for (let i of map) w=w<i.length?i.length:w
let pos=[0,0]
while (map[pos[0]][pos[1]]==' ')pos[1]++
let dir=0
let dirs=['r','d','l','u']

// console.log(map)



for (i of ins) {
    console.log(pos,dir,i)
    if (typeof i == 'number') {
        let p=true
        var n=[NaN,NaN]
        inner: for (j=0;j<i;j++) {
            if (dirs[dir]=='r') {
                if (p)n=[pos[0],(pos[1]+1)]
                p=true
                if (n[1] >= map[pos[0]].length) {
                    if (n[0]<50) {//5> 2<
                        dir=2
                        n=[149-n[0],99]
                    } else if(n[0]<100) {//3> 5^
                        dir=3
                        n=[49,50+n[0]]
                    } else if (n[0]<150) {//2> 5<
                        dir=2
                        n = [149 - n[0], 149]
                    } else {//0> 2^
                        dir=3
                        n=[149,n[0]-100]
                    }
                    p = false
                    j--
                }
                if (map[n[0]][n[1]]=='#') break inner
                else pos=n
            } else if (dirs[dir] =='l') {
                if (p)n = [pos[0], (pos[1] - 1).mod(map[pos[0]].length)]
                p=true
                if ( (n[0]<100&(n[1]<50))|(n[1]<0)) {
                    if (n[0] < 50) {//4< 1>
                        dir = 0;
                        n = [149 - n[0], 0];
                    } else if (n[0] < 100) {//3< 1v
                        dir = 1;
                        n = [0, n[0]-50];
                    } else if (n[0] < 150) {//1< 4>
                        dir = 0;
                        n = [149 - n[0], 50];
                    } else {//0< 4v
                        dir = 1;
                        n = [0, n[0] - 100];
                    }
                    p = false;
                    j--;
                }
                if (map[n[0]][n[1]] == '#') break inner;
                else pos = n
            } else if (dirs[dir] =='u') {
                if(p)n = [(pos[0]-1).mod(map.length), pos[1]]
                p=true//todo
                if (n[0]<0|(n[0]<100&n[1]<50)) {
                    if (n[0] < 50) {//1^ 1>
                        dir = 0;
                        n = [149 - n[0], 0];
                    } else if (n[0] < 100) {//4^ 1v
                        dir = 1;
                        n = [0, n[0] - 50];
                    } else {//5^ 4v
                        dir = 1;
                        n = [0, n[0] - 100];
                    }
                    p = false;
                    j--;
                }
                
                if (map[n[0]][n[1]] == '#') break inner;
                else pos = n
            } else if (dirs[dir] == 'd') {
                n = [(pos[0]+ 1).mod(map.length), pos[1]];
                while (map[n[0]][n[1]] == ' ' | map[n[0]][n[1]] == undefined) n[0] = (n[0] + 1).mod(map.length);
                if (map[n[0]][n[1]] == '#') break inner;
                else pos = n;
            }
        }
    } else if (i == 'R') {
        dir=(dir+1).mod(4)
    } else if (i == 'L') {
        dir = (dir - 1).mod(4);
    }
}

// pos=pos.map(e => ++e);
// console.log(pos)
// console.log(pos[0]*1000+4*pos[1]+dir)
//46R13L28L19R29L38L28R34