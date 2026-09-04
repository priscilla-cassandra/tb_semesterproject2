import { deleteListing } from "../api/listings";

export function renderListingActions(listing) {
  return `
        <div class="flex flex-col gap-2">
            <button type="button" id="edit-listing-button" class="bg-primary-blue text-white w-full rounded py-2 font-semibold text-lg hover:bg-primary-blue-hover">Endre annonse</button>
            <button type="button" id="delete-button" class="bg-red-warning text-white w-full rounded py-2 font-semibold text-lg hover:bg-red-warning-hover">SLETT</button>
        </div>
    `;
}

export function listingActionsListeners(listing) {
  const editButton = document.getElementById("edit-listing-button");
  const deleteButton = document.getElementById("delete-button");

  editButton.addEventListener("click", () => {
    window.location.href = `/html-pages/editlisting.html?id=${listing.id}`; //Navigate to edit-page with the correct listing by id
  });

  deleteButton.addEventListener("click", async () => {
    const confirmed = confirm("Er du sikker på at du vil slette annonsen?");
    if (!confirmed) return;
    await deleteListing(listing.id);

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 2000);
  });
}
