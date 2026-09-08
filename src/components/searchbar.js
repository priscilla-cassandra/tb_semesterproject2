import { getListings } from "../api/listings";
import { renderListings } from "./listingcard";

export function renderSearchBar() {
  return `
    <div class = "relative flex items-center gap-3 px-5 py-3 w-full">   
        <input type="text" placeholder="Søk i hele TrønderBørs" id="search-input" class="rounded-lg bg-white w-full pl-10 pr-12 py-3">
        <button id="search-button" class="absolute right-8" type="button">
            <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
        </button>  
    </div>`;
}

async function searchForListings(query) {
  try {
    const listings = await getListings();
    let filtered;
    //If there is a query(search), keep the listings that match the search
    if (query) {
      filtered = listings.filter((listing) =>
        listing.title.toLowerCase().includes(query.toLowerCase()),
      );
    } else {
      //If there is no query(search), show all listings
      filtered = listings;
    }

    renderListings(filtered);
  } catch (error) {
    console.error(error.message);
  }
}

export function initSearchBar() {
  document.getElementById("searchbar").innerHTML = renderSearchBar();

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", () => {
    searchForListings(searchInput.value.trim());
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchForListings(searchInput.value.trim());
    }
  });

  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      searchForListings("");
    }
  });
}
