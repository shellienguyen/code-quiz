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
   if ( this.getQuestionIndex().isCorrectAnswer( userAnswer )) {
       this.score++;
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
       // show question
       let element = document.getElementById( "quiz-question" );
       element.innerHTML = newQuiz.getQuestionIndex().questionText;

       // show options
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
   let currentQuestionNumber = newQuiz.questionIndex;
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
                     "console log" )
];

// Create new object of TheQuiz constructor
let newQuiz = new TheQuiz( quizQuestions );

// display quiz
displayQuiz();