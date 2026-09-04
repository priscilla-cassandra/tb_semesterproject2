import { postNewListing } from "../api/listings";

const newListingForm = document.getElementById("new-listing");
const titleInput = document.getElementById("title");
const mainImageInput = document.getElementById("main-img");
const addExtraImgBtn = document.getElementById("add-img-btn");
const listingDescription = document.getElementById("description");
const auctionEndsAt = document.getElementById("auction-end");

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

async function createNewListing() {
  const submitButton = document.getElementById("submit-button");
  const requestBody = {
    title: titleInput.value,
    endsAt: auctionEndsAt.value,
  };

  const extraImgInputs = [
    ...document.querySelectorAll(`input[name="extra-img"]`), //...spread operator to create an array
  ];

  const media = [mainImageInput, ...extraImgInputs] //...spread to put mainImage first in the array, and then spread the rest after it
    .filter((input) => input.value) //Only keep inputs that has a value (skip empty input fields)
    .map((input) => ({ url: input.value, alt: titleInput.value })); //Loops through the array and turns each input into an object that the API expects

  //if there are any images in the media array, add media to request body. If no, skip it
  if (media.length > 0) {
    requestBody.media = media;
  }

  if (listingDescription.value) {
    requestBody.description = listingDescription.value;
  }

  try {
    submitButton.disabled = true; //Disable button when the user has clicked it to post new listing
    hideErrorMessage();
    await postNewListing(requestBody);
    showSuccess();
  } catch (error) {
    console.error(error.message);

    if (error.status === 401) {
      showError("Du må være logget inn for å gjøre dette");
    } else if (error.status === undefined) {
      showError("Kunne ikke koble til serveren. Sjekk internettforbindelsen");
    } else {
      showError("Noe gikk galt");
    }
  } finally {
    submitButton.disabled = false;
  }
}

addExtraImgBtn.addEventListener("click", () => {
  const id = `extra-img-${Date.now()}`;
  const extraImgRow = document.createElement("div");
  extraImgRow.className = "flex flex-col gap-2";
  extraImgRow.innerHTML = `
    <label for="${id}">Ekstra bilde</label>
    <input id="${id}" type="url" name="extra-img" placeholder="Bilde URL" class="w-full rounded-md border px-2 py-2"/>
  `;
  document.getElementById("extra-img-container").appendChild(extraImgRow);
});

newListingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createNewListing();
});
