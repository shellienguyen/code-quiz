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

let eachQuestion = function( theQuestion, answerChoices, answer ) {
   this.theQuestion = theQuestion;
   this.answerChoices - answerChoices;
   this.answer = answer;
};

let quiz = function( quizQuestions ) {
   this.score = 0;
   this.questions = quizQuestions;
   this.questionIndex = 0;
};

// Create the quiz
let theQuiz = new quiz( quizQuestions );

let diplayQuiz = function() {
   if ( theQuiz.isEnded() ) {
      showScores();
   }
   else {
      // Display the question
      let element = document.getElementById( "question" );
      element.innerHTML = theQuiz.getQuestionIndex().text;

      // Show answer choices
      let choices = theQuiz.getQuestionIndex().choices;
      for( let i = 0; i < choices.length; i++ ) {
         let ele = document.getElementById( "choice" + 1 );
         ele.innerHTML = choices[i];
         guess( "btn", + i, choices[ i ] );
      };

      showProgress();
   };
};

// Display the quiz
diplayQuiz();