import {
  renderListings,
  listingGridEventListener,
  listingMatch,
} from "../components/listingcard";
import { getListings } from "../api/listings";
import { initSearchBar } from "../components/searchbar";

function showError(text) {
  document.getElementById("listing-grid").textContent = text;
}

function initSortDropdown(listings) {
  const dropdown = document.getElementById("sort");
  dropdown.addEventListener("change", () => {
    const filtered = listings.filter((listing) =>
      listingMatch(listing, dropdown.value),
    );
    renderListings(filtered);
  });
}

async function initListingGrid() {
  try {
    const listings = await getListings();
    renderListings(listings);
    listingGridEventListener();
    initSortDropdown(listings);
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
initSearchBar();
