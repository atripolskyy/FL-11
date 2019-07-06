let a = +prompt('Type first triangle side'),
    b = +prompt('Type second triangle side'),
    c = +prompt('Type third triangle side');

if (a + b > c && b + c > a && c + a > b) {
  if (a === b && b === c) {
    console.log( 'Eequivalent triangle' );
  } else {
    if ( a === b || b === c || a === c) {
      console.log( 'Isosceles triangle' );
    } else {
      console.log( 'Normal triangle' );
    }
  }
} else {
  console.log( 'Triangle doesn\'t exist' );
}