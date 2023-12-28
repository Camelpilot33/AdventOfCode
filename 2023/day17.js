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
//edit some stuff to get p1

class PQ {
    swap(a, b) { //swap heap[a] and heap[b], then return b
        let tmp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = tmp;
        return b;
    }
    parent(pos) {
        return Math.floor((pos - 1) / 2);
    }
    higherChild(pos) {
        if (pos >= (this.heap.length - 2) / 2) return null;
        if (this.cmp(pos * 2 + 1, pos * 2 + 2) < 0) return pos * 2 + 2;
        return pos * 2 + 1;
    }
    cmp(p1, p2) {
        return this.metr(this.heap[p1], this.heap[p2]);
    }
    constructor(metr) {
        if (metr == undefined) metr = (a, b) => a - b;

        this.metr = metr;
        this.heap = [];
    }
    push(item) {
        let itempos = this.heap.length;
        this.heap.push(item);

        while (itempos > 0 && this.cmp(itempos, this.parent(itempos)) > 0) {
            itempos = this.swap(itempos, this.parent(itempos));
        }
    }
    pop() {
        this.swap(0, this.heap.length - 1);
        let pos = 0;
        let item = this.heap.pop();

        while (this.higherChild(pos) && this.cmp(pos, this.higherChild(pos)) < 0) {
            pos = this.swap(pos, this.higherChild(pos));
        }
        return item;
    }
}
let inp = input.split('\n')
let pq = new PQ((a, b) => b[0] - a[0]);
pq.push([0, 0, 0, 0]); //dist,y,x,dir
pq.push([0, 0, 0, 1]); //dir: 0 is horiz, 1 is vert
let seen = {};
let ret = 0;
let gm = (y, x) => {
    if (y < 0 || y >= inp.length || x < 0 || x >= inp[y].length) return 1e99;
    return +(inp[y][x]);
}
while (pq.heap.length > 0) {
    let [dist, y, x, dir] = pq.pop();
    //console.log([dist,y,x,dir])
    if (y < 0 || y >= inp.length || x < 0 || x >= inp[y].length) continue;
    if (seen[`${y};${x};${dir}`] != undefined) continue;
    seen[`${y};${x};${dir}`] = dist;
    if (y == inp.length - 1 && x == inp[y].length - 1) {
        console.log(dist);
        break
    }
    let cd;
    cd = dist;
    for (let i = 1; i <= 10; i++) {
        if (dir==0){cd += gm(y, x + i);if (cd > 1e90) break;}
        else {cd += gm(y + i, x);if (cd==Infinity) break;}
        if (i < 4) continue;
        if (dir==0)pq.push([cd, y, x + i, 1]);
        else pq.push([cd, y + i, x, 0]);
    }
    cd = dist;
    for (let i = 1; i <= 10; i++) {
        if (dir==0){cd += gm(y, x - i);if (cd==Infinity) break;}
        else {cd += gm(y - i, x);if (cd==Infinity) break;}
        if (i < 4) continue;
        if (dir==0)pq.push([cd, y, x - i, 1]);
        else pq.push([cd, y - i, x, 0]);
    }
}