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


let a = input.split('\n').map(e => e.split(''))

let max_len = Number.MIN_VALUE;

// function DFS(graph, src, prev_len, visited) {
//     // Mark the src node visited
//     visited[src] = true;

//     // curr_len is for length of cable
//     // from src city to its adjacent city
//     let curr_len = 0;

//     // Adjacent is pair type which stores
//     // destination city and cable length
//     let adjacent = [];

//     // Traverse all adjacent
//     for (let i = 0; i < graph[src].length; i++) {
//         // Adjacent element
//         adjacent = graph[src][i];

//         // If node or city is not visited
//         if (!visited[adjacent[0]]) {
//             // Total length of cable from
//             // src city to its adjacent
//             curr_len = prev_len + adjacent[1];

//             // Call DFS for adjacent city
//             DFS(graph, adjacent[0], curr_len, visited);
//         }

//         // If total cable length till
//         // now greater than previous
//         // length then update it
//         if (max_len < curr_len) {
//             max_len = curr_len;
//         }

//         // make curr_len = 0 for next adjacent
//         curr_len = 0;
//     }
// }

// n is number of cities or nodes in graph
// cable_lines is total cable_lines among the cities
// or edges in graph
// function longestCable(graph, n) {
//     // call DFS for each city to find maximum
//     // length of cable
//     // initialize visited array with 0
//     let i="0,1"
//     let visited = new Array(n + 1);
//     visited.fill(false);

//     // Call DFS for src vertex i
//     DFS(graph, i, 0, visited);

//     return max_len;
// }

let graph = {};
// for (let i = 0; i < 6 + 1; i++) {
//     graph[i]=[]//.push([]);
// }
for (r in a) for (c in a[r]) {
    r = Number(r)
    c = Number(c)
    if (a[r][c] == '#') continue
    // if (a[r][c] == '>') {
    //     graph[r + ',' + c] = [[r + ',' + (c + 1), 1]]
    //     continue
    // }
    // if (a[r][c] == '<') {
    //     graph[r + ',' + c] = [[r + ',' + (c - 1), 1]]
    //     continue
    // }
    // if (a[r][c] == '^') {
    //     graph[r + ',' + c] = [[(r - 1) + ',' + c, 1]]
    //     continue
    // }
    // if (a[r][c] == 'v') {
    //     graph[r + ',' + c] = [[(r + 1) + ',' + c, 1]]
    //     continue
    // }
    let neigh = []
    //p1:
    // if (r > 0 && ['<','>', '^', '.'].includes(a[r - 1][c])) neigh.push([r - 1, c, 1])
    // if (r < a.length - 1 && ['<','>', 'v', '.'].includes(a[r + 1][c])) neigh.push([r + 1, c, 1])
    // if (c > 0 && ['<', 'v', '^', '.'].includes(a[r][c - 1])) neigh.push([r, c - 1, 1])
    // if (c < a[0].length - 1 && ['>', 'v', '^', '.'].includes(a[r][c + 1])) neigh.push([r, c + 1, 1])
    //p2:
    let all=['<','>', 'v', '^', '.']
    if (r > 0 && all.includes(a[r - 1][c])) neigh.push([r - 1, c, 1])
    if (r < a.length - 1 && all.includes(a[r + 1][c])) neigh.push([r + 1, c, 1])
    if (c > 0 && all.includes(a[r][c - 1])) neigh.push([r, c - 1, 1])
    if (c < a[0].length - 1 && all.includes(a[r][c + 1])) neigh.push([r, c + 1, 1])
    
    for (i of neigh) {
        if (!graph[r + ',' + c]) graph[r + ',' + c] = []
        graph[r + ',' + c].push([i[0] + ',' + i[1], i[2]])
    }
}

// graph={
//     "a":[["b",1]],
//     "b":[["a",1],["c",1]],
//     "c":[["b",1],["d",1],["e",1]],
//     "d":[["c",1]],
//     "e":[["c",1]]
// }
for (i of Object.keys(graph)) {
    if (graph[i].length==2) {
        // let l=false
        // if (i=="3,11") l=true
        // if(l) log(i,graph[i])
        let prev=graph[i][0][0]
        let next=graph[i][1][0]
        let sum=graph[i][0][1]+graph[i][1][1]
        // log(graph[i],graph[prev],graph[next])
        graph[prev]=graph[prev].map(e=>e[0]==i?[next,sum]:e)
        graph[next]=graph[next].map(e=>e[0]==i?[prev,sum]:e)
        // log(graph[i])
        delete graph[i]
    }
}
// log(graph)



// longest path
let iter=0

//comment for p1
let map = new Array(a.length).fill(0).map(e => new Array(a[0].length).fill(0))
function bfs(graph, src) {
    let queue = [[src, 0, null]]
    while (queue.length) {
        if (iter%10000==0) log(iter)
        iter++
        let [node, len,prev] = queue.shift()
        if (len>map[node.split(',')[0]][node.split(',')[1]]) {
            map[node.split(',')[0]][node.split(',')[1]] = len
        }
        for (i of graph[node]) {
            // log(i[0])
            if (i[0] == prev) continue
            // log(">   "+i[0])
            queue.push([i[0], len + 1,node])
        }
    }
}
bfs(graph, "0,1")
log(Math.max(...map.flat()))

// log(longestCable(graph, Object.keys(graph).length - 1));


// log(
//     a
// )