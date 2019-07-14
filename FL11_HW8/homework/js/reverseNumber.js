function reverseNumber(num) {
  let result = 0;

  while (num) {
    let modulo = num % 10;

    num = parseInt(num / 10);

    result = (result * 10) + modulo;
  }

  return result;
}

reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);