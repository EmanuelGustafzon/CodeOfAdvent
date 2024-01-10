const fs = require('fs');

// arrays of hands sorted by type
const five = []; 
const four = [];
const fullHouse = [];
const three = [];
const two = [];
const one = [];
const highCards = [];

// this function read the txt and sort by type into the arrays above
getInputAndSortByType();

// I use divide and conquer teqnique to sort each array from weakest to strongest hand
const sortFive = weakestToStrongestCards(five);
const sortFour = weakestToStrongestCards(four);
const sortFullHouse = weakestToStrongestCards(fullHouse);
const sortThree = weakestToStrongestCards(three);
const sortTwo = weakestToStrongestCards(two);
const sortOne = weakestToStrongestCards(one);
const sortHighCards = weakestToStrongestCards(highCards);

// concat the array
const sortedHands = [ ...sortHighCards, ...sortOne, ...sortTwo, ...sortThree,...sortFullHouse,...sortFour, ...sortFive ]

// calculate the total winnigs by multiplying each bid with the rank
const result = calcTotalWinnings()
console.log(result)

function calcTotalWinnings(){
    totalWinnings = 0
    let rank = 0
for (const hand of sortedHands) {
    rank++
    const bid = hand[1]
    totalWinnings += bid * rank
}
    return totalWinnings
}

function getInputAndSortByType(){
    try {
        const fileContent = fs.readFileSync('input.txt', 'utf-8');
        const data = fileContent.split('\n');
        data.forEach(line => {
            const [hand, bid] = line.split(' ');
            const bidInt = parseInt(bid, 10)

            const type = getType(hand.split(''));

            if(type === 5) five.push([hand, bidInt]);
            if(type === 4) four.push([hand, bidInt]);
            if(type === 3.2) fullHouse.push([hand, bidInt]);
            if(type === 3) three.push([hand, bidInt]);
            if(type === 2) two.push([hand, bidInt]);
            if(type === 1) one.push([hand, bidInt]);
            if(type === 0) highCards.push([hand, bidInt]);
        });
    } catch (err) {
        console.log(err);
    }
}

function getType(hand) {
    const countCards = {}
    hand.forEach(card => countCards[card] =(countCards[card] || 0) + 1);
    const numOfDifferentCards = Object.keys(countCards).length

    if(numOfDifferentCards === 1) return 5 //Five of a kind
    if(numOfDifferentCards === 2) {
        if(Object.values(countCards).includes(4)) {
            return 4
            // Four of a kind
        } else{
            return 3.2
            // full house
        }
    }
    if(numOfDifferentCards === 3) {
        if(Object.values(countCards).includes(3)) { 
            return 3
            //Three of a kind
        } else{
            return 2
            // 'Two pair'
        }
    }
    if(numOfDifferentCards === 4) return 1 //One pair
    if(numOfDifferentCards === 5) return 0 //High card
}

function weakestToStrongestCards(arr){
    if (arr.length <= 1) {
        return arr;
      }
    
      const middle = Math.floor(arr.length / 2);
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);
    
      return merge(weakestToStrongestCards(left), weakestToStrongestCards(right));
    }
    
function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        const currLeft = left[leftIndex][0].split('')
        const currRight = right[rightIndex][0].split('')
        const winner = strongestCard(currLeft, currRight);

        if(winner === 'L') {
            result.push(left[leftIndex]);
            leftIndex++;
        } else if(winner === 'R') {
            result.push(right[rightIndex]);
            rightIndex++;
        } else {
            result.push(left[leftIndex]);
            result.push(right[rightIndex]);
            leftIndex++;
            rightIndex++;
        }
    }
return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function strongestCard(left, right) {
    const labels = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ]

    for(let i = 0; i < left.length; i++) {

        const cardLeftHand = labels.indexOf(left[i]);
        const cardRightHand = labels.indexOf(right[i]);

        if(cardLeftHand < cardRightHand){
            return 'L'
        }
        if(cardRightHand < cardLeftHand){
            return 'R'
        } 
    }
    return 0
}