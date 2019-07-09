let askPlay = confirm('Do you want to play a game?');

if (askPlay) {
  let maxRangeDefault = 8,
    maxRange = 8,
    addToMaxRange = 4,
    timesBiggerPrize = 2;

  let firstPrizeDefault = 100,
    secondPrizeDefault = 50,
    thirdPrizeDefault = 25,
    firstPrize = 100,
    secondPrize = 50,
    thirdPrize = 25;

  let rand = Math.random() * maxRange;
  rand = Math.round(rand);

  let count = 0,
    countMax = 3,
    attempt = 3,
    currentPrize = 0;

  do {

    let attemptsLeft = attempt - count;

    let possiblePrize = firstPrize;

    if (count === 1) {
      possiblePrize = secondPrize;
    } else if (count === 2) {
      possiblePrize = thirdPrize;
    }

    let text1 = 'Choose a roulette pocket number from 0 to ' + maxRange;
    let text2 = '\nAttempts left: ' + attemptsLeft + '\nTotal prize: ' + currentPrize + '$';

    let ask = +prompt(text1 + text2 + '\nPossible prize on current attempt: ' + possiblePrize + '$');

    count++;

    if (ask === rand) {

      if (count === 1) {
        currentPrize += firstPrize;
        if (!confirm('Congratulation, you won! Your prize is: ' + currentPrize + '$. Do you want to continue?')) {
          alert('Thank you for your participation. Your prize is: ' + currentPrize + '$');

          if (!confirm('Do you want to play again?')) {
            break;
          } else {
            maxRange = maxRangeDefault;
            rand = Math.random() * maxRange;
            rand = Math.round(rand);
            currentPrize = 0;
            firstPrize = firstPrizeDefault;
            secondPrize = secondPrizeDefault;
            thirdPrize = thirdPrizeDefault;
            count = 0;
          }
        } else {

          maxRange += addToMaxRange;
          rand = Math.random() * maxRange;
          rand = Math.round(rand);

          firstPrize *= timesBiggerPrize;
          secondPrize *= timesBiggerPrize;
          thirdPrize *= timesBiggerPrize;

          count = 0;
        }

      } else if (count === 2) {
        currentPrize += secondPrize;
        if (!confirm('Congratulation, you won! Your prize is: ' + currentPrize + '$. Do you want to continue?')) {
          alert('Thank you for your participation. Your prize is: ' + currentPrize + '$');

          if (!confirm('Do you want to play again?')) {
            break;
          } else {
            maxRange = maxRangeDefault;
            rand = Math.random() * maxRange;
            rand = Math.round(rand);
            console.log('random number: ', rand);
            currentPrize = 0;
            firstPrize = firstPrizeDefault;
            secondPrize = secondPrizeDefault;
            thirdPrize = thirdPrizeDefault;
            count = 0;
          }
        } else {

          maxRange += addToMaxRange;
          rand = Math.random() * maxRange;
          rand = Math.round(rand);
          console.log('random number: ', rand);

          firstPrize *= timesBiggerPrize;
          secondPrize *= timesBiggerPrize;
          thirdPrize *= timesBiggerPrize;

          count = 0;
        }

      } else if (count === countMax) {
        currentPrize += thirdPrize;
        if (!confirm('Congratulation, you won! Your prize is: ' + currentPrize + '$. Do you want to continue?')) {
          alert('Thank you for your participation. Your prize is: ' + currentPrize + '$');

          if (!confirm('Do you want to play again?')) {
            break;
          } else {
            maxRange = maxRangeDefault;
            rand = Math.random() * maxRange;
            rand = Math.round(rand);
            console.log('random number: ', rand);
            currentPrize = 0;
            firstPrize = firstPrizeDefault;
            secondPrize = secondPrizeDefault;
            thirdPrize = thirdPrizeDefault;
            count = 0;
          }
        } else {
          maxRange += addToMaxRange;
          rand = Math.random() * maxRange;
          rand = Math.round(rand);

          firstPrize *= timesBiggerPrize;
          secondPrize *= timesBiggerPrize;
          thirdPrize *= timesBiggerPrize;

          count = 0;
        }
      }
    } else {
      if (count === countMax) {
        alert('Thank you for your participation. Your prize is: ' + currentPrize + ' $');
        if (confirm('Do you want to play again?')) {
          maxRange = maxRangeDefault;
          rand = Math.random() * maxRange;
          rand = Math.round(rand);
          currentPrize = 0;
          firstPrize = firstPrizeDefault;
          secondPrize = secondPrizeDefault;
          thirdPrize = thirdPrizeDefault;
          count = 0;
        }
      }
    }
  } while (count < countMax);
} else {
  alert('You did not become a billionaire, but can.');
}