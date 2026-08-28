import { post } from "../api/apiclient.js";

const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");
const messageTitle = document.getElementById("message-title");

function showError(text) {
  messageTitle.textContent = text;
  message.classList.remove("hidden");
}

function hideMessage() {
  message.classList.add("hidden");
}

async function userLogin(loginDetails) {
  hideMessage();
  const submitButton = loginForm.querySelector('button[type="submit"]');
  submitButton.disabled = true; //Disable button when user clicks to avoid double clicking and sending the request twice

  try {
    const response = await post("/auth/login", loginDetails);

    const { name, accessToken } = response.data;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", name);
    }

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000);
  } catch (error) {
    console.error(error.message);

    if (error.status === 401) {
      showError("Feil brukernavn eller passord");
    } else if (error.status === undefined) {
      //Error if there is no response at all
      showError("Kunne ikke koble til serveren. Sjekk internettforbindelsen");
    } else {
      showError("Noe gikk galt");
    }

    submitButton.disabled = false; //re-enable button on failure
  }
}

function submitLoginForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);
  userLogin(formFields);
}

loginForm.addEventListener("submit", submitLoginForm);
