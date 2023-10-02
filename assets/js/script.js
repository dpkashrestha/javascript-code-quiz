// Initialize global variables
var main = document.getElementById("main");
var bodyText = document.getElementById("body-text");
var currentQuestionIndex = 0;
var footer = document.getElementById("footer");
var currentPage;
var highScoreArray = [];
var timerElement = document.querySelector("#timer-count");
var timer;
var timerCount;

// Create question bank ----------------------------------
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
  text: "Arrays in JavaScript can be used to store _____ .",
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

var question6 = {
  text: "Which of the following keywords is used to define a variable in Javascript?",
  options: ["1. var", "2. let", "3. function", "4. all of the above"],
  correctAnswer: "1. var",
};

var question7 = {
  text: "How can a datatype be declared to be a constant type?",
  options: ["1. const", "2. var", "3. let", "4. constant"],
  correctAnswer: "1. const",
};

var questionBank = [question1, question2, question3, question4, question5, question6, question7];
// -------------------------------------------------------------------


function init() {
  timerElement.textContent = 0;
  currentQuestionIndex = 0;
  timerCount = 75;

  // Get high scores from the local storage
  highScoreArray = JSON.parse(localStorage.getItem("highScores"));
}

function createStartQuizPage() {
  init();

  // Keep current page reference for View High Scores function
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

  // Attach event listener to start quiz button
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
    optionButton.setAttribute("class", "option-button");
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
  labelInputEl.setAttribute("id", "label-input");
  main.appendChild(labelInputEl);

  var labelEl = document.createElement("label");
  labelEl.textContent = "Enter initials :  ";
  labelInputEl.appendChild(labelEl);

  var inputScoreEl = document.createElement("input");
  inputScoreEl.setAttribute("style", "line-height: 28px;");
  labelInputEl.appendChild(inputScoreEl);

  var submitScoreButton = document.createElement("button");
  submitScoreButton.setAttribute("id", "submit-score-button");
  submitScoreButton.textContent = "Submit";
  main.appendChild(submitScoreButton);

  // Attach event listener to submit button
  submitScoreButton.addEventListener("click", submitScoreEvent);
}

function removeFinalScorePage() {
  var finalScoreEl = document.getElementById("final-score-msg");
  main.removeChild(finalScoreEl);

  var labelInputEl = document.getElementById("label-input");
  main.removeChild(labelInputEl);

  var submitScoreButton = document.getElementById("submit-score-button");
  main.removeChild(submitScoreButton);

  removeResultElement();
}

function createHighScorePage() {
  currentPage = "High Score Page";

  bodyText.textContent = "High Scores";

  var highScoreInputEl = document.createElement("p");
  highScoreInputEl.setAttribute("id", "high-score");
  main.appendChild(highScoreInputEl);

  var highScoreDiv = document.createElement("div");
  highScoreDiv.setAttribute("id", "highScoreDiv");
  main.appendChild(highScoreDiv);

  var highScoreOrderedList = document.createElement("ol");
  highScoreDiv.appendChild(highScoreOrderedList);

  // Get high scores from the local storage
  highScoreArray = JSON.parse(localStorage.getItem("highScores"));

  // Create list items if high score array has values
  if (!!highScoreArray) {
    for (var i = 0; i < highScoreArray.length; i++) {
      var highScoreListItem = document.createElement("li");
      highScoreListItem.setAttribute("class", "high-score-item");
      highScoreListItem.textContent = highScoreArray[i].initials + "-" + highScoreArray[i].timerCountValue;
      highScoreOrderedList.appendChild(highScoreListItem);
    }
  }

  var goBackButton = document.createElement("button");
  goBackButton.setAttribute("id", "go-back-button");
  goBackButton.textContent = "Go Back";
  main.appendChild(goBackButton);

  goBackButton.addEventListener("click", goBackEvent);

  var clearHighScoreButton = document.createElement("button");
  clearHighScoreButton.setAttribute("id", "clear-scores-button");
  clearHighScoreButton.textContent = "Clear High Scores";

  if (!highScoreArray || highScoreArray.length == 0) {
    clearHighScoreButton.setAttribute("disabled", "true");
  }
  
  main.appendChild(clearHighScoreButton);

  // Attach event listener to clear high score button
  clearHighScoreButton.addEventListener("click", clearHighScoreEvent);
}
 
function clearHighScoreEvent() {
  var clearHighScoreButton = document.getElementById("clear-scores-button");
  clearHighScoreButton.setAttribute("disabled", "true");

  var highScoreDiv = document.getElementById("highScoreDiv");
  var highScoreOrderedList = document.querySelector("ol");
  highScoreDiv.removeChild(highScoreOrderedList);
  
  localStorage.removeItem("highScores");
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

function createResultElement() {
  var result;

  if (event.target.textContent === questionBank[currentQuestionIndex].correctAnswer) {
    result = "Correct!";
  } else {
    result = "Wrong!";
    penaltyTime(); // Decrease timer by 10 seconds for wrong answer
  }

  var resultEl = document.createElement("p");
  resultEl.setAttribute("id", "resultId");
  resultEl.textContent = result;
  footer.appendChild(resultEl);
}

function removeResultElement() {
  var resultEl = document.getElementById("resultId");
  footer.removeChild(resultEl);
}

function nextQuestionEvent(event) {
  removeQuestionPage();
  
  createResultElement();

  if (currentQuestionIndex < questionBank.length - 1) {
    var questionObject = questionBank[++currentQuestionIndex];
    createQuestionPage(questionObject.text, questionObject.options);
  } else {
    var resultEl = document.getElementById("timer-count");
    resultEl.textContent = timerCount;
    clearInterval(timer);
    createFinalScorePage();
  }
}

function submitScoreEvent() {
  var inputScoreEl = document.querySelector("input");

  var highscoreObject = {
    initials: inputScoreEl.value,
    timerCountValue: timerCount
  };

  if (!highScoreArray) {
    highScoreArray = [];
  }
  highScoreArray.push(highscoreObject);

  localStorage.setItem("highScores", JSON.stringify(highScoreArray));

  removeFinalScorePage();
  createHighScorePage();
}

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;

    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      // Remove question page and go to final score page
      removeQuestionPage();
      createFinalScorePage();
    }
  }, 1000);
}

function penaltyTime() {
  timerCount = timerCount - 10;
}

function viewHighScoresEvent() {
  if (currentPage === "Start Quiz Page") {
    removeStartQuizPage();
  } else if (currentPage === "Question Page") {
    removeQuestionPage();
  } else if (currentPage === "Final Score Page") {
    removeFinalScorePage();
  }

  if (currentPage !== "High Score Page") {
    createHighScorePage();
  }

  clearInterval(timer);
}

//Starting point
createStartQuizPage();

