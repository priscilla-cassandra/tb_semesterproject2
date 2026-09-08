const listingGrid = document.getElementById("listing-grid");

export function renderListings(listings) {
  listingGrid.innerHTML = listings
    .map(
      (listing) => `
    <article class="min-w-0 card-wrapper rounded-lg bg-white shadow-lg flex flex-col items-center hover:shadow-2xl transition" data-id="${listing.id}">
        <div class="flex flex-col items-center py-3 px-3 min-w-0 w-full">
            <img class="w-full object-cover rounded-lg h-40 md:h-60 min-w-0" src="${listing.media[0]?.url || "/assets/images/listing_img_placeholder.png"}" alt="${listing.media[0]?.alt || ""}">
            <h3 class="font-bold text-md mt-2 break-words min-w-0 w-full line-clamp-2">${listing.title}</h3>
            <p class="w-full">Bud avsluttes: <br> ${listing.endsAt}</p>
        </div>
    </article>
    `,
    )
    .join("");
}

export function listingGridEventListener() {
  listingGrid.addEventListener("click", (event) => {
    const listingCard = event.target.closest(".card-wrapper");
    if (!listingCard) return;

    const id = listingCard.dataset.id;
    window.location.href = `/html-pages/singlelisting.html?id=${id}`;
  });
}

export function renderSingleListing(listing) {
  const mainImage =
    listing.media[0]?.url || "/assets/images/listing_img_placeholder.png";
  const extraImages = listing.media.slice(1); //Get everything except index 0
  return `
        <section class="min-w-0 w-full px-3 py-3">
            <img src="${mainImage}" class="w-full rounded-lg h-60 object-contain bg-gray-200 md:h-80">
            ${
              extraImages.length > 0
                ? `<div class="flex gap-2 mt-2 flex-wrap">
                ${extraImages
                  .map(
                    (img) =>
                      `<img src="${img.url}" alt="${img.alt || ""}" class="w-16 h-16 object-cover rounded-md bg-gray-200"/>`,
                  )
                  .join("")}</div>`
                : ""
            }
            <h1 class="text-xl lg:text-2xl font-semibold my-2">${listing.title}</h1>
            <p>${listing.description}</p>
        </section>
    `;
}

export function renderProfileListingCard(listing) {
  const { id, title, media, endsAt, _count } = listing;
  return `
    <a href="/html-pages/singlelisting.html?id=${id}" aria-labelledby="my-listing" class="card-wrapper block flex justify-between items-center bg-white px-2 py-2 shadow-lg rounded-lg">
      <div class="flex items-center gap-2">
        <img src="${media?.[0]?.url || "/public/assets/images/listing_img_placeholder.png"}" class="w-20 sm:w-20 h-20 md:w-40 md:h-40 2xl:w-45 2xl:h-45 rounded-lg object-cover bg-gray-200"/>
        <div class="flex flex-col justify-center gap-2">
          <p class="font-semibold">${title}</p>
          <p>Bud: ${_count?.bids ?? 0}</p>
        </div>
      </div>
      <div class="text-center flex flex-col justify-center gap-2">
        <p class="font-semibold">Auksjonen avsluttes:</p>
        <p>${new Date(endsAt).toLocaleDateString("no-NO")}</p>
      </div>
    </a>
  `;
}

export function renderBidListings(bid) {
  const { amount, listing } = bid;
  const { id, title, media, endsAt } = listing;
  return `
    <a href="/html-pages/singlelisting.html?id=${id}" class="card-wrapper block flex justify-between items-center bg-white px-2 py-2 shadow-lg rounded-lg ">
      <div class="flex items-center gap-2">
        <img src="${media?.[0]?.url || "/public/assets/images/listing_img_placeholder.png"}" class="w-20 sm:w-20 md:w-40 h-20 md:h-40 2xl:w-45 2xl:h-45 rounded-lg object-cover bg-gray-200"/>
        <div class="flex flex-col gap-2 justify-center md:text-lg">
          <p class="font-semibold ">${title}</p>
          <p>Mitt bud: ${amount}</p>
        </div>
      </div>
      <div class="text-center md:text-lg">
        <p class="font-semibold">Auksjonen avsluttes:</p>
        <p>${new Date(endsAt).toLocaleDateString("no-NO")}</p>
      </div>
    </a>
  `;
}

//Checks a listing against current filter mode, and returns it true or false
export function listingMatch(listing, filterMode) {
  if (filterMode === "active-listings") {
    return new Date(listing.endsAt) > new Date();
  } else if (filterMode === "no-bids") {
    return listing.bids.length === 0;
  } else {
    return true;
  }
}
