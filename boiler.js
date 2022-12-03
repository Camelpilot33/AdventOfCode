const sumArray = e => e.reduce((p, a) => p + a, 0);
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";


const input = require('fs').readFileSync(String(__dirname)
.replace(/\\/g, '/') + "/inputs/day_.txt", "utf8").replace(/\r/g, '');



console.log(input);