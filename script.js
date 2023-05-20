const main_div = document.getElementById("main");
const Name = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("form");
const error_nameEl = document.getElementById("error_username");
const error_passwordEl = document.getElementById("error_password");

let correct_credentials;

fetch("credentials.json")
  .then((response) => response.json())
  .then((data) => {
    correct_credentials = data.users;
  })
  .catch((error) => console.log(error));

form.addEventListener("submit", (e) => {
  let messages = [];
  let messages2 = [];

  if (Name.value === "" || Name.value == null) {
    messages.push("Name is required");
    Name.style.borderColor = "black";
    error_nameEl.style.color = "black";
  } else {
    const enteredName = Name.value.toLowerCase();
    const user = correct_credentials.find((user) => user.name === enteredName);
    if (user) {
      messages.push("");
      Name.style.borderColor = "green";
      error_nameEl.style.color = "green";
      if (password.value === "") {
        messages2.push("Password is required");
        password.style.borderColor = "black";
        error_passwordEl.style.color = "black";
      } else {
        const correctPassword = user.password;
        if (password.value === correctPassword) {
          password.style.borderColor = "green";
          error_passwordEl.style.color = "green";
          redirectToNewPage(user.page);
        } else {
          messages2.push("Invalid password");
          password.style.borderColor = "red";
          error_passwordEl.style.color = "red";
        }
      }
    } else {
      messages.push("Invalid name");
      Name.style.borderColor = "red";
      error_nameEl.style.color = "red";
    }
  }

  if (messages.length > 0) {
    e.preventDefault();
    error_nameEl.innerText = messages.join(", ");
    error_passwordEl.innerText = messages2.join(", ");
  }
});

// const redirectToNewPage = () => {
//   window.location.href = "page.html";
// };
