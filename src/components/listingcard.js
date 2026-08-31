import "/styles/main.css";

export function renderListings(listings) {
  const listingGrid = document.getElementById("listing-grid");

  listingGrid.innerHTML = listings
    .map(
      (listing) => `
    <article class=" card-wrapper rounded-lg bg-white shadow-lg flex flex-col items-center hover:shadow-lg transition p-4" data-id="${listing.id}">
        <div class="flex flex-col items-center py-2 px-4">
            <img class="w-full object-cover rounded-lg h-40" src="${listing.media[0]?.url || "placeholder.jpg"}" alt="${listing.media[0]?.alt || ""}"">
            <h3 class="font-semibold text-lg mt-2">${listing.title}</h3>
            <p>Bud avsluttes: <br> ${listing.endsAt}</p>
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
