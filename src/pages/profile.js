import "/styles/main.css";
import {
  getProfile,
  getListingsByProfile,
  getBidsByProfile,
} from "../api/profile";
import { getName } from "../api/auth";
import { renderCreditsMobile } from "../components/credits";
import {
  renderProfileListingCard,
  renderBidListings,
} from "../components/listingcard";

export function renderProfile(profile) {
  const {
    name,
    banner,
    credits,
    bio,
    avatar,
    listings = [],
    bids = [],
  } = profile; //Object destructuring - pull out data needed for the profile

  return `
        <img src="${banner?.url || "/assets/images/profile_banner_placeholder.png"}" alt="Banner image for ${name}'s profile">
        <section aria-labelledby="Profile-info">
            <article>
                <img src="${avatar?.url || "/public/assets/images/profile_placeholder.png"}" alt="${name}'s profile picture"/>
                <div>
                    ${name}
                    ${renderCreditsMobile(credits)}
                </div>
            </article>
            <p>${bio}</p>
            <div class="flex gap-2 w-full">
                <button type="button" class="bg-primary-blue text-white rounded-lg w-1/2 py-2">Rediger profil</button>
                <button type="button" id="logout-button" class="w-1/2 bg-white border border-primary-blue rounded-lg text-primary-blue py-2">Logg ut</button>
            </div>
        </section>
        <section>
            <h2 class="text-lg font-semibold">Mine annonser<h2/>
            ${listings.map(renderProfileListingCard).join("")}
        </section>
        <section>
            <h2 class="text-lg font-semibold">Mine bud</h2>
            ${bids.map(renderBidListings).join("")}
        </section>
    `;
}

export async function initProfilePage() {
  const name = getName();
  const profile = await getProfile(name);
  const listings = await getListingsByProfile(name);
  const bids = await getBidsByProfile(name);

  const container = document.getElementById("profile-page");
  container.innerHTML = renderProfile({ ...profile, listings, bids });
}

initProfilePage();
