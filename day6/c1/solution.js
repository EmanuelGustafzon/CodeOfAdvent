const times = [38,94,79,70]
const distances = [241,1549,1074,1091]

// 1 ms -> 1 mm per ms
// 2 ms -> 2 mm per ms 
// total lenhth is eq to remaining time * mm/ms 
const result = marginOfError()
console.log(result)

function marginOfError() {
    let marginOfError = 1;

    for(let i = 0; i < times.length; i++) {
        const options = totalOptions(times[i], distances[i])
        if(options > 0) {
            marginOfError *= options
        }
    }
    return marginOfError
 }

function totalOptions(time, distance) {
    let totalOptions = 0;

    for(let i = 1; i < time; i++) { 
        if(isRecord(time, distance, i)) totalOptions++
    }
    return totalOptions;
}

function isRecord(totalTime, totalDistance, holdBtnTime) { // -> bool if the time and distance beats the record 
    const calcTravelTime = totalTime - holdBtnTime;
    const speed = holdBtnTime;
    const calcDistance = speed * calcTravelTime

    return calcDistance > totalDistance
}