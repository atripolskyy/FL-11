function isInteger(x) {
  if (x === parseInt(x, 10)) {
    return true;
  } else {
    return false;
  }
}

isInteger(5);
isInteger(5.1);