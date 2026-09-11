export function renderBidHistory(bids) {
  if (!bids || bids.length === 0) {
    return `<p>Ingen bud lagt inn</p>`;
  }

  const highestBid = Math.max(...bids.map((bid) => bid.amount));

  return `
    <h1 class="font-semibold text-lg"><span class="text-xl font-bold">Høyeste bud:</span> <br> ${highestBid} credits</h1>
    <h2 class="font-semibold mt-4 mb-2 text-xl">Budhistorikk:</h2>
    <ul class="mb-4">
        ${bids
          .map((bid) => {
            const date = new Date(bid.created);
            const formattedDate = date.toLocaleDateString("no-NO");
            const formattedTime = date.toLocaleTimeString("no-NO");

            return `
            <li class="grid grid-cols-[120px_1fr_auto]">
                <span>${bid.bidder.name}</span>
                <span class="opacity-75">${formattedDate}, ${formattedTime}</span>
                <span>${bid.amount} credits </span>
            </li>
          `;
          })
          .join("")}
    </ul>
  `;
}
