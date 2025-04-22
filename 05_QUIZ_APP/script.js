document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let timerId;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";

    const correctAnswer = questions[currentQuestionIndex].answer;

    // Clear any previous timer before starting new one
    clearTimeout(timerId);

    // Start 10-second timer
    timerId = setTimeout(() => {
      // Disable further answers
      const allChoices = choicesList.querySelectorAll("li");
      allChoices.forEach((el) => el.classList.add("disabled"));

      // Show correct answer
      allChoices.forEach((el) => {
        if (el.textContent === correctAnswer) {
          el.classList.add("correct");
        }
      });

      nextBtn.classList.remove("hidden");
    }, 10000); // 10 seconds

    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;

      li.addEventListener("click", () => {
        // Prevent multiple selections
        if (choicesList.querySelector(".correct, .wrong")) return;

        clearTimeout(timerId); // Stop the timer on user answer

        // Remove active class from all
        const allChoices = choicesList.querySelectorAll("li");
        allChoices.forEach((el) => el.classList.remove("active"));

        li.classList.add("active");

        if (choice === correctAnswer) {
          li.classList.add("correct");
          score++;
        } else {
          li.classList.add("wrong");

          // Highlight the correct one
          allChoices.forEach((el) => {
            if (el.textContent === correctAnswer) {
              el.classList.add("correct");
            }
          });
        }

        nextBtn.classList.remove("hidden");
      });

      choicesList.appendChild(li);
    });
  }



  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }

  
});
