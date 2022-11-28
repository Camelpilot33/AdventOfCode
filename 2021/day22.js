const input = require('fs').readFileSync(String(__dirname).replace(/\\/g,'/')+"/inputs/day22.txt", "utf8").replace(/\r/g,'')
    .split('\n').map(e=>e.split(" ")).map(e=>[
            e[0],
            ...e[1].split(',').map(w=>w.split("="))
                .map(w=>[...w[1].split('..').map(Number)])
        ])//[mode,[x],[y],[z]]
function sect (c1,c2) {
    c1.map(e=>e.sort((a,b)=>(b-a)))
    c2.map(e=>e.sort((a,b)=>(b-a)))
    let int=
        (Math.min(c1[0][0],c2[0][0])-Math.max(c1[0][1],c2[0][1])+1)*
        (Math.min(c1[1][0],c2[1][0])-Math.max(c1[1][1],c2[1][1])+1)*
        (Math.min(c1[2][0],c2[2][0])-Math.max(c1[2][1],c2[2][1])+1)
    return int
}
console.log(input,'\n\n')

let existing=[]
let total=0
for (var i=input.length-1;i>=0;i--) {
    if (input[i][0]=='on') {

        existing.push([])
    }
    else console.log("OOOOOOFFF")
    console.log(input[i],total,existing,"\n\n")
}


// console.log(sect(
//     //[x,y,z]
//     [[0,3],[0,3],[3,0]],
//     [[1,-2],[1,-2],[-2,1]]
// ))//2x2x2=8