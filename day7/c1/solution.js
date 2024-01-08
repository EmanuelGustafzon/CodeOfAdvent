const fs = require('fs');

const players = [];
let totalWinning = 0;

try {
    const fileContent = fs.readFileSync('input.txt', 'utf-8');
    const data = fileContent.split('\n');
    data.forEach((line, index) => {
        const [hand, bid] = line.split(' ');
        const type = getType(hand.split(''));
        sortArrayOfPlayers(index, hand.split(''), Number(bid), type);
    });
} catch (err) {
    console.log(err);
}
console.log(players)
countWinnings()

function countWinnings() {
    let total = 0;
    let rank = 1;
  
    for (let i = players.length - 1; i >= 0; i--) {
      total += players[i].bid * rank;
      rank++;
    }
  
    console.log(total);
  }

function getType(hand) {
    const countCards = {}
    hand.forEach(card => countCards[card] =(countCards[card] || 0) + 1);
    const numOfDifferentCards = Object.keys(countCards).length

    if(numOfDifferentCards === 1) return 7 //Five of a kind
    if(numOfDifferentCards === 2) {
        if(Object.values(countCards).includes(4)) {
            return 6
            // Four of a kind
        } else{
            return 5
            // full house
        }
    }
    if(numOfDifferentCards === 3) {
        if(Object.values(countCards).includes(3)) { 
            return 4
            //Three of a kind
        } else{
            return 3
            // 'Two pair'
        }
    }
    if(numOfDifferentCards === 4) return 2 //One pair
    if(numOfDifferentCards === 5) return 1 //High card
}



function sortArrayOfPlayers(player, hand, bid, type) {
    if (player === 0) {
      players.push({ hand: hand, type: type, bid: bid });
      return
    }
  
    for (let i = 0; i < players.length; i++) {
        const currPlayer = players[i]
        if(currPlayer.type === type) {
            if(handRankHigherOrEqual(currPlayer.hand, hand)) {
                players.splice(i, 0, { hand: hand, type: type, bid: bid });            
                break;
            } else {
                continue;
            }
        }
        if (players[i].type < type) {
            players.splice(i, 0, { hand: hand, type: type, bid: bid});
            break;
        }
    }
  }

function handRankHigherOrEqual(comapareHand, hand) {
    const labels = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
    for(let i = 0; i < hand.length; i++) {
     const card1 = labels.indexOf(hand[i])
     const card2 = labels.indexOf(comapareHand[i])
     if(card1 < card2) return true // hand rank higher
     if(card2 < card1) return false // comaperhand rank higher
    }

    return true //rank equal
}