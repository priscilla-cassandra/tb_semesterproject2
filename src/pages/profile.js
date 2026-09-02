import "/styles/main.css";
import { getProfile } from "../api/profile";
import { renderCreditsMobile } from "../components/credits";
import { renderProfileListingCard } from "../components/listingcard";
import { renderBidListings } from "../components/listingcard";

export function renderProfile(profile) {
  const { name, banner, bio, avatar, listings = [], bids = [] } = profile; //Object destructuring - pull out data needed for the profile

  return `
        <img src="${banner?.url || "/assets/images/profile_banner_placeholder.png"}" alt="Banner image for ${name}'s profile">
        <section aria-labelledby="Profile-info">
            <article>
                <img src="${avatar?.url || "/public/assets/images/profile_placeholder.png"}" alt="${name}'s profile picture"/>
                <div>
                    ${name}
                    ${renderCreditsMobile()}
                </div>
            </article>
            <p>${bio}</p>
            <div class="flex gap-2 w-full">
                <button type="button" class="bg-primary-blue text-white rounded-lg w-1/2 py-2">Rediger profil</button>
                <button type="button" id="logout-button" class="w-1/2 bg-white border border-primary-blue rounded-lg text-primary-blue py-2">Logg ut</button>
            </div>
        </section>
        <section>
            ${listings.map(renderProfileListingCard).join("")}
        </section>
        <section>
            ${bids.map(renderBidListings).join("")}
        </section>
    `;
}
