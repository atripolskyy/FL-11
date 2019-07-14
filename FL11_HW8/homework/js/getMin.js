function getMin() {
  let arr = [...arguments],
      min = arr[0];

  for (let i = 1; i < arr.length; i++) {

    if (arr[i] < min) {
      min = arr[i];
    }
  }

  return min;
}

getMin(3, 0, -3);