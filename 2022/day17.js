const abc = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
});
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
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, "utf8").trim().replace(/\r/g, '');
//2022 blocks fall
let w=7
let blocks =`####

.#.
###
.#.

###
..#
..#

#
#
#
#

##
##`.split('\n\n').map(e=>e.split('\n').map(e=>e.split('')))
let dims=[[4,1],[3,3],[3,3],[1,4],[2,2]]
for (let i in blocks) {
    let height = blocks[i].length-1
    let m = []
    for (let j in blocks[i]) {
        for (let k in blocks[i][j]) {
            if (blocks[i][j][k]=='#') m.push([Number(j)-height,Number(k)])//r,c
        }
    }
    blocks[i]=m
}
var map=new Array(5).fill().map(e=>new Array(w).fill('.'))
function summon(shape) {
    let bottom=0
    for (let i of map) if (i.includes('#')) bottom++
    let origin = [bottom + dims[shape][1] + 2,2]//r,c
    return origin
}
var cur=[summon(0),0]
function move(dir){ // d,>,<
    if (dir=='d') {
        for (let i of blocks[cur[1]]) {
            let pos = [Number(i[0]) + cur[0][0], Number(i[1]) + cur[0][1]]
            if (pos[0]-1<0||map[pos[0]-1][pos[1]]=='#') return 'cement'
        }
        cur[0][0]--
        return 0
    } if (dir=='>') {
        for (let i of blocks[cur[1]]) {
            let pos = [Number(i[0]) + cur[0][0], Number(i[1]) + cur[0][1]];
            if (pos[1]+2 > w || map[pos[0]][pos[1]+1] == '#') return 0
        }
        cur[0][1]++;
        return 0
    } if (dir == '<') {
        for (let i of blocks[cur[1]]) {
            let pos = [Number(i[0]) + cur[0][0], Number(i[1]) + cur[0][1]];
            if (pos[1]-1 <0 || map[pos[0]][pos[1] - 1] == '#') return 0;
        }
        cur[0][1]--;
        return 0;
    }
}
let po=0
function run(debug=false) {
    for (let i = 0; i < 2; i++)map.push(new Array(w).fill('.'))
    for (let i=0;i<map.length;i++) {
        if (debug) console.log(cur, input[po % input.length])
        move(input[po % input.length])
        po++
        if (move('d')=='cement') {
            for (let i of blocks[cur[1]]) {
                let pos = [Number(i[0]) + cur[0][0], Number(i[1]) + cur[0][1]]
                map[pos[0]][pos[1]]='#'
            }
            break
        }
    }
    cur[1]++
    cur[1]%=5
    cur[0]=summon(cur[1])
}
function getPosition (string, subString, index) {
    return string.split(subString, index).join(subString).length;
}
let str = `.#####.&###.###&##....#&###...#&###....&#......`;
let itr=0
while (getPosition(map.map((e, l) => e.join('')).join('&'), str, 2) / 8>map.length-1) {
    for (let i=0;i<10000;i++)run()
    itr+=10000
    console.log('cl',itr)
}
let pos = getPosition(map.map((e, l) => e.join('')).join('&'), str, 2) / 8;
let newmap = map.map((e, l) => e.join('') + ' ' + l)
for (let i=10;i>=0;i--) {
    console.log(newmap[pos + i]);
}
let bottom = 0;
for (let i of map) if (i.includes('#')) bottom++;
console.log(bottom);