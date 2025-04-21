const userNameElement = document.getElementById("user-name");
const users = JSON.parse(localStorage.getItem("users")) || [];
const loggedInUser = users.find((user) => user.isLoggedIn);

if (loggedInUser) {
  userNameElement.innerText = `Welcome, ${loggedInUser.firstname}!`;
} else {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const quizList = document.getElementById("quiz-list");

  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

  if (quizzes.length === 0) {
    quizList.innerHTML = "<li>No quizzes available.</li>";
  } else {
    quizzes.forEach((quiz, index) => {
      const li = document.createElement("li");
      li.textContent = quiz.title || `Quiz ${index + 1}`;
      li.classList.add("quiz-item");
      li.addEventListener("click", () => {
        localStorage.setItem("selectedQuizIndex", index);
        window.location.href = "../quiz/quiz.html";
      });
      quizList.appendChild(li);
    });
  }
});

const existingQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

const Quizzes = [
  {
    title: "JavaScript Fundamentals",
    questions: [
      {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["let", "const", "var"],
        answer: "const",
      },
      {
        question: "What is the output of `typeof NaN`?",
        options: ["number", "NaN", "undefined"],
        answer: "number",
      },
      {
        question:
          "Which method converts a JSON string into a JavaScript object?",
        options: ["JSON.stringify()", "JSON.parse()", "toObject()"],
        answer: "JSON.parse()",
      },
    ],
  },
  {
    title: "HTML & CSS Basics",
    questions: [
      {
        question: "Which tag is used to define the largest heading in HTML?",
        options: ["<head>", "<h6>", "<h1>"],
        answer: "<h1>",
      },
      {
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-style", "font-weight"],
        answer: "font-size",
      },
      {
        question: "What does the 'alt' attribute in an <img> tag specify?",
        options: [
          "Image size",
          "Alternate text for the image",
          "Image alignment",
        ],
        answer: "Alternate text for the image",
      },
    ],
  },
  {
    title: "Web Development Concepts",
    questions: [
      {
        question:
          "Which HTTP method is typically used to update existing data?",
        options: ["GET", "POST", "PUT"],
        answer: "PUT",
      },
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Computer Styled Sections",
          "Creative Styling Syntax",
        ],
        answer: "Cascading Style Sheets",
      },
      {
        question: "Which tool is commonly used to manage versions of code?",
        options: ["Git", "Node.js", "Webpack"],
        answer: "Git",
      },
    ],
  },
];

if (!localStorage.getItem("quizzes")) {
  localStorage.setItem("quizzes", JSON.stringify(Quizzes));
}
const existingTitles = existingQuizzes.map((q) => q.title);
const newQuizzes = [...Quizzes];
const filteredNewQuizzes = newQuizzes.filter(
  (q) => !existingTitles.includes(q.title)
);

const updatedQuizzes = [...existingQuizzes, ...filteredNewQuizzes];
localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));

function logout() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  const updatedUsers = users.map((user) => {
    if (user.email === loggedInUserEmail) {
      return { ...user, isLoggedIn: false };
    }
    return user;
  });
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.removeItem("loggedInUser");
  console.log(updatedUsers);

  window.location.href = "../index.html";
}
