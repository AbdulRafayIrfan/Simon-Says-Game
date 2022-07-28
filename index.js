// Initialize variables
let allColorsObject = [
  { color: "green" },
  { color: "red" },
  { color: "yellow" },
  { color: "blue" },
];

let questionSequenceStore = [];
let questionSequenceCompare = [];
let answeredObject = {};
let userFailed = false;
let randomIndex;
let randomColor;
let level = 1;
let heading = document.querySelector("h1");
let i = 0;
let sound;

// Start game
document.addEventListener("keydown", initializeGame);
function initializeGame(evt) {
  if (evt.key === "a") {
    initializeHeader();
    addToSequence();
  }
}

// Create/Append random question sequence as per level
function addToSequence() {
  randomIndex = Math.floor(Math.random() * 4);
  randomColorObject = allColorsObject[randomIndex];
  questionSequenceStore.push(randomColorObject);
  questionSequenceCompare = [...questionSequenceStore];
  animateWithDelay(i);
}

// Add/Check user input
document.addEventListener("click", checkUserInput);
function checkUserInput(evt) {
  if (evt.target.nodeName === "BUTTON") {
    // Add answered object
    answeredObject = { color: evt.target.classList[1] };
    playSound(answeredObject.color);
    if (answeredObject.color === questionSequenceCompare[0].color) {
      if (questionSequenceCompare.length > 1) {
        questionSequenceCompare.shift();
      } else {
        // Update to next level
        modifyHeaderLevel();
        addToSequence();
      }
    } else {
      // Modify header to fail and stop/restart game stuff here
      playSound("wrong");
      modifyHeaderFail();
      modifyBackgroundFail();
      clearSequence();
      console.log("You got it wrong");
    }
  }
}

// Initialize heading with keydown
function initializeHeader() {
  heading.innerHTML = "Level 1";
}

// Modify header for level increase
function modifyHeaderLevel() {
  level++;
  heading.innerHTML = "Level " + level;
}

// Modify header for when user fails game
function modifyHeaderFail() {
  heading.innerHTML = "You failed, press 'A' key to restart";
}

// Game stop/failed code
function clearSequence() {
  questionSequenceStore = [];
  questionSequenceCompare = [];
  level = 1;
}

function modifyBackgroundFail() {
  document.querySelector("body").style.backgroundColor = "red";
  setTimeout(() => {
    document.querySelector("body").style.backgroundColor = "rgb(0, 38, 61)";
  }, 500);
}

// ANIMATIONS
function animateWithDelay(i) {
  setTimeout(() => {
    let objectToAnimate = document.querySelector(
      "." + questionSequenceStore[i].color
    );
    playSound(questionSequenceStore[i].color);
    objectToAnimate.style.animation = "simon_says 0.25s linear";
    setTimeout(() => {
      objectToAnimate.style.removeProperty("animation");
    }, 250);
    if (i < questionSequenceStore.length - 1) {
      animateWithDelay(i + 1);
    }
  }, 1000);
}

// Event delegation to all buttons inside button parent div
let buttonsDiv = document.querySelector(".buttons-container");
buttonsDiv.addEventListener("click", (evt) => {
  if (evt.target.nodeName === "BUTTON") {
    evt.target.classList.add("pressed");
    setTimeout(() => {
      evt.target.classList.remove("pressed");
    }, 100);
  }
});

// Playing sound function
function playSound(soundName) {
  sound = new Audio(`sounds/${soundName}.mp3`);
  sound.play();
}
