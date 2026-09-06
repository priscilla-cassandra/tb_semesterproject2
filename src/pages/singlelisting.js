import { getSingleListing } from "../api/listings";
import { renderBidForm, placeBid } from "../components/bidform";
import { renderBidHistory } from "../components/bidhistory";
import { renderSingleListing } from "../components/listingcard";
import { isOwner } from "../api/auth";
import { renderListingActions } from "../components/listingactions";
import { isLoggedIn } from "../api/auth";

const container = document.getElementById("single-listing");

function renderSingleListingPage(listing) {
  const loggedIn = isLoggedIn();
  const owner = loggedIn && isOwner(listing);
  return `
        <div class="md:w-1/2">
            ${renderSingleListing(listing)}
        </div>
        <div class="flex flex-col gap-4 md:w-1/2">
            <div id="bid-history-container">
               ${renderBidHistory(listing.bids)} 
            </div>
            ${
              !loggedIn
                ? `<p>Please log in to place bit</p>`
                : owner
                  ? renderListingActions(listing)
                  : renderBidForm(listing)
            }
        </div>
    `;
}

async function initPageLoad() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const listing = await getSingleListing(id);
  container.innerHTML = renderSingleListingPage(listing);

  //If the logged in user is NOT the owner of the listing, call placeBid()
  if (!isOwner(listing) && isLoggedIn()) {
    placeBid(listing);
  }
}

initPageLoad();
