let timeRemaining = 300;

let displayTime = function() {
   let timeElement = document.getElementById( "timer" );
   timeElement.innerHTML = "Time Remaining: " + timeRemaining + " seconds.";
};

// Create function constructor to use for inheritance
let TheQuiz = function( questionsObj ) {
   this.score = 0;
   this.questions = questionsObj;
   this.questionIndex = 0;
};

TheQuiz.prototype.getQuestionIndex = function() {
   return this.questions[ this.questionIndex ];
};

TheQuiz.prototype.guess = function( userAnswer ) {
   let isCorrect = document.getElementById( "answer-status" );

   if ( this.getQuestionIndex().isCorrectAnswer( userAnswer )) {
      this.score++;
      isCorrect.innerHTML = "Correct";
   }
   else {
      isCorrect.innerHTML = "Incorrect";
      timeRemaining = timeRemaining - 10;
      displayTime();
   };

   this.questionIndex++;
};

TheQuiz.prototype.isEnded = function() {
   return this.questionIndex === this.questions.length;
};

let eachQuestion = function( question, answerChoices, correctAnswer ) {
   this.questionText = question;
   this.answerChoices = answerChoices;
   this.correctAnswer = correctAnswer;
};

eachQuestion.prototype.isCorrectAnswer = function( userAnswer ) {
   console.log ( "userAnswer: " );
   console.log( userAnswer );
   return this.correctAnswer === userAnswer;
};

let displayQuiz = function() {
   if( newQuiz.isEnded() ) {
      showScores();
   }
   else {
      // Display the quiz question
      let element = document.getElementById( "quiz-question" );
      element.innerHTML = newQuiz.getQuestionIndex().questionText;

       // Display answer choices
      let choices = newQuiz.getQuestionIndex().answerChoices;
      for( let i = 0; i < choices.length; i++ ) {
         let element = document.getElementById( "choice" + i );
         element.innerHTML = choices[ i ];
         guess( "btn" + i, choices[ i ]);
      }

      showProgress();
   }
};

let guess = function( id, guess ) {
   let button = document.getElementById( id );
   button.onclick = function() {
      newQuiz.guess( guess );
      displayQuiz();
   }
};

let showProgress = function() {
   let currentQuestionNumber = newQuiz.questionIndex + 1;
   let element = document.getElementById( "progress" );
   element.innerHTML = "Question " + currentQuestionNumber + " of " + newQuiz.questions.length;
};

let showScores = function() {
   let gameOverHTML = "<h1>Result</h1>";
   gameOverHTML += "<h2 id='score'> Your scores: " + newQuiz.score + "</h2>";
   let element = document.getElementById("quiz");
   element.innerHTML = gameOverHTML;
};

// Create new instances of quiz questions
let quizQuestions = [
   new eachQuestion( "Commonly used data types DO NOT include:",
                     [ "strings", "booleans", "alerts", "numbers" ],
                     "alerts" ),
   new eachQuestion( "The condition in an if/else statement is enclosed with _____.",
                     [ "quotes", "curly brackets", "parenthesis", "square brackets" ],
                     "parenthesis" ),
   new eachQuestion( "Arrays in JavaScript can be use to store _____.",
                     [ "numbers and string", "other arrays", "booleans", "all of the above" ],
                     "all of the above" ),
   new eachQuestion( "String values must be enclosed within _____ when being assigned to variables",
                     [ "commas", "curly brackets", "quotes", "parenthesis" ],
                     "quotes" ),
   new eachQuestion( "A very useful tool used during evelopment and debugging for printing content to the debugger is",
                     [ "JavaScript", "terminal/bash", "for loops", "console log" ],
                     "console log" ),
   new eachQuestion( "JavaScript is:",
                     [ "client-side scripting language", "server-side scripting language", "neither", "both" ],
                     "both" ),
   new eachQuestion( "Which is the symbol used for comments in JavaScript",
                     [ "//", "!----!", "**", "none of the above" ],
                     "//" ),
   new eachQuestion( "Which of the following is a strict equality?",
                     [ "==", "=", "===", "all of the above" ],
                     "===" ),
   new eachQuestion( "What can you use to convert the string of any base to an integer in JavaScript?",
                     [ "convertToInt();", "parseInt();", "toInt();", "allToInt();" ],
                     "parseInt();" ),
   new eachQuestion( "What does an undefined value in JavaScript mean?",
                     [ "variable does not exist", "variable has no value", "property does not exist", "all of the above" ],
                     "all of the above" )
];

// Create new object of TheQuiz constructor
let newQuiz = new TheQuiz( quizQuestions );

// Display timer
displayTime();

// display quiz
displayQuiz();