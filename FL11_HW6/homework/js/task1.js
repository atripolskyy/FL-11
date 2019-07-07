let a1 = +prompt('Type coordinate for a1'),
    a2 = +prompt('Type coordinate for a2'),
    b1 = +prompt('Type coordinate for b1'),
    b2 = +prompt('Type coordinate for b2'),
    c1 = +prompt('Type coordinate for c1'),
    c2 = +prompt('Type coordinate for c2');

let digits = 10;

let formula = +((b2 - a2)*c1/(b1 - a1) + a2 - (b2 - a2)*a1/(b1 - a1)).toFixed( digits );

if ( c2 === formula ) {
  if ( c1 === (a1 + b1)/2 && c2 === (a2 + b2)/2 ) {
    console.log( true );
  } else {
    console.log( false );
  }
} else {
  console.log( false );
}