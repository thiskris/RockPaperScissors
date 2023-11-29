const objectShapes = {
  rock: "rock",
  paper: "paper",
  scissors: "scissors",
};

const handShapes = [
  {
    number: 0,
    shape: objectShapes.rock,
    winsAgainst: objectShapes.scissors,
    message: "Rock Smashes Scissors",
  },
  {
    number: 1,
    shape: objectShapes.paper,
    winsAgainst: objectShapes.rock,
    message: "Paper Covers Rock",
  },
  {
    number: 2,
    shape: objectShapes.scissors,
    winsAgainst: objectShapes.paper,
    message: "Scissors Cut Paper",
  },
];

const button = document.querySelector("button");
const iconContainer = document.getElementById("icons");
const icons = document.querySelectorAll("svg");
const message = document.getElementById("game-message");

let player;

// disable pointer on icons (renabled on an event listner)
iconContainer.style.pointerEvents = "none";

// assign svg elements id's and add listener to each
// clicked is turned pink, others back to white
icons.forEach(function (icon, index) {
  icon.id = handShapes[index].shape;
  icon.addEventListener("click", function (e) {
    icons.forEach((icon) => {
      if (icon !== this) icon.style.fill = "white";
    });
    this.style.fill = "#FE00B7";
    player = handShapes[index];
  });
});

function generateRandomChoice() {
  const number = Math.floor(Math.random() * 3);
  const choice = handShapes.find((choice) => choice.number === number);
  return choice;
}

// initial button listener that enables the game
button.addEventListener(
  "click",
  () => {
    button.style.visibility = "hidden";
    iconContainer.style.pointerEvents = "auto";
    enableGameListener();
  },
  { once: true }
);


// enables the button so the user can 
// click to confirm selected choice
function enableGameListener() {
  iconContainer.addEventListener("click", () => {
    if (button.style.visibility !== "visible") {
      button.textContent = "Play Hand";
      button.style.visibility = "visible";
    }
    startGame();
  });
}

// event listener to display the results
function startGame() {
  button.addEventListener("click", playGame, { once: true });
}

// function to display the results..etc
function playGame() {
  const random = generateRandomChoice();
  const computerIcon = document.getElementById(random.shape);

  iconContainer.style.pointerEvents = "none";
  computerIcon.style.fill = '#D2FFAF';
  button.textContent = "Play Again";

  if (player.winsAgainst === random.shape) {
    message.textContent = `${player.message}. You Win!`;
  } else if (random.winsAgainst === player.shape) {
    message.textContent = `${random.message}. You Loose!`;
  } else {
    message.textContent = "Draw";
    computerIcon.style.fill = "red";
  }

  resetGameElements();
}

// resets the elements to the game can be played again
function resetGameElements() {
  button.addEventListener(
    "click",
    () => {
      icons.forEach((icon) => (icon.style.fill = "white"));
      iconContainer.style.pointerEvents = "auto";
      message.textContent = "Rock, Paper, Scissors";
      button.style.visibility = "hidden";
    },
    { once: true }
  );
}