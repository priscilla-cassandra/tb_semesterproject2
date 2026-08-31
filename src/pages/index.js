import { renderListings } from "../components/listingcard";
import { getListings } from "../api/listings";

function showError(text) {
  document.getElementById("listing-grid").textContent = text;
}

async function initListingGrid() {
  try {
    const listings = await getListings();
    renderListings(listings);
  } catch (error) {
    console.error(error.message);
    if (error.status === 404) {
      showError("Innholdet du forsøker å se finnes ikke");
    } else if (error.status === undefined) {
      showError("Kunne ikke koble til serveren. Sjekk internettforbindelsen");
    } else {
      showError("Noe gikk galt");
    }
  }
}

initListingGrid();
