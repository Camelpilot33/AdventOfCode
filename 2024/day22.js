// const fs = require('fs');
// const clipboardy = require('clipboardy');

function pr(s) {
    console.log(s);
    clipboardy.writeSync(s);
}

const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up right down left

function ints(s) {
    return s.match(/-?\d+/g).map(Number);
}

const D = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');

function mix(x, y) {
    return x ^ y;
}

function prune(x) {
    return x % 16777216;
}

function prices(x) {
    const ans = [x];
    for (let i = 0; i < 2000; i++) {
        x = prune(mix(x, 64 * x));
        x = prune(mix(x, Math.floor(x / 32)));
        x = prune(mix(x, x * 2048));
        ans.push(x);
    }
    return ans;
}

function changes(P) {
    const result = [];
    for (let i = 0; i < P.length - 1; i++) {
        result.push(P[i + 1] - P[i]);
    }
    return result;
}

function getScores(P, C) {
    const ANS = {};
    for (let i = 0; i < C.length - 3; i++) {
        const pattern = [C[i], C[i + 1], C[i + 2], C[i + 3]];
        const key = pattern.join(',');
        if (!ANS[key]) {
            ANS[key] = P[i + 4];
        }
    }
    return ANS;
}

let p1 = 0;
const SCORE = {};

D.split('\n').forEach(line => {
    const P = prices(parseInt(line));
    p1 += P[P.length - 1];
    const P_mod = P.map(x => x % 10);
    const C = changes(P_mod);
    const S = getScores(P_mod, C);
    for (const [k, v] of Object.entries(S)) {
        if (!SCORE[k]) {
            SCORE[k] = v;
        } else {
            SCORE[k] += v;
        }
    }
});

console.log(p1);
let max = -Infinity;
for (const [k, v] of Object.entries(SCORE)) {
    max = Math.max(max, v);
}
console.log(max);
// console.log(Math.max(...Object.values(SCORE)));