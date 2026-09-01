import "/styles/main.css";

export function renderBidForm(listing) {
  return `
        <article>
            <input type="number" id="bid-input" aria-label="Bud" min="1" step="1" placeholder="Legg inn bud her" class="w-full rounded border py-2 text-center"/>
            <button id="bidBtn" type="button" class="bg-cta text-white w-full rounded py-2">Gi bud</button>
            <div id="credits-mobile" class="md:hidden"></div>
        </article>
    `;
}
