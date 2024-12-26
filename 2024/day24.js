Object.defineProperties(Array.prototype, {
    sum: { value: function () { return this.map(Number).reduce((p, a) => p + a, 0); } },
    sortf: { value: function () { return this.sort((a, b) => a - b); } },
    prod: { value: function () { return this.map(Number).reduce((p, a) => p * a, 1); } },
    rotate: { value: function (n) { n = n % this.length; while (this.length && n < 0) n += this.length; this.push.apply(this, this.splice(0, n)); return this; } },
    firstn: { value: function (n) { return n >= 0 ? this.sort((a, b) => b - a).slice(0, n) : []; } },
    occur: { value: function () { return this.reduce((acc, curr) => { acc[curr] = acc[curr] + 1 || 1; return acc }, {}); } }
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
const gcd = (alpha, beta) => alpha ? gcd(beta % alpha, alpha) : beta;
const lcm = (alpha, beta) => alpha * beta / gcd(alpha, beta);
const minAreaRect = (points) => (Math.max(...points.map(e => e[0])) - Math.min(...points.map(e => e[0]))) * (Math.max(...points.map(e => e[1])) - Math.min(...points.map(e => e[1])));
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const log = (...alpha) => { for (beta of alpha) console.log(JSON.stringify(beta, null, 2)) }
const input = require('fs').readFileSync(`${String(__dirname).replace(/\\/g, '/')}/inputs/${__filename.split('\\')[__filename.split('\\').length - 1].split('.')[0]}.txt`, 'utf8').replace(/\r/g, '');


let [a,b] = input.split('\n\n').map(e=>e.split('\n'))
a=a.map(e=>e.split(': '))
g = b.map(e=>e.replace(/AND/g,'&').replace(/XOR/g,'^').replace(/OR/g,'|').split(' -> '))
const getnum = a=> Object.entries(vals).filter(([key]) => key.startsWith(a)).sort().map(x=>x[1]).reverse().join('')

let vals = {}
function initvals() {
    for(let [key,val] of a){
        vals[key] = Number(val)
    }
    for (let x of g) {
        vals[x[1]] = 0
    }
}

function run(swaplist=[]) {
    initvals()
    let changed = true
    let counter =0
    while (changed) {
        counter++
        if (counter > 1000) return Infinity
        changed = false
        for (const gate of g) {
            let end = gate[1]
            for (let swap of swaplist) {
                if (end == swap[0]) end = swap[1]
                else if (end == swap[1]) end = swap[0]
            }
            let res = eval(gate[0].split(' ').map((e,i)=>i%2?e:vals[e]).join(' '))
            if (vals[end] !== res) {
                vals[end] = res
                changed = true
            }
        }
    }
    const zValues = Object.entries(vals)
        .filter(([key]) => key.startsWith('z'))
        .sort()
        .map(x=>x[1])
        .reverse()
        .join('')
    return parseInt(zValues, 2)
}


initvals()
log(run())
let target = parseInt(((parseInt(getnum('x'),2)+parseInt(getnum('y'),2)).toString(2).padStart(16,'0')),2)
log("> "+Math.abs(run()-target))

function inspect(op, depth = 0) {
    if (depth >= 2) {
        return op;
    }

    const [op1, operator, op2] = g.find(gate => gate[1] === op)[0].split(' ');
    const inspectedOp1 = inspect(op1, depth + 1);
    const inspectedOp2 = inspect(op2, depth + 1);

    if (operator === "&") {
        return `${op}{(${inspectedOp1}) & (${inspectedOp2})}`;
    }
    if (operator === "|") {
        return `${op}{(${inspectedOp1}) | (${inspectedOp2})}`;
    }
    if (operator === "^") {
        return `${op}{(${inspectedOp1}) ^ (${inspectedOp2})}`;
    }
}
log(inspect('z09'))
log(inspect('z20'))
log(inspect('z34'))
log(inspect('z30')) //ddn/kqh



console.log('0'+getnum('x'))
console.log('0'+getnum('y'))
console.log(getnum('z'))
console.log((parseInt(getnum('x'),2)+parseInt(getnum('y'),2)).toString(2).padStart(16,'0'))

//manually changed (bruh)
let swaps = [["nnf", "z09"], ["nhs", "z20"], ["wrc", "z34"], ["kqh", "ddn"]]

swaps = swaps.flat().sort()
console.log(swaps.join(','))

