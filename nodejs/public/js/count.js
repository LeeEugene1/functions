let count = 0;
let intervalId;

const countDisplay = document.getElementById('count-display');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

function incrementCount() {
  count++;
  countDisplay.innerText = 10 - count;

  if (count >= 10) {
    clearInterval(intervalId);
  }
}

function startCount() {
  count = 0;
  countDisplay.innerText = count;
  startButton.style.display = 'inline';

  clearInterval(intervalId); // 이전 Interval 제거
  intervalId = setInterval(incrementCount, 1000);
}

function restartCount() {
  startCount();
}

startButton.addEventListener('click', startCount);