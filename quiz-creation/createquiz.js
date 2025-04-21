const questionsContainer = document.getElementById("questions-container");
const addQuestionBtn = document.getElementById("add-question");
const quizForm = document.getElementById("quiz-form");
const quizTitleInput = document.getElementById("quiz-title");

let questionCount = 0;

function createInput(name, placeholder) {
  const input = document.createElement("input");
  input.type = "text";
  input.name = name;
  input.placeholder = placeholder;
  input.required = true;
  return input;
}

function createQuestionBlock() {
  const qIndex = questionCount++;

  const questionBlock = document.createElement("div");
  questionBlock.className = "question-block";

  questionBlock.appendChild(createInput(`question-${qIndex}`, "Question"));

  for (let i = 0; i < 3; i++) {
    questionBlock.appendChild(
      createInput(`option-${qIndex}-${i}`, `Option ${i + 1}`)
    );
  }

  questionBlock.appendChild(createInput(`answer-${qIndex}`, "Correct Answer"));

  questionsContainer.appendChild(questionBlock);
}

function collectQuizData() {
  const quiz = {
    title: quizTitleInput.value.trim(),
    questions: [],
  };

  for (let i = 0; i < questionCount; i++) {
    const question = document
      .querySelector(`[name="question-${i}"]`)
      ?.value.trim();
    const options = [
      document.querySelector(`[name="option-${i}-0"]`)?.value.trim(),
      document.querySelector(`[name="option-${i}-1"]`)?.value.trim(),
      document.querySelector(`[name="option-${i}-2"]`)?.value.trim(),
    ];
    const answer = document.querySelector(`[name="answer-${i}"]`)?.value.trim();

    if (question && options.every(Boolean) && answer) {
      quiz.questions.push({ question, options, answer });
    }
  }

  return quiz;
}

function handleFormSubmit(event) {
  event.preventDefault();
  const quizData = collectQuizData();
  console.log("Quiz Created:", quizData);
  alert("Quiz submitted! Check console for data.");
}

addQuestionBtn.addEventListener("click", createQuestionBlock);
quizForm.addEventListener("submit", handleFormSubmit);
createQuestionBlock();

function handleFormSubmit(event) {
  event.preventDefault();

  const newQuiz = collectQuizData();

  const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

  storedQuizzes.push(newQuiz);

  localStorage.setItem("quizzes", JSON.stringify(storedQuizzes));

  console.log("Quiz saved to localStorage:", newQuiz);
  alert("Quiz submitted and saved! Check localStorage and console.");

  quizForm.reset();
  questionsContainer.innerHTML = "";
  questionCount = 0;
  createQuestionBlock();
}
function goHome() {
  window.location.href = "../dashboard/dashboard.html";
}
