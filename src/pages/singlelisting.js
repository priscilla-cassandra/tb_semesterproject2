import { getSingleListing } from "../api/listings";
import { renderBidForm, placeBid } from "../components/bidform";
import { renderBidHistory } from "../components/bidhistory";
import {
  renderSingleListing,
  imageCarouselListeners,
} from "../components/listingcard";
import { isOwner } from "../api/auth";
import {
  renderListingActions,
  listingActionsListeners,
} from "../components/listingactions";
import { isLoggedIn } from "../api/auth";

const container = document.getElementById("single-listing");

function renderSingleListingPage(listing) {
  const loggedIn = isLoggedIn();
  const owner = loggedIn && isOwner(listing);
  return `
        <div class="md:w-3/5 w-full px-1">
            ${renderSingleListing(listing)}
        </div>
        <div class="flex flex-col w-full gap-4 md:w-2/5 w-full md:bg-white py-4 px-1 md:px-4 rounded-lg md:shadow-lg">
            <div id="bid-history-container">
               ${renderBidHistory(listing.bids)} 
            </div>
            ${
              !loggedIn
                ? `<p class="font-semibold">Du må være logget inn for å legge inn bud</p>`
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

  const loggedIn = isLoggedIn();
  const owner = loggedIn && isOwner(listing);

  container.innerHTML = renderSingleListingPage(listing);

  imageCarouselListeners(listing);

  //If the logged in user is NOT the owner of the listing, call placeBid()
  if (owner) {
    listingActionsListeners(listing);
  } else if (loggedIn) {
    placeBid(listing);
  }
}

initPageLoad();
