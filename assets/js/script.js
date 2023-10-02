var main = document.getElementById("main");
var bodyText = document.getElementById("body-text");
var currentQuestionIndex = 0;
var footer = document.getElementById("footer");
var currentPage;
var highScores = [];


var question1 = {
  text: "Commonly used data types DO Not Include:",
  options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
  correctAnswer: "3. alerts",
};

var question2 = {
  text: "The condition in an if / else statement is enclosed with _______ .",
  options: [
    "1. quotes",
    "2. curly brackets",
    "3. parenthesis",
    "4. square brackets",
  ],
  correctAnswer: "2. curly brackets",
};

var question3 = {
  text: "Arrays in JavaScript can be used to store _____ .:",
  options: [
    "1. numbers and strings",
    "2. other arrays",
    "3. booleans",
    "4. all of the above",
  ],
  correctAnswer: "4. all of the above",
};

var question4 = {
  text: "String values must be enclosed within _____ when being assigned to variables.",
  options: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
  correctAnswer: "3. quotes",
};

var question5 = {
  text: "A very useful tool used during development and debugging for printing content to the debugger is:",
  options: [
    "1. JavaScript",
    "2. terminal/bash",
    "3. for loops",
    "4. console.log",
  ],
  correctAnswer: "4. console.log",
};

var questionBank = [question1, question2, question3, question4, question5];

// ----------------------------------

function createStartQuizPage() {
  currentPage = "Start Quiz Page";
  bodyText.textContent = "Coding Quiz Challenge";

  var startMsgEl = document.createElement("p");
  startMsgEl.setAttribute("id", "start-msg");
  startMsgEl.textContent =
    "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  main.appendChild(startMsgEl);

  var startQuizButton = document.createElement("button");
  startQuizButton.setAttribute("id", "start-quiz-button");
  startQuizButton.textContent = "Start Quiz";
  main.appendChild(startQuizButton);

  // Attaches event listener to start quiz button
  startQuizButton.addEventListener("click", startQuizEvent);
}

function removeStartQuizPage() {
  var startMsgEl = document.getElementById("start-msg");
  main.removeChild(startMsgEl);

  var startQuizButton = document.getElementById("start-quiz-button");
  main.removeChild(startQuizButton);
}

function createQuestionPage(questionText, options) {
  currentPage = "Question Page";
  bodyText.textContent = questionText;

  var optionsDiv = document.createElement("div");
  optionsDiv.setAttribute("id", "optionsDiv");

  main.appendChild(optionsDiv);

  // Create ordered list element
  var optionsOrderedList = document.createElement("ol");
  optionsDiv.appendChild(optionsOrderedList);

  for (var i = 0; i < options.length; i++) {
    var optionListItem = document.createElement("li");
    optionListItem.setAttribute("style", "list-style-type: none;");

    var optionButton = document.createElement("button");
    optionButton.textContent = options[i];
    optionButton.addEventListener("click", nextQuestionEvent);

    optionListItem.appendChild(optionButton);
    optionsOrderedList.appendChild(optionListItem);
  }
}

function removeQuestionPage() {
  var existingResultEl = document.getElementById("resultId");
  if (!!existingResultEl) {
    footer.removeChild(existingResultEl);
  }

  var optionsDiv = document.getElementById("optionsDiv");
  main.removeChild(optionsDiv);
}

function createFinalScorePage() {
  currentPage = "Final Score Page";
  bodyText.textContent = "All done!";

  var finalScoreEl = document.createElement("p");
  finalScoreEl.setAttribute("id", "final-score-msg");
  finalScoreEl.textContent = "Your Final Score is";
  main.appendChild(finalScoreEl);

  var labelInputEl = document.createElement("p");
  labelInputEl.setAttribute("id", "label-input")
  main.appendChild(labelInputEl);

  var labelEl = document.createElement("label");
  labelEl.textContent = "Enter initials :";
  labelInputEl.appendChild(labelEl);

  var inputScoreEl = document.createElement("input");
  labelInputEl.appendChild(inputScoreEl);

  var submitScoreButton = document.createElement("button");
  submitScoreButton.setAttribute("id", "submit-score-button");
  submitScoreButton.textContent = "Submit";
  main.appendChild(submitScoreButton);

  // Attaches event listener to submit button
  submitScoreButton.addEventListener("click", submitScoreEvent);
}

function submitScoreEvent() {
  var inputScoreEl = document.createElement("input");
  var highScoreText = inputScoreEl[0].value + " - " + timerCount;

  highScores.push(highScoreText);

  removeFinalScorePage();
  createHighScorePage();
}

function removeFinalScorePage() {
  var finalScoreEl = document.getElementById("final-score-msg");
  main.removeChild(finalScoreEl);

  var labelInputEl = document.getElementById("label-input");
  main.removeChild(labelInputEl);

  var submitScoreButton = document.getElementById("submit-score-button");
  main.removeChild(submitScoreButton);
}

function createHighScorePage() {
  currentPage = "High Score Page";

  bodyText.textContent = "High Scores";

  var highScoreInputEl = document.createElement("p");
  highScoreInputEl.setAttribute("id", "high-score")
  main.appendChild(highScoreInputEl);

  var highScoreDiv = document.createElement("div");
  highScoreDiv.setAttribute("id", "highScoreDiv");
  main.appendChild(highScoreDiv);

  var highScoreOrderedList = document.createElement("ol");
  highScoreDiv.appendChild(highScoreOrderedList);

  
  for (var i = 0; i < highScores.length; i++) {
    var highScoreListItem = document.createElement("li");
    highScoreListItem.textContent = highScores[i];
    highScoreOrderedList.appendChild(highScoreListItem);
  }

  var goBackButton = document.createElement("button");
  goBackButton.setAttribute("id", "go-back-button");
  goBackButton.textContent = "Go Back";
  main.appendChild(goBackButton);

  goBackButton.addEventListener("click", goBackEvent);


  var clearHighScoreButton = document.createElement("button");
  clearHighScoreButton.setAttribute("id", "clear-scores-button");
  clearHighScoreButton.textContent = "Clear High Scores";
  main.appendChild(clearHighScoreButton);


  // // Attaches event listener to submit button
  clearHighScoreButton.addEventListener("click", clearHighScoreEvent);
}

function clearHighScoreEvent() {
  console.log("clearHighScorePage");
}

function goBackEvent() {
  removeHighScorePage();
  createStartQuizPage();

}

function removeHighScorePage() {
  var highScoreInputEl = document.getElementById("high-score");
  main.removeChild(highScoreInputEl);

  var highScoreDiv = document.getElementById("highScoreDiv");
  main.removeChild(highScoreDiv);

  var goBackButton = document.getElementById("go-back-button");
  main.removeChild(goBackButton);

  var clearHighScoreButton = document.getElementById("clear-scores-button");
  main.removeChild(clearHighScoreButton);
}



function startQuizEvent() {
  removeStartQuizPage();

  var questionObject = questionBank[currentQuestionIndex];
  createQuestionPage(questionObject.text, questionObject.options);

  startTimer();
}

function nextQuestionEvent(event) {
  // Check user's answer
  removeQuestionPage();

  var result;
  if (
    event.target.textContent ===
    questionBank[currentQuestionIndex].correctAnswer
  ) {
    result = "Correct!";
  } else {
    result = "Wrong!";
    penaltyTime();
  }

  var resultEl = document.createElement("p");
  resultEl.setAttribute("id", "resultId");
  resultEl.textContent = result;
  footer.appendChild(resultEl);

  if (currentQuestionIndex < questionBank.length - 1) {
    var questionObject = questionBank[++currentQuestionIndex];
    createQuestionPage(questionObject.text, questionObject.options);
  } else {
    clearInterval(timer);
    createFinalScorePage();
  }
}

var timerElement = document.querySelector("#timer-count");
var timer;
var timerCount = 75;

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    // if (timerCount >= 0) {
    //   // Tests if win condition is met
    //   if (isWin && timerCount > 0) {
    //     // Clears interval and stops timer
    //     clearInterval(timer);
    //     winGame();
    //   }
    // }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      // loseGame();
    }
  }, 1000);
}

function penaltyTime() {
  timerCount = timerCount - 10;
}

function viewHighScores() {
  if (currentPage === "Start Quiz Page") {
    removeStartQuizPage();
  } else if (currentPage === "Question Page") {
    removeQuestionPage();
  } else if (currentPage === "Final Score Page") {
    removeFinalScorePage();
  }

  createHighScorePage();
}
//Starting point
createStartQuizPage();

//TODO Notes
// use localStorage to store the highscore

// Add styling to list element

// bodyText.setAttribute(
//   "style",
//   "margin:auto; width:50%; text-align:center;font-size:50px;"
// );
// optionEl.setAttribute("style", "margin:auto; width:50%; text-align:center;");
// optionEl.setAttribute("style", "background:#333333; padding:20px;");

// // Add styling to list items
// li1.setAttribute(
//   "style",
//   " color:white; background: #666666; padding: 5px; margin-left: 35px;"
// );
// li2.setAttribute(
//   "style",
//   " color:white; background: #777777; padding: 5px; margin-left: 35px;"
// );
// li3.setAttribute(
//   "style",
//   " color:white; background: #888888; padding: 5px; margin-left: 35px;"
// );
// li4.setAttribute(
//   "style",
//   " color:white; background: #999999; padding: 5px; margin-left: 35px;"
// );

// -----------------------------------------

// var wordBlank = document.querySelector(".word-blanks");
// var win = document.querySelector(".win");
// var lose = document.querySelector(".lose");
// var timerElement = document.querySelector(".timer-count");
// var startButton = document.querySelector(".start-button");

// var chosenWord = "";
// var numBlanks = 0;
// var winCounter = 0;
// var loseCounter = 0;
// var isWin = false;
// var timer;
// var timerCount;

// // Arrays used to create blanks and letters on screen
// var lettersInChosenWord = [];
// var blanksLetters = [];

// // Array of words the user will guess
// var words = ["variable","array", "modulus", "object", "function", "string", "boolean"];

// // The init function is called when the page loads
// function init() {
//   getWins();
//   getlosses();
// }

// // The startGame function is called when the start button is clicked
// function startGame() {
//   isWin = false;
//   timerCount = 10;
//   // Prevents start button from being clicked when round is in progress
//   startButton.disabled = true;
//   renderBlanks()
//   startTimer()
// }

// // The setTimer function starts and stops the timer and triggers winGame() and loseGame()
// function startTimer() {
//   // Sets timer
//   timer = setInterval(function() {
//     timerCount--;
//     timerElement.textContent = timerCount;
//     if (timerCount >= 0) {
//       // Tests if win condition is met
//       if (isWin && timerCount > 0) {
//         // Clears interval and stops timer
//         clearInterval(timer);
//         winGame();
//       }
//     }
//     // Tests if time has run out
//     if (timerCount === 0) {
//       // Clears interval
//       clearInterval(timer);
//       loseGame();
//     }
//   }, 1000);
// }

// // Creates blanks on screen
// function renderBlanks() {
//   // Randomly picks word from words array
//   chosenWord = words[Math.floor(Math.random() * words.length)];
//   lettersInChosenWord = chosenWord.split("");
//   numBlanks = lettersInChosenWord.length;
//   blanksLetters = []
//   // Uses loop to push blanks to blankLetters array
//   for (var i = 0; i < numBlanks; i++) {
//     blanksLetters.push("_");
//   }
//   // Converts blankLetters array into a string and renders it on the screen
//   wordBlank.textContent = blanksLetters.join(" ")
// }

// // Updates win count on screen and sets win count to client storage
// function setWins() {
//   win.textContent = winCounter;
//   localStorage.setItem("winCount", winCounter);
// }

// // Updates lose count on screen and sets lose count to client storage
// function setLosses() {
//   lose.textContent = loseCounter;
//   localStorage.setItem("loseCount", loseCounter);
// }

// // These functions are used by init
// function getWins() {
//   // Get stored value from client storage, if it exists
//   var storedWins = localStorage.getItem("winCount");
//   // If stored value doesn't exist, set counter to 0
//   if (storedWins === null) {
//     winCounter = 0;
//   } else {
//     // If a value is retrieved from client storage set the winCounter to that value
//     winCounter = storedWins;
//   }
//   //Render win count to page
//   win.textContent = winCounter;
// }

// function getlosses() {
//   var storedLosses = localStorage.getItem("loseCount");
//   if (storedLosses === null) {
//     loseCounter = 0;
//   } else {
//     loseCounter = storedLosses;
//   }
//   lose.textContent = loseCounter;
// }

// function checkWin() {
//   // If the word equals the blankLetters array when converted to string, set isWin to true
//   if (chosenWord === blanksLetters.join("")) {
//     // This value is used in the timer function to test if win condition is met
//     isWin = true;
//   }
// }

// // Tests if guessed letter is in word and renders it to the screen.
// function checkLetters(letter) {
//   var letterInWord = false;
//   for (var i = 0; i < numBlanks; i++) {
//     if (chosenWord[i] === letter) {
//       letterInWord = true;
//     }
//   }
//   if (letterInWord) {
//     for (var j = 0; j < numBlanks; j++) {
//       if (chosenWord[j] === letter) {
//         blanksLetters[j] = letter;
//       }
//     }
//     wordBlank.textContent = blanksLetters.join(" ");
//   }
// }

// // Attach event listener to document to listen for key event
// document.addEventListener("keydown", function(event) {
//   // If the count is zero, exit function
//   if (timerCount === 0) {
//     return;
//   }
//   // Convert all keys to lower case
//   var key = event.key.toLowerCase();
//   var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
//   // Test if key pushed is letter
//   if (alphabetNumericCharacters.includes(key)) {
//     var letterGuessed = event.key;
//     checkLetters(letterGuessed)
//     checkWin();
//   }
// });

// // Attach event listener to start button to call startGame function on click
// startButton.addEventListener("click", startGame);

// // Calls init() so that it fires when page opened
// init();

// // Bonus: Add reset button
// var resetButton = document.querySelector(".reset-button");

// function resetGame() {
//   // Resets win and loss counts
//   winCounter = 0;
//   loseCounter = 0;
//   // Renders win and loss counts and sets them into client storage
//   setWins()
//   setLosses()
// }
// //
