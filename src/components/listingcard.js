import "/styles/main.css";

export function renderListings(listings) {
  const listingGrid = document.getElementById("listing-grid");

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

  listingGrid.addEventListener("click", (event) => {
    const listingCard = event.target.closest(".card-wrapper");
    if (!listingCard) return;

    const id = listingCard.dataset.id;
    window.location.href = `/html-pages/singlelisting.html?id=${id}`;
  });
}

export function renderSingleListing(listing) {
  return `
        <section class="min-w-0 w-full px-3 py-3">
            <img src="${listing.media[0]?.url || "/assets/images/listing_img_placeholder.png"}" class="w-full rounded-lg h-60 object-contain bg-gray-200">
            <h1>${listing.title}</h1>
            <p>${listing.description}</p>
        </section>
    `;
}

export function renderProfileListingCard(listing) {
  const { title, media, endsAt, _count } = listing;
  return `
    <section aria-labelledby="my-listing" class="bg-white py-2 px-2 flex justify-between rounded-lg">
      <div class="flex items-center gap-2">
        <img src="${media?.[0]?.url || "/public/assets/images/listing_img_placeholder.png"}" class="rounded-lg"/>
        <div class="flex flex-col justify-center gap-2">
          <p class="font-semibold">${title}</p>
          <p>Bud: ${_count?.bids ?? 0}</p>
        </div>
      </div>
      <div class="text-center flex flex-col justify-center gap-2">
        <p class="font-semibold">Auksjonen avsluttes:</p>
        <p>${new Date(endsAt).toLocaleDateString("no-NO")}</p>
      </div>
    </section>
  `;
}
