import { post } from "../api/apiclient.js";

const registerForm = document.getElementById("register-form");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const messageTitleError = document.getElementById("message-title-error");

function showError(text) {
  errorMessage.classList.remove("hidden");
  messageTitleError.textContent = text;
}

function showSuccess() {
  successMessage.classList.remove("hidden");
}

function hideErrorMessage() {
  errorMessage.classList.add("hidden");
}
function hideSuccessMessage() {
  successMessage.classList.add("hidden");
}

async function registerUser(userInput) {
  hideErrorMessage();
  hideSuccessMessage();

  const submitButton = registerForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    const newUser = await post("/auth/register", userInput);
    showSuccess();

    console.log("User created", newUser);

    setTimeout(() => {
      window.location.href = "/html-pages/login.html";
    }, 1500);
  } catch (error) {
    console.error(error.message);

    if (error.status === 409) {
      showError("Bruker med denne e-posten eller brukernavnet finnes allerede");
    } else if (error.status === 400) {
      showError("Ugyldig informasjon. Sjekk feltet og prøv igjen");
    } else if (error.status === undefined) {
      showError("Kunne ikke koble til serveren. Sjekk internettforbindelsen");
    } else {
      showError("Noe gikk galt");
    }

    submitButton.disabled = false;
  }
}

function submitRegisterForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);
  registerUser(formFields);
}

registerForm.addEventListener("submit", submitRegisterForm);
