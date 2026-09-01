import "/styles/main.css";

export function renderBidHistory(bids) {
  if (!bids || bids.length === 0) {
    return `<p>Ingen bud lagt inn</p>`;
  }

  const highestBid = Math.max(...bids.map((bid) => bid.amount));

  return `
    <h1 class="font-semibold text-lg"><span class="text-xl font-bold">Høyeste bud:</span> <br> ${highestBid} mynter</h1>
    <ul>
        ${bids
          .map((bid) => {
            const date = new Date(bid.created);
            const formattedDate = date.toLocaleDateString("no-NO");
            const formattedTime = date.toLocaleTimeString("no-NO");

            return `
            <li>
                <span>${bid.bidder.name}</span>
                <span>${formattedDate}, ${formattedTime}</span>
                <span>${bid.amount} mynter</span>
            </li>
          `;
          })
          .join("")}
    </ul>
  `;
}
