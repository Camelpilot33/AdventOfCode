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


const width = 101;
const height = 103;
const seconds = 100;
function move(r, seconds, width, height) {
    const [px, py] = r.position;
    const [vx, vy] = r.velocity;
    const newX = (px + vx * seconds) % width;
    const newY = (py + vy * seconds) % height;
    return [(newX + width) % width, (newY + height) % height];
}

function countquad(robots, width, height) {
    const midX = Math.floor(width / 2);
    const midY = Math.floor(height / 2);
    const quadrants = [0, 0, 0, 0];

    robots.forEach(([x, y]) => {
        if (x === midX || y === midY) return;
        quadrants[(x >= midX) + 2 * (y >= midY)]++;
    });

    return quadrants;
}

function logMap(robots, width, height, frame) {
    const map = Array.from({ length: height }, () => Array(width).fill('.'));
    robots.forEach(([x, y]) => {
        map[y][x] = '#';
    });
    map.forEach(row => console.log(row.join('')));
    console.log(`Frame: ${frame}`);
    console.log('\n');
}

const robots = input.trim().split('\n').map(line => {
    const [p, v] = line.split(' ').map(part => part.split('=')[1].split(',').map(Number));
    return { position: p, velocity: v };
});
//2,105,208--2+103x
let second =2;//1351
// setInterval(() => {
//     const finalPositions = robots.map(robot => moveRobot(robot, second, width, height));
//     logMap(finalPositions, width, height, second);
//     second+=103;
// }, 200);
// for (let second = 0; second <= seconds; second++) {
//     const finalPositions = robots.map(robot => moveRobot(robot, second, width, height));
//     logMapWithDelay(finalPositions, width, height, second);
// }

const finalPositions = robots.map(robot => move(robot, seconds, width, height));
const quadrants = countquad(finalPositions, width, height);
const safetyFactor = quadrants.reduce((acc, val) => acc * val, 1);
console.log(safetyFactor);
logMap(robots.map(robot => move(robot, 6285, width, height)), width, height, 6285);