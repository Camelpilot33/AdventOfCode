const fs = require('fs')
const input = fs.readFileSync(String(__dirname).replace(/\\/g,'/')+"/inputs/day4.txt", "utf8").replace(/\r/g,'').split("\n\n")
let i=0
let inp=input.map(e=>e.split(/[ \n]/).map(f=>f.split(":")[0])).map(e=>i+=(e.length==8|(e.length==7&!e.includes('cid')))?1:0)
console.log("1: "+i)
inp=input.map(e=>e.split(/[ \n]/).map(f=>f.split(":")))
let j=0
for (let k of inp) {
    let valid=true
    if (!(k.length==8|(k.length==7&!k.map(e=>e[0]).includes('cid')))) {
        valid=false
        continue
    }
    for (let l of k) {
        switch(l[0]) {
            case "byr":
                if (parseInt(l[1])<1920||parseInt(l[1])>2002) valid=false
            break
            case "iyr":
                if (parseInt(l[1])<2010||parseInt(l[1])>2020) valid=false
            break
            case "eyr":
                if (parseInt(l[1])<2020||parseInt(l[1])>2030) valid=false
            break
            case "hgt":
                let [un,mes]=[l[1].substring(l[1].length-2, l[1].length),parseInt(l[1].substring(0,l[1].length-2))]
                if (un=='cm'&& (mes<150 || mes>193)) valid=false
                else if (un=='in'&& (mes<59 || mes>76)) valid=false
            break
            case "hcl":
                let clr=l[1].substring(1,l[1].length)
                if(l[1][0]!="#"||clr.replace(/[0-9a-f]/g,'').length>0||clr.length!=6) valid=false
            break
            case "ecl":
                if((")amb blu brn gry grn hzl oth".match(new RegExp(l[1],'g'))||[]).length!=1) valid=false
            break
            case "pid":
                if(l[1].length!=9||l[1].replace(/[0-9]/g,'').length>0) valid=false
            break
            default:
            break
        }
    }
    if (valid) j++
}
console.log(j)