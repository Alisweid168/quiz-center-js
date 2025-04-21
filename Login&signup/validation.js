const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");

const admin = {
  firstname: "Admin",
  email: "admin@quiz.com",
  password: "admin123",
  role: "admin",
  isLoggedIn: false,
};

const users = JSON.parse(localStorage.getItem("users")) || [];
if (!users.find((u) => u.email === admin.email)) {
  users.push(admin);
  localStorage.setItem("users", JSON.stringify(users));
}

form.addEventListener("submit", (e) => {
  let errors = [];

  if (firstname_input) {
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );

    if (errors.length === 0) {
      e.preventDefault();

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find((u) => u.email === email_input.value);

      if (existingUser && existingUser.email === email_input.value) {
        error_message.innerText = "User already exists. Please log in.";
        return;
      }

      const user = {
        firstname: firstname_input.value,
        email: email_input.value,
        password: password_input.value,
        role: "user",
        isLoggedIn: false,
      };

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      window.location.href = "Login&signup/login.html";
    }
  } else {
    errors = getLoginFormErrors(email_input.value, password_input.value);

    if (errors.length === 0) {
      e.preventDefault();

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const savedUser = users.find(
        (u) =>
          u.email === email_input.value && u.password === password_input.value
      );
      if (savedUser) {
        savedUser.isLoggedIn = true;

        const updatedUsers = users.map((u) =>
          u.email === savedUser.email ? savedUser : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        localStorage.setItem("loggedInUserEmail", savedUser.email);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUsers));
        if (
          savedUser.role === "admin" &&
          savedUser.email === admin.email &&
          savedUser.password === admin.password
        )
          window.location.href = "../dashboard/dashboard.html";
        else window.location.href = "../home/home.html";
      } else {
        error_message.innerText = "Invalid email or password.";
      }
    }
  }

  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (firstname === "" || firstname == null) {
    errors.push("Firstname is required");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must have at least 8 characters");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password !== repeatPassword) {
    errors.push("Password does not match repeated password");
    password_input.parentElement.classList.add("incorrect");
    repeat_password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

const allInputs = [
  firstname_input,
  email_input,
  password_input,
  repeat_password_input,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});
