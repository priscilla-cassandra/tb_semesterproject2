import "/styles/main.css";
import { isLoggedIn } from "../api/auth";
import { post, get } from "../api/apiclient";
import { renderBidHistory } from "./bidhistory";

export function renderBidForm(listing) {
  return `
        <form id="bid-form" class="flex flex-col gap-2">
            <input type="number" id="bid-input" aria-label="Bud" min="1" step="1" placeholder="Legg inn bud her" class="w-full rounded border py-2 text-center"/>
            <button id="bidBtn" type="submit" class="bg-cta text-white w-full rounded py-2 font-semibold text-lg hover:bg-cta-hover">Gi bud</button>
            <div id="credits-mobile" class="md:hidden"></div>
        </form>
        <div id="bid-success-message" class="bg-green-success mt-6 flex hidden items-center gap-4 rounded-md px-4 py-4 shadow-md">
            <i class="fa-solid fa-circle-check text-green-text text-xl"></i>
            <p class="text-green-text font-bold">Budet ditt har blitt registrert!</p>
        </div>
        <div id="bid-error-message" class="bg-red-warning mt-6 flex hidden items-center gap-4 rounded-md px-4 py-4 shadow-md">
            <i class="fa-solid fa-xmark text-xl text-white"></i>
            <p id="bid-error-text" class="font-bold text-white"></p>
        </div
    `;
}

export function placeBid(listing) {
  //Error message preparation
  const errorMessage = document.getElementById("bid-error-message");
  const errorMessageText = document.getElementById("bid-error-text");
  const successMessage = document.getElementById("bid-success-message");

  function showError(text) {
    errorMessageText.textContent = text;
    errorMessage.classList.remove("hidden");
  }

  function hideError() {
    errorMessage.classList.add("hidden");
  }

  function showSuccess() {
    successMessage.classList.remove("hidden");
  }

  function hideSuccess() {
    successMessage.classList.add("hidden");
  }

  const form = document.getElementById("bid-form");
  if (!form) return;

  hideSuccess();
  hideError();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!isLoggedIn()) {
      window.location.href = "/html-pages/login.html";
      return;
    }

    const amount = Number(document.getElementById("bid-input").value);

    try {
      await post(`/auction/listings/${listing.id}/bids`, { amount });

      const updated = await get(`/auction/listings/${listing.id}?_bids=true`);
      const bidHistoryContainer = document.getElementById(
        "bid-history-container",
      );

      showSuccess();

      bidHistoryContainer.innerHTML = renderBidHistory(updated.data.bids);

      form.reset();
    } catch (error) {
      console.error(error.message);

      if (error.status === 400) {
        showError("Ugyldig bud. Sjekk beløpet");
      } else if (error.status === 401) {
        showError("Du må logge inn for å by");
      } else if (error.status === undefined) {
        showError("Kunne ikke koble til serveren. Sjekk internettforbindelsen");
      } else {
        showError("Noe gikk galt. Prøv igjen");
      }
    }
  });
}
