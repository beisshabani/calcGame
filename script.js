const progressBar = document.querySelector('#progressbar');
const question1Element = document.querySelector('#math-question--1');
const question2Element = document.querySelector('#math-question--2');
const answerElement = document.querySelectorAll('#math-answer');
const modalElement = document.querySelector('.modal');
const overlayElement = document.querySelector('.overlay');
const modalCloseBtn = document.querySelector('#modal-close');
const modalInfoTextElement = document.querySelector('.info');
const startGameBtnElement = document.querySelector('#startGame');
const startGameContainer = document.querySelector('#start-game');
const playGameContainer = document.querySelector('#play-game');
let time = 50;

let question1, question2, correctAnswer, chaos, swap, progress, interval;

const answersArray = [];

const generateNumber = function (num) {
  let generator = Math.trunc(Math.random() * num) + 1;
  return generator;
};

const resetGame = function (message) {
  modalInfoTextElement.textContent = message;
  startGameContainer.classList.toggle('hidden');
  playGameContainer.classList.toggle('hidden');
  clearInterval(interval);
  modalToggle();
  progress = 100;
  chaos = 0;
  question1 = 0;
  question2 = 0;
  correctAnswer = 0;
  swap = NaN;
};

const nextGame = function () {
  progress = 100;
  clearInterval(interval);
  timer();
  chaos = generateNumber(72);
  question1 = generateNumber(50);
  question2 = generateNumber(32);
  question1Element.textContent = question1;
  question2Element.textContent = question2;
  correctAnswer = question1 + question2;
  ``;
  if (chaos === correctAnswer) {
    chaos = Math.trunc((chaos / generateNumber(4)) * 0.7);
  }
  console.log(chaos);
  answersArray[0] = correctAnswer;
  answersArray[1] = chaos;
  swap = Math.trunc(Math.random() * 2);
  answerElement.forEach((item, i) => {
    item.textContent = `${swap === i ? answersArray[0] : answersArray[1]}`;
  });
};

const timer = function () {
  if (progress === 0) {
    return resetGame(
      `Seems like you ran out of time so you'll have to start over!`
    );
  }
  progress--;
  progressBar.style.width = `${progress}%`;
  interval = setTimeout(timer, time);
};

const checkCorrectAnswer = function (e) {
  const isCorrect = Number(e.target.textContent) === correctAnswer;
  if (isCorrect) {
    nextGame();
  } else {
    resetGame('Your answer was incorrect, Good Luck next time!');
  }
};

const modalToggle = function () {
  modalElement.classList.toggle('hidden');
  overlayElement.classList.toggle('hidden');
};

answerElement.forEach(item => {
  item.addEventListener('click', checkCorrectAnswer);
});

startGameBtnElement.addEventListener('click', function () {
  startGameContainer.classList.toggle('hidden');
  playGameContainer.classList.toggle('hidden');
  nextGame();
});

modalCloseBtn.addEventListener('click', modalToggle);

overlayElement.addEventListener('click', modalToggle);
