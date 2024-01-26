const leadingTeam = document.querySelector("#header-title");

const homeTitleEl = document.querySelector("#home-title");
const guestTitleEl = document.querySelector("#guest-title");

const homeScoreText = document.querySelector("#score-home");
const guestScoreText = document.querySelector("#score-guest");

const addOneHome = document.querySelector("#add-one-home");
const addTwoHome = document.querySelector("#add-two-home");
const addThreeHome = document.querySelector("#add-three-home");
const minusOneHome = document.querySelector("#minus-one-home");

const addOneGuess = document.querySelector("#add-one-guest");
const addTwoGuess = document.querySelector("#add-two-guest");
const addThreeGuess = document.querySelector("#add-three-guest");
const minusOneGuess = document.querySelector("#minus-one-guest");

const display = document.querySelector("#timer");

const newGameBtn = document.querySelector("#new-game-btn");
const timerBtn = document.querySelector("#timer-btn");
const resetBtn = document.querySelector("#reset-btn");

let homeScore = 0;
let guessScore = 0;

// Home Score Buttons
addOneHome.addEventListener("click", () => {
  homeScore = plusOne(homeScore, homeScoreText);
  updateLead();
});

addTwoHome.addEventListener("click", () => {
  homeScore = plusTwo(homeScore, homeScoreText);
  updateLead();
});

addThreeHome.addEventListener("click", () => {
  homeScore = plusThree(homeScore, homeScoreText);
  updateLead();
});

minusOneHome.addEventListener("click", () => {
  homeScore = minusOne(homeScore, homeScoreText);
  updateLead();
});

//Guess Score Buttons
addOneGuess.addEventListener("click", () => {
  guessScore = plusOne(guessScore, guestScoreText);
  updateLead();
});

addTwoGuess.addEventListener("click", () => {
  guessScore = plusTwo(guessScore, guestScoreText);
  updateLead();
});

addThreeGuess.addEventListener("click", () => {
  guessScore = plusThree(guessScore, guestScoreText);
  updateLead();
});

minusOneGuess.addEventListener("click", () => {
  guessScore = minusOne(guessScore, guestScoreText);
  updateLead();
});

// Functions to buttons
function plusOne(score, scoreText) {
  score++;
  scoreText.textContent = score;
  return score;
}

function plusTwo(score, scoreText) {
  score += 2;
  scoreText.textContent = score;
  return score;
}

function plusThree(score, scoreText) {
  score += 3;
  scoreText.textContent = score;
  return score;
}

function minusOne(score, scoreText) {
  score -= 1;
  scoreText.textContent = score;
  return score;
}

//New game button
newGameBtn.addEventListener("click", () => {
  homeScore = 0;
  guessScore = 0;
  homeScoreText.textContent = 0;
  guestScoreText.textContent = 0;
  leadingTeam.textContent = "LEADING TEAM";
  resetTimer();
});

// Timer
let timerRunning = false;
let intervalId;
let remaining = 60 * 12; // initial time

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  return setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
    remaining = timer;
  }, 1000);
}

timerBtn.addEventListener("click", function () {
  if (!timerRunning) {
    intervalId = startTimer(remaining, display);
    timerRunning = true;
  } else {
    clearInterval(intervalId);
    timerRunning = false;
  }
});

//Reset Time function
function resetTimer() {
  clearInterval(intervalId);
  remaining = 60 * 12;
  display.textContent = "00:00";
  timerRunning = false;
}

resetBtn.addEventListener("click", resetTimer);

// Update Leading Team
function updateLead() {
  let homeLead = homeScore - guessScore;
  let guestLead = guessScore - homeScore;
  if (homeScore > guessScore) {
    leadingTeam.innerHTML = `LEADING TEAM: <span style= "color: white;">HOME, ${homeLead} points lead</span>`;
    homeTitleEl.innerHTML = `<span style = "color:#39ff14;">HOME</span>`;
    guestTitleEl.innerHTML = `<span style = "color:#eee;">GUEST</span>`;
  } else if (guessScore > homeScore) {
    leadingTeam.innerHTML = `LEADING TEAM: <span style="color: white;">GUESS, ${guestLead} points lead</span>`;
    guestTitleEl.innerHTML = `<span style = "color:#39ff14;">GUEST</span>`;
    homeTitleEl.innerHTML = `<span style = "color:#eee;">HOME</span>`;
  } else {
    leadingTeam.textContent = "DRAW";
  }
}
