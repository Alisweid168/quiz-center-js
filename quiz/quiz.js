document.addEventListener("DOMContentLoaded", () => {
  const quizTitle = document.getElementById("quiz-title");
  const quizQuestions = document.getElementById("quiz-questions");
  const submitBtn = document.getElementById("submit-btn");
  const resultDiv = document.getElementById("result");

  const selectedQuizIndex = localStorage.getItem("selectedQuizIndex");
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  const quiz = quizzes[selectedQuizIndex];
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  const quizAttempts = JSON.parse(localStorage.getItem("quizAttempts")) || [];

  const existingAttempt = quizAttempts.find(
    (attempt) =>
      attempt.quizTitle === quiz.title && attempt.user === loggedInUserEmail
  );

  if (existingAttempt) {
    resultDiv.innerHTML = `You already submitted this quiz.<br>Your previous score: ${existingAttempt.score} out of ${existingAttempt.total}.`;
    submitBtn.disabled = true;
    submitBtn.textContent = "Already Submitted";

    quiz.questions.forEach((question, index) => {
      const inputs = document.querySelectorAll(
        `input[name="question-${index}"]`
      );
      inputs.forEach((input) => {
        input.disabled = true;
      });
    });

    return;
  }

  quizTitle.textContent = quiz.title;

  const userAnswers = [];

  quiz.questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    question.options.forEach((option) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = option;

      const previousSession = JSON.parse(
        localStorage.getItem("quizAttempts") || "[]"
      );
      const lastAttempt = previousSession[previousSession.length - 1];
      if (lastAttempt && lastAttempt.quizTitle === quiz.title) {
        const savedAnswer = lastAttempt.answers[index];
        if (savedAnswer && savedAnswer.selectedOption === option) {
          input.checked = true;
        }
      }

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      questionDiv.appendChild(label);
    });

    quizQuestions.appendChild(questionDiv);
  });

  submitBtn.addEventListener("click", () => {
    let score = 0;

    quiz.questions.forEach((question, index) => {
      const selected = document.querySelector(
        `input[name="question-${index}"]:checked`
      );
      const selectedValue = selected ? selected.value : null;
      const isCorrect = selectedValue === question.answer;

      if (isCorrect) score++;

      userAnswers.push({
        question: question.question,
        selectedOption: selectedValue,
        isCorrect,
      });
    });

    const resultData = {
      quizTitle: quiz.title,
      answers: userAnswers,
      score,
      total: quiz.questions.length,
      user: localStorage.getItem("loggedInUserEmail"),
    };

    const existingAttempts =
      JSON.parse(localStorage.getItem("quizAttempts")) || [];
    existingAttempts.push(resultData);
    localStorage.setItem("quizAttempts", JSON.stringify(existingAttempts));

    resultDiv.innerHTML = `You scored ${score} out of ${quiz.questions.length}.`;
    submitBtn.disabled = true;

    submitBtn.textContent = "Submitted";
  });
});
function goHome() {
  window.location.href = "../home/home.html";
}
