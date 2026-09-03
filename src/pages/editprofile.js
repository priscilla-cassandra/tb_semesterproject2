import { put } from "../api/apiclient";
import { getName } from "../api/auth";
import { getProfile } from "../api/profile";

const name = getName();
const editForm = document.getElementById("edit-profile");
const bannerInput = document.getElementById("edit-profile-banner");
const profileImgInput = document.getElementById("edit-profile-img");
const bioInput = document.getElementById("edit-description");

const messageText = document.getElementById("message-title");
const errorMessage = document.getElementById("message");
const successMessage = document.getElementById("success-message");

function showError(text) {
  messageText.textContent = text;
  errorMessage.classList.remove("hidden");
}

function showSuccess() {
  successMessage.classList.remove("hidden");
}

function hideErrorMessage() {
  errorMessage.classList.add("hidden");
}

async function getProfileToEdit() {
  try {
    const result = await getProfile(name);

    bannerInput.value = result.banner.url;
    profileImgInput.value = result.avatar.url;
    bioInput.value = result.bio;
  } catch (error) {
    console.error(error.message);

    if (error.status === 401) {
      showError("Du må være logget inn for å gjøre dette");
    } else if (error.status === 403) {
      showError("Du har ikke tilgang til å redigere denne profilen");
    } else if (error.status === undefined) {
      showError("Kunne ikke koble til serveren. Sjekk internettforbindelsen");
    } else {
      showError("Noe gikk galt");
    }
  }
}

async function updateProfile() {
  hideErrorMessage();

  const requestBody = {
    bio: bioInput.value,
  };
  if (profileImgInput.value) {
    requestBody.avatar = {
      url: profileImgInput.value,
    };
  }
  if (bannerInput.value) {
    requestBody.banner = {
      url: bannerInput.value,
    };
  }

  try {
    await put(`/auction/profiles/${name}`, requestBody);
    showSuccess();
    setTimeout(() => {
      window.location.href = `/html-pages/profile.html`;
    }, 2000);
  } catch (error) {
    console.error(error.message);

    if (error.status === 400) {
      showError("Vennligst sjekk at feltene er fylt ut riktig");
    } else if (error.status === 401) {
      showError("Du må være logget inn for å gjøre dette");
    } else if (error.status === undefined) {
      showError("Kunne ikke koble til serveren. Sjekk internettforbindelsen");
    } else {
      showError("Noe gikk galt");
    }
  }
}

getProfileToEdit();
editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateProfile();
});
