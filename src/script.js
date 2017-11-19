/*(function() {
  function Question(question, answers, answer) {
    this.question = question;
    this.answers = answers;
    this.answer = answer;
  }

  Question.prototype.showQuestion = function() {
    console.log(this.question);
  };

  Question.prototype.showAnswers = function() {
    for (let i = 0; i < this.answers.length; i++) {
      console.log(i + ": " + this.answers[i]);
    }
    // this.answers.map((answer, idx) => {
    //   console.log(idx + ": " + answer);
    // });
  };

  let question1 = new Question(
    "Where does sf live?",
    ["Kuala Lumpur", "Tokyo", "Toronto"],
    1
  );

  let question2 = new Question(
    "What color does sf like?",
    ["Blue", "Red", "Green"],
    0
  );

  let question3 = new Question(
    "What does sf do?",
    ["System Engineer", "Actor", "Teacher"],
    2
  );

  let questions = [question1, question2, question3];

  let correct = false;
  let score = 0;
  while (correct === false) {
    let rnd = Math.floor(Math.random() * questions.length);
    console.log(questions[rnd].showQuestion());
    console.log(questions[rnd].showAnswers());
    let guess = parseInt(prompt("What your guess?"));

    if (guess == questions[rnd].answer) {
      console.log("That's correct!!");
      score++;
      console.log("score: " + score);
      console.log("---------------------");
    } else {
      console.log("Try again...");
    }
    if (guess === "exit") {
      correct = true;
    }
  }
})();
*/

(function() {
  function Question(question, answers, answer) {
    this.question = question;
    this.answers = answers;
    this.answer = answer;
  }

  Question.prototype.showQuestion = function() {
    console.log(this.question);
    for (let i = 0; i < this.answers.length; i++) {
      console.log(i + ": " + this.answers[i]);
    }
    console.log("-----------------");
  };

  Question.prototype.checkAnswer = function(guess, cb) {
    let sc;
    if (guess === this.answer) {
      // var sc;
      console.log("You're correct!!!\n");
      sc = cb(true);
      console.log("-----------------");
    } else {
      console.log("That's not quite right...\n");
      sc = cb(false);
      console.log("-----------------");
    }
    this.showScore(sc);
  };

  Question.prototype.showScore = function(score) {
    console.log("Your current score is: ", score);
    console.log("----------");
  };

  let question1 = new Question(
    "Where does sf live?",
    ["Kuala Lumpur", "Tokyo", "Toronto"],
    1
  );

  let question2 = new Question(
    "What color does sf like?",
    ["Blue", "Red", "Green"],
    0
  );

  let question3 = new Question(
    "What does sf do?",
    ["System Engineer", "Actor", "Teacher"],
    2
  );

  let questions = [question1, question2, question3];

  // SCORE Function not using a global variable
  function score() {
    let sc = 0;
    return function(correct) {
      if (correct) {
        sc++;
      }
      return sc;
    };
  }
  /////

  let keepScore = score();

  function nextQuestion() {
    let rnd = Math.floor(Math.random() * questions.length);

    questions[rnd].showQuestion();

    let guess = prompt("What your guess?");

    if (guess !== "exit") {
      questions[rnd].checkAnswer(parseInt(guess), keepScore);
      nextQuestion();
    }
  }
  nextQuestion();
})();
