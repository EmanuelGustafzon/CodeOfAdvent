const fs = require('fs');

let SUM = 0;

const schematic =  twoDimFromInput()
const rows = schematic.length;
const cols = schematic[0].length
findEngineParts(schematic, rows, cols)

console.log(SUM) // 528819

function twoDimFromInput(){
    const schematic = [];
    try {
        const fileContent = fs.readFileSync('input.txt', 'utf-8');
        const data = fileContent.split('\n');
        data.forEach(line => {
            schematic.push(line.trim().split(''));
        });
    } catch (err) {
        console.log(err);
    }
    return schematic
}

function findEngineParts(schematic, rows, cols) {
    let start = null;
    let end =  null;
    for (let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            if(!isNaN(parseInt(schematic[row][col]))){
                start = col
                while(!isNaN(parseInt(schematic[row][col]))) {
                    col++
                    end = col
                }
                const part = schematic[row].join('').slice(start, end)
                if(isValidpart(schematic, row, start, end)){
                    SUM += parseInt(part)
                }
            }
        }
    }
}

function isValidpart(schematic, row, start, end){
    const symbols= ['+','-','%','=','!','?','*','&','$','#','/','@' ]
    if (schematic[row][start - 1] !== '.' && schematic[row][start - 1] !== undefined) {
        return true
    }
    
    if(schematic[row][end] !== '.' && schematic[row][end] !== undefined) {
        return true
    }

    for(let i = start-1; i < end+1; i++) {
        if(schematic[row-1] && symbols.includes(schematic[row-1][i])){
            return true
        }
        if(schematic[row+1] && symbols.includes(schematic[row+1][i])){
            return true
        }
    }
    return false
}

