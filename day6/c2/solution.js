const time = 38947970;
const distance = 241154910741091;

// seems like ther is a pattern where ther is a span of how many seconds you can hold to win. seems like there is a starting point and an endpoint 
// in the example Time: 71530 and Distance: 940200 the soan is between 14 and 71516
// so i need to find the first and the last value that return true for beating the record

const first = firstVal()
const last = lastVal()
const calc = last - first + 1 // the first value is also valid so thats why + 1
console.log(calc) // 23501589

function firstVal() {
    for(let i = 0; i <= time; i++){
        if(isRecord(time, distance, i)){
            console.log(i)
            return i // 7 723 191
        }
    }
}

function lastVal(){
    for(let i = time; i >= 0; i--){
        if(isRecord(time, distance, i)){
            console.log(i)
            return i // 31 224 779
        }
    }
}

function isRecord(totalTime, totalDistance, holdBtnTime) { // -> bool if the time and distance beats the record 
    const calcTravelTime = totalTime - holdBtnTime;
    const speed = holdBtnTime;
    const calcDistance = speed * calcTravelTime

    return calcDistance > totalDistance
}