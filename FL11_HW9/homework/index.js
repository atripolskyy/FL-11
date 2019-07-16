const getNumbers = str => {
  let arr = str.split(''),
    digits = [];

  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i])) {
      digits.push(arr[i]);
    }
  }

  return digits;
}
getNumbers('n1um3ber95');

const findTypes = (...args) => {
  let types = {};

  for (let i = 0; i < args.length; i++) {
    let elemType = typeof args[i];

    if (elemType in types) {
      types[elemType] += 1;
    } else {
      types[elemType] = 1;
    }
  }
  return types;
}
findTypes('number');
findTypes(null, 5, 'hello');

const executeforEach = (...args) => {
  let arr = [...args],
    items = arr[0],
    fn = arr[1];

  for (let i = 0; i < items.length; i++) {
    fn(items[i]);
  }
}

executeforEach(
  [1, 2, 3],
  function (el) {
    console.log(el);
  }
);

const mapArray = (...args) => {
  let arr = [...args],
    items = arr[0],
    fn = arr[1],
    newArray = [];

  for (let i = 0; i < items.length; i++) {
    newArray.push(fn(items[i]));
  }

  return newArray;
}

mapArray(
  [2, 5, 8],
  function (el) {
    return el + 3;
  }
);

const filterArray = (...args) => {
  let arr = [...args],
    items = arr[0],
    fn = arr[1],
    newArray = [];

  for (let i = 0; i < items.length; i++) {
    if (fn(items[i])) {
      newArray.push(items[i]);
    }
  }

  return newArray;
}

filterArray(
  [2, 5, 8],
  function (el) {
    return el > 3;
  }
);

const showFormattedDate = (el) => {
  const months = [
    'Jan',
    'Febr',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  return `Date: ${months[el.getMonth()]} ${el.getUTCDate()} ${el.getFullYear()}`;
}

console.log(showFormattedDate(new Date('2019-01-27T01:10:00')));

const canConvertToDate = (el) => {
  return !isNaN(new Date(el));
}

canConvertToDate('2016-13-18T00:00:00');
canConvertToDate('2016-03-18T00:00:00');

const daysBetween = (date1, date2) => {
  let time1 = date1.getTime(),
    time2 = date2.getTime(),
    diff = Math.abs(time2 - time1),
    oneDay = 24 * 60 * 60 * 1000;

  return Math.round(diff / oneDay);
}

daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00'));

let data = [{
    "_id": "5b5e3168c6bf40f2c1235cd6",
    "index": 0,
    "birthday": '2016-03-18T00:00:00',
    "eyeColor": "green",
    "name": "Stein",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e3168e328c0d72e4f27d8",
    "index": 1,
    "birthday": '1991-02-11T00:00:00',
    "eyeColor": "blue",
    "name": "Cortez",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5b5e3168cc79132b631c666a",
    "index": 2,
    "birthday": '1984-04-17T00:00:00',
    "eyeColor": "blue",
    "name": "Suzette",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e31682093adcc6cd0dde5",
    "index": 3,
    "birthday": '1994-04-17T00:00:00',
    "eyeColor": "green",
    "name": "George",
    "favoriteFruit": "banana"
  }
];

const getAmountOfAdultPeople = (el) => {
  let currentDate = Date.now(),
    oneYear = 12 * 31 * 24 * 60 * 60 * 1000,
    mustYears = 18,
    count = 0;

  for (let i = 0; i < el.length; i++) {
    let onetime = new Date(el[i]['birthday']).getTime(),
      diff = currentDate - onetime,
      countYears = Math.floor(diff / oneYear);

    if (countYears > mustYears) {
      count++;
    }
  }

  return count;
}

getAmountOfAdultPeople(data);

const keys = (obj) => {
  let arr = [];

  for (let prop in obj) {
    if ({}.hasOwnProperty.call(obj, prop)) {
      arr.push(prop);
    }
  }

  return arr;
}

keys({
  keyOne: 1,
  keyTwo: 2,
  keyThree: 3
});

const values = (obj) => {
  let arr = [];

  for (let prop in obj) {
    if ({}.hasOwnProperty.call(obj, prop)) {
      arr.push(obj[prop]);
    }
  }

  return arr;
}

values({
  keyOne: 1,
  keyTwo: 2,
  keyThree: 3
});