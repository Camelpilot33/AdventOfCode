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

/*
you -> robot -> robot -> robot -> door
*/
class QueueItem {
    constructor(r, c, presses) {
        this.r = r;
        this.c = c;
        this.presses = presses;
    }
}

const memo = new Map();

const hash = (cr, cc, dr, dc, nr) => `${cr},${cc},${dr},${dc},${nr}`;

// robot->robot
function cheapestDirPad(curr, curc, destr, destc, nrobots) {
    const h = hash(curr, curc, destr, destc, nrobots);
    if (memo.has(h)) return memo.get(h);

    let answer = Infinity;
    const queue = [];
    queue.push(new QueueItem(curr, curc, ""));

    while (queue.length > 0) {
        const visit = queue.shift();

        if (visit.r === destr && visit.c === destc) {
            const rec = cheapestRobot(visit.presses + "A", nrobots - 1);
            answer = Math.min(answer, rec);
            continue;
        }
        //empty
        if (visit.r === 0 && visit.c === 0) continue;

        //valid
        if (visit.r < destr) {
            queue.push(new QueueItem(visit.r + 1, visit.c, visit.presses + "v"));
        }
        if (visit.r > destr) {
            queue.push(new QueueItem(visit.r - 1, visit.c, visit.presses + "^"));
        }
        if (visit.c < destc) {
            queue.push(new QueueItem(visit.r, visit.c + 1, visit.presses + ">"));
        }
        if (visit.c > destc) {
            queue.push(new QueueItem(visit.r, visit.c - 1, visit.presses + "<"));
        }
    }

    memo.set(h, answer);
    return answer;
}

// robot->robot proc
function cheapestRobot(presses, nrobots) {
    if (nrobots === 1) return presses.length;

    let result = 0;
    const padConfig = "X^A<v>";
    let curr = 0, curc = 2; // A

    for (let i = 0; i < presses.length; i++) {
        for (let nextr = 0; nextr < 2; nextr++) {
            for (let nextc = 0; nextc < 3; nextc++) {
                if (padConfig[nextr * 3 + nextc] === presses[i]) {
                    result += cheapestDirPad(curr, curc, nextr, nextc, nrobots);
                    curr = nextr;
                    curc = nextc;
                }
            }
        }
    }

    return result;
}

//init
function cheapest(curr, curc, destr, destc) {
    let answer = Infinity;
    const queue = [];
    queue.push(new QueueItem(curr, curc, ""));

    while (queue.length > 0) {
        const visit = queue.shift();

        if (visit.r === destr && visit.c === destc) {
            const rec = cheapestRobot(visit.presses + "A", p1 ? 3 : 26);
            answer = Math.min(answer, rec);
            continue;
        }
        //empty
        if (visit.r === 3 && visit.c === 0) continue;
        if (visit.r < destr) {
            queue.push(new QueueItem(visit.r + 1, visit.c, visit.presses + "v"));
        }
        if (visit.r > destr) {
            queue.push(new QueueItem(visit.r - 1, visit.c, visit.presses + "^"));
        }
        if (visit.c < destc) {
            queue.push(new QueueItem(visit.r, visit.c + 1, visit.presses + ">"));
        }
        if (visit.c > destc) {
            queue.push(new QueueItem(visit.r, visit.c - 1, visit.presses + "<"));
        }
    }

    return answer;
}

const codes = input.trim().split('\n');
for (var p1 = 1; p1 >=0; p1--) {
    let sum = 0;
    for (const code of codes) {
        let result = 0;
        const padConfig = "789456123X0A";
        let curr = 3, curc = 2;//A

        for (let i = 0; i < code.length; i++) {
            for (let nextr = 0; nextr < 4; nextr++) {
                for (let nextc = 0; nextc < 3; nextc++) {
                    if (padConfig[nextr * 3 + nextc] === code[i]) {
                        result += cheapest(curr, curc, nextr, nextc);
                        curr = nextr;
                        curc = nextc;
                    }
                }
            }
        }

        const numericPart = parseInt(code);
        sum += result * numericPart;
    }
    console.log(sum);
}