// Your code goes here
let a = +prompt('Type first triangle side');

let b = +prompt('Type second triangle side');

let c = +prompt('Type third triangle side');

if (a + b > c && b + c > a && c + a > b) {
  console.log('Triangle exist');
  if (a === b && b === c && a === c) {
    console.log('Eequivalent triangle');
  }
} else {
  console.log('Triangle doesn\'t exist');
}