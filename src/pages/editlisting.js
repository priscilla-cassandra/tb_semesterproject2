import {
  getSingleListing,
  updateListing as updateListingApi,
  deleteListing,
} from "../api/listings";

const editForm = document.getElementById("edit-listing-form");
const titleInput = document.getElementById("edit-title");
const mainImageInput = document.getElementById("edit-main-img");
const descriptionInput = document.getElementById("edit-description");
const endsAtInput = document.getElementById("edit-auction-end");

const messageText = document.getElementById("message-title");
const errorMessage = document.getElementById("message");
const successMessage = document.getElementById("success-message");

const deleteButton = document.getElementById("delete-btn");

const id = new URLSearchParams(window.location.search).get("id");
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

async function getListingToEdit() {
  try {
    const result = await getSingleListing(id);

    titleInput.value = result.title;
    mainImageInput.value = result.media[0]?.url ?? "";
    descriptionInput.value = result.description;
    endsAtInput.value = result.endsAt.slice(0, 16);
    endsAtInput.disabled = true;

    const extraImages = result.media.slice(1);
    const container = document.getElementById("extra-img-container");

    extraImages.forEach((img) => {
      const id = `extra-img-${Date.now()}`;
      const row = document.createElement("div");
      row.className = "flex flex-col gap-2";
      row.innerHTML = `
            <label for="${id}">Ekstra bilde</label>
            <input id="${id}" type="url" name="extra-img" value="${img.url}" placeholder="Bilde URL" class="w-full rounded-md border px-2 py-2"/>
        `;
      container.appendChild(row);
    });
  } catch (error) {
    console.error(error.message);

    if (error.status === 401) {
      showError("Du må være logget inn for å gjøre dette");
    } else if (error.status === 403) {
      showError("Du har ikke tilgang til å redigere denne annonsen");
    } else if (error.status === undefined) {
      showError("Kunne ikke koble til serveren. Sjekk internettforbindelsen");
    } else {
      showError("Noe gikk galt");
    }
  }
}

async function updateListing() {
  hideErrorMessage();

  const requestBody = {
    title: titleInput.value,
  };

  if (descriptionInput.value) {
    requestBody.description = descriptionInput.value;
  }

  const extraImages = document.querySelectorAll(`input[name="extra-img"]`); //Fetch all extra images through their name=extra-img
  const allImages = [mainImageInput, ...extraImages]; //Spread to but the mainImage first in the array, and then spread the rest

  const media = allImages
    .filter((input) => input.value) //Only keeps inputs that has a value
    .map((input) => ({ url: input.value })); //Loops through the array and turns each input into an object that the API expects

  if (media.length) requestBody.media = media; //If there are any images in the media Array, add them to the requestBody. If not, skip it

  try {
    await updateListingApi(id, requestBody);
    showSuccess();
    setTimeout(() => {
      window.location.href = `/html-pages/singlelisting.html?id=${id}`;
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

getListingToEdit();
editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateListing();
});

deleteButton.addEventListener("click", async () => {
  const confirmed = confirm("Er du sikker på at du vil slette annonsen?");
  if (!confirmed) return;
  await deleteListing(id);

  setTimeout(() => {
    window.location.href = "/index.html";
  }, 2000);
});
