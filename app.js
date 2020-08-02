/*
Game Rules:
	Must guess a number b/w min & max
	Player gets certain amount of guesses
	Notify player of guesses remaining
	Notify correct answer if looses
	let player play again
*/

// Game Values
let min = 1,
  max = 10,
  winningNum = getWinningNumber(min, max),
  guessesLeft = 3;

// UI Elements
const gameEl = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessInput = document.querySelector('#guess-input'),
  guessBtn = document.querySelector('#guess-btn'),
  message = document.querySelector('.message');

// Assign Min & Max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for Guess
guessBtn.addEventListener('click', function () {
  // Check Number of Guesses
  if (guessesLeft > 0) {
    const guessVal = +guessInput.value;

    // Check if guess value is valid
    if (!isNaN(guessVal)) {
      // Check if number is in range
      if (guessVal >= min && guessVal <= max) {
        guessesLeft--;

        // Check for guess number match
        if (guessVal === winningNum) {
          // Corect
          setMessage(`${guessVal} is correct, YOU WIN!`, 'green');

          // game finish
          guessInput.setAttribute('disabled', true);
          guessBtn.value = 'Play Again';
          guessesLeft = 0;
        } else if (guessesLeft > 0) {
          // Wrong
          setMessage(`${guessVal} is not correct, ${guessesLeft} guesses left`, 'red');
        } else {
          // Game Over
          setMessage(`Sorry, game over. YOU LOST! Correct answer was ${winningNum}`, 'red');
        }
      } else {
        // Number out of range
        setMessage(`Enter a number between ${min} and ${max}!`, 'red');
      }
    } else {
      // Invalid Number
      setMessage('Enter a valid number!', 'red');
    }

    checkGameOver(guessesLeft);
  } else {
    resetToStart();
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
  guessInput.style.border = `1px solid ${color}`;
}

function checkGameOver(guessesLeft) {
  if (guessesLeft <= 0) {
    guessInput.setAttribute('disabled', true);
    guessBtn.value = 'Play Again';
  }
}

function resetToStart() {
  window.location.reload();
}

// Get random number between Min & Max
function getWinningNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
