import { getSingleListing } from "../api/listings";
import { renderBidForm, placeBid } from "../components/bidform";
import { renderBidHistory } from "../components/bidhistory";
import { renderSingleListing } from "../components/listingcard";

const container = document.getElementById("single-listing");

function renderSingleListingPage(listing) {
  return `
        <div class="md:w-1/2">
            ${renderSingleListing(listing)}
        </div>
        <div class="flex flex-col gap-4 md:w-1/2">
            <div id="bid-history-container">
               ${renderBidHistory(listing.bids)} 
            </div>
            ${renderBidForm(listing)}
        </div>
    `;
}

async function initPageLoad() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const listing = await getSingleListing(id);
  container.innerHTML = renderSingleListingPage(listing);

  placeBid(listing);
}

initPageLoad();
