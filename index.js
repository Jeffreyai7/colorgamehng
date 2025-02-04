// Here is the array of colors 
const colors = [
  "#CC8033", "#B3CC33", "#6633CC", "#3380CC", "#CC334D", "#B333CC",
  "#CC33CC", "#CCB333", "#4D33CC", "#CCCC33", "#99CC33", "#CC3380",
  "#3366CC", "#CC9933", "#33B3CC", "#33CC4D", "#CC3399", "#80CC33",
  "#33CC99", "#33CC66", "#CC3366", "#3333CC", "#33CCB3", "#3399CC",
  "#CC6633", "#33CCCC", "#CC4C33", "#8033CC", "#66CC33", "#33CC33",
  "#CC3333", "#4DCC33", "#33CC80", "#CC33B3", "#334DCC", "#9933CC"
];

let targetColor = "";
let score = 0;
let successMessage = "Correct, you got that right, 🎉 Play Again "
let failureMessage = "⚠️ Oops! Please try again. 😞"

// Document Object Model references
const targetColorBox = document.getElementById("colorBox");
const messageDisplay = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameBtn = document.getElementById("newGameButton");
const colorButtons = document.querySelectorAll(".colorOption");

// Here is  a utility function to shuffle an array (Fisher-Yates shuffle)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  const transformedTosix = array.slice(0, 6) // picking out 5 from the 36color codes
  return transformedTosix;
}



function setupGame() {
  // Reset message
  messageDisplay.textContent = "Choose the matching color!";
  
  // Randomly choose the target color from the predefined set
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  targetColor = randomColor;
  targetColorBox.style.backgroundColor = randomColor;
  const slicedArr = colors.slice()
  // Shuffle the colors for the buttons so their order changes each round
  const shuffledColors = shuffle(slicedArr);
  const shuffledWithTargetcolor = shuffle([randomColor, ...shuffledColors]) 
  
  // Assign each button a background color from the shuffled list and store that value
  colorButtons.forEach((button, index) => {
    const color = shuffledWithTargetcolor[index];
    button.style.backgroundColor = color;
    button.dataset.color = color;
  });
}


function onTextChange(textElement, content) {
  // First fade out
  textElement.classList.add("fade-out");

  setTimeout(() => {
    // Change the text content when opacity is 0
    textElement.textContent = content;

    // Fade in the text
    textElement.classList.remove("fade-out");
    textElement.classList.add("fade-in");

    // Remove the fade-in class after animation
    setTimeout(() => {
      textElement.classList.remove("fade-in");
    }, 500);
  }, 500);
}

// Add event listeners to the color buttons
colorButtons.forEach(button => {
  button.addEventListener("click", function() {
    
    const guessedColor = this.dataset.color;
    if (guessedColor === targetColor) {
      onTextChange(messageDisplay, successMessage)
      score++;
      scoreDisplay.textContent = score;
      setupGame()
    } else {
      onTextChange(messageDisplay, failureMessage)
      setupGame()
    }
  });
  
});

// New Game button resets the round (target color and messages)
newGameBtn.addEventListener("click", function() {
  setupGame();
  score = 0;
  scoreDisplay.textContent = score;
});

// On Page reload
setupGame();