const fs = require('fs');

// There is a relationship between the first node ex AAA and the two following ex BBB and BBB, so this is the structure of a binary tree graph
// The goal is to make a tree out of the values and then it is easy to travel through the grapgh

function inputTo2dArray() { // get the input values and return it as a 2d array
    const input2dArray = []

    try {
        const fileContent = fs.readFileSync('input.txt', 'utf-8');
        const data = fileContent.split('\n');
        data.forEach((line) => {
            const regex = /[A-Z]+/g;
            const matches = line.match(regex);
            input2dArray.push(matches)
        });
    } catch (err) {
        console.log(err);
    }
    return input2dArray
}

class Node { // class to create a node with val and a 2 relationships refrensed in right and left
    constructor(value) {
      this.value = value; 
      this.left = null; 
      this.right = null; 
    }
  }

function networkGraph(relations){ // return a binary tree grapgh from the 2d array
const network = {};
relations.forEach(([parent, left, right]) => {
    if(!network[parent]){
    network[parent] = new Node(parent);
    } 
    if(!network[left]){
    network[left] = new Node(left);
    } 
    if(!network[right]){
    network[right] = new Node(right);
    } 
    network[parent].left = network[left];
    network[parent].right = network[right];
});
return network;
}

// Get the graph, the instructions of the path from AAA to ZZZ

const relations = inputTo2dArray()
const graph = networkGraph(relations);
const path = "LRRRLRRRLRRLRRLRLRRLRRLRRRLRRLRRRLRRRLLRRRLRRRLRRRLRLRRLRRRLRLRRRLRRRLLRLRLRRLRRLLLRRLRRLRRRLLRRRLLRRRLRLRRRLRRRLLRRLRLLRLRRRLRRLRRLRLRLRLRLRLRRRLRLRRRLLRLRRLRRRLRRRLRLRRLRLLLRLRLRLRLRLRRRLLRRLRLRLLRRRLRRLRRRLRRLRRLRRRLLRRLRLRRLRRRLRRLRLRRLRLLRRLLRLRRRLRRLRLLRRRR"
const startPos = graph['AAA']
const goalPos = graph['ZZZ'];

function countSteps(path, startPos, goalPos) { // travel from start pos to goal pos and count the steps
    let currNode = startPos;
    let steps = 0
    while(currNode !== goalPos){
        for(let i = 0; i < path.length; i++){
            steps++
            if(path[i] === 'L'){
                currNode = currNode.left;
            } else {
                currNode = currNode.right;
            }

            if(currNode === goalPos){
                return steps
            }
            }
    }
}

const totalSteps = countSteps(path, startPos, goalPos)
console.log(totalSteps)