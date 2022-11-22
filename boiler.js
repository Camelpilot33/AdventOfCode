const fs = require('fs')
let input = fs.readFileSync(String(__dirname).replace(/\\/g,'/')+"/inputs/_.txt", "utf8")
input=input.split('\n').map(Number)