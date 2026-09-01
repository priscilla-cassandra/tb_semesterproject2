import "/styles/main.css";

export function renderBidHistory(bids) {
  if (!bids || bids.length === 0) {
    return `<p>Ingen bud lagt inn</p>`;
  }

  return `
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
