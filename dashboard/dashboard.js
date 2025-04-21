document.addEventListener("DOMContentLoaded", () => {
  const adminEmail = "admin@quiz.com";
  const adminPassword = "admin123";

  const loggedInUser = JSON.parse(localStorage.getItem("users"))?.find(
    (user) => user.isLoggedIn === true
  );

  if (
    loggedInUser.email !== adminEmail ||
    loggedInUser.password !== adminPassword
  ) {
    console.log("Admin credentials", loggedInUser.email, loggedInUser.password);
    alert("Access denied. Admins only.");
    window.location.href = "../index.html";
    return;
  }

  const tableBody = document.querySelector("#user-table tbody");
  const attempts = JSON.parse(localStorage.getItem("quizAttempts")) || [];

  if (attempts.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="4">No quiz attempts found.</td>`;
    tableBody.appendChild(row);
    return;
  }
  attempts.forEach((attempt, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${attempt.user || "Anonymous"}</td>
      <td>${attempt.quizTitle}</td>
      <td>${attempt.score} / ${attempt.total}</td>
    `;

    tableBody.appendChild(row);
  });
});
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
