
const fs = require('fs');

// inputs is a 2d array of the input values
const inputs = inputTo2dArray()
// sum values takes help from the extrapolate func to sum the extrapolated values of each array
const result = sumValues(inputs)
console.log(result)

function inputTo2dArray() {
    const input2dArray = []

    try {
        const fileContent = fs.readFileSync('input.txt', 'utf-8');
        const data = fileContent.split('\n');
        data.forEach((line) => {
          input2dArray.push(line.split(' ').map(Number))
        });
    } catch (err) {
        console.log(err);
    }
    return input2dArray
}

function sumValues(inputs) {
  let total = 0

  for(const input of inputs){
      const result = extrapolate(input)
      total += result
  }
  return total
}

function extrapolate(arr, sum=0){
    if(arr.every(item => item === 0)){
        return 0
      } 
    const temp = []
    for(let i=1; i<arr.length; i++){
      temp.push((arr[i] - arr[i - 1]));
      }
    sum = arr[arr.length-1] + extrapolate(temp, sum)
    return sum
}
