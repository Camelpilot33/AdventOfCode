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

let [fir, las] = input.split('\n\n')
fir = fir.split('\n').map(e => e.split(': ')).map(e => [e[0][9], Number(e[1])])
let reg = {}
for (i of fir) {
    reg[i[0]] = i[1]
}
las = las.split(': ')[1].split(',').map(Number)
let second = e => {
    if (e <= 3) return e
    if (e == 4) return "A"
    if (e == 5) return "B"
    if (e == 6) return "C"
}

// log(reg,b)

const parseInput = input => {
    const lines = input.split('\n');
    const registers = {};
    let program;

    for (const line of lines) {
        if (line.startsWith('Register')) {
            const [reg, value] = line.split(': ');
            registers[reg.split(' ')[1]] = parseInt(value);
        } else if (line.startsWith('Program:')) {
            program = line.split(': ')[1].split(',').map(x => parseInt(x));
        }
    }
    return { registers, program };
};

const getComboValue = (operand, registers) => {
    if (operand <= 3) return operand;
    if (operand === 4) return registers['A'];
    if (operand === 5) return registers['B'];
    if (operand === 6) return registers['C'];
    return null; // operand 7 is reserved
};

const runProgram = (program, initialRegisters) => {
    const registers = { ...initialRegisters };
    const output = [];
    let ip = 0;

    while (ip < program.length) {
        const opcode = program[ip];
        const operand = program[ip + 1];

        switch (opcode) {
            case 0: // adv
                registers['A'] = Math.floor(registers['A'] / Math.pow(2, getComboValue(operand, registers)));
                ip += 2;
                break;
            case 1: // bxl
                registers['B'] ^= operand;
                ip += 2;
                break;
            case 2: // bst
                registers['B'] = getComboValue(operand, registers) % 8;
                ip += 2;
                break;
            case 3: // jnz
                if (registers['A'] !== 0) {
                    ip = operand;
                } else {
                    ip += 2;
                }
                break;
            case 4: // bxc
                registers['B'] ^= registers['C'];
                ip += 2;
                break;
            case 5: // out
                output.push(getComboValue(operand, registers) % 8);
                ip += 2;
                break;
            case 6: // bdv
                registers['B'] = Math.floor(registers['A'] / Math.pow(2, getComboValue(operand, registers)));
                ip += 2;
                break;
            case 7: // cdv
                registers['C'] = Math.floor(registers['A'] / Math.pow(2, getComboValue(operand, registers)));
                ip += 2;
                break;
        }
    }

    return output.join(',');
};

// Parse and run the program
const { registers, program } = parseInput(input);
// log(registers, program)

// for (i=2**48;i<2**50;i++) {
//     if (i%1000000==0) console.log(i)
//     registers['A'] = i
//     let output = runProgram(program, registers)
//     if (output == las.join(',')) {
//         console.log("SSSSSS   "+i)
//         break
//     }
// }

console.log(runProgram(program, registers));
// log(registers, program)


//2,4,1,5,7,5,1,6,0,3,4,3,5,5,3,0
// let a=34615120
// let b = 0
// let c = 0
// let out = []
// let bin = a => {console.log(a.toString(2).padStart(3,'0'))}

// while (a!=0) {
//     b=a%8; //2 4
//     b=b^5; //1 5
//     c=Math.floor(a/(2**b)); //7 5
//     b=b^6; //1 6
//     a=Math.floor(a/8); //0 3
//     b=b^c; //4 3
//     out.push(b%8)//5 5
// }
// let b = 0
//     let c = 0
//     let out = []
//     while (a != 0) {
//         // console.log("> "+a.toString(2))
//         b = (a % 8) ^ (a>>((a % 8) ^ 0b101))%8 ^ 0b011;
//         out.push(b);
//         a >>=3;
//     }
//     return out.join(',')
// while (a != 0) {
//     console.log("> "+a.toString(2))
//     b = (a % 8) ^ 0b101; // last 3 bits, invert the first and third
//     c=(a>>b)%8 // shifts right by b and takes the last 3 bits
//     bin(b)
//     bin(c)
//     b = b ^ c ^ 0b110; // invert the first and second of b xor c
//     out.push(b % 8);
//     a >>=3;
// }

let bin = (a, n = 3) => a.toString(2).padStart(n, '0')
function run(a) {
    let b = 0
    let c = 0
    let out = []
    while (a != 0) {
        b = a % 8; //2 4
        b = b ^ 5; //1 5
        c = Math.floor(a / (2 ** b)); //7 5
        b = b ^ 6; //1 6
        a = Math.floor(a / 8); //0 3
        b = b ^ c; //4 3
        out.push(b.mod(8))//5 5
    }
    return out.join(',')
}
//a/target
//101
//2,4,1,5,7,5,1,6,0,3,4,3,5,5,3,0
let target = "2,4,1,5,7,5,1,6,0,3,4,3,5,5,3,0".split(',').map(Number)
let val = [3,0,0,2,1,6,5,1,1,0,2,6,4,6,3,2]
let found = val.reduce((a, b) => a * 8 + b, 0)
console.log(bin(found, val.length * 3))
console.log("> "+parseInt(val.map(e=>bin(e)).join(''),2))
let targetval = target[target.length - val.length - 1]
console.log(`Target: ${targetval}`)

for (i = 0; i <= 7; i++) {
    let x = run(8 * found + i)
    if (targetval==x[0])console.log(i,x)
}

console.log(run(105706277661082))

// console.log(run(3));
// "2,4,1,5,7,5,1,6,0,3,4,3,5,5,3,0".split(',').forEach(e=>bin(Number(e)))
// between 8^15 and 8^16

