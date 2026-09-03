import "/styles/main.css";
import { logout } from "../api/auth";
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
        <div class="mx-2">
            <section aria-labelledby="Profile-info" class="flex flex-col items-center my-8 gap-6 mx-6">
                <article class="flex flex-row items-center gap-2">
                    <img src="${avatar?.url || "/public/assets/images/profile_placeholder.png"}" alt="${name}'s profile picture"/ class="rounded-full w-full h-40">
                    <div>
                        <div class="text-xl mb-2 font-semibold">${name}</div>
                        <div class="text-lg">${renderCreditsMobile(credits)}</div>
                    </div>
                </article>
                <p>${bio}</p>
                <div class="flex gap-2 justify-center">
                    <button type="button" id="edit-profile-button"class="bg-primary-blue text-white rounded-lg flex-1 py-2 min-w-[160px] font-semibold">Rediger profil</button>
                    <button type="button" id="logout-button" class="flex-1 bg-white border border-primary-blue rounded-lg text-primary-blue py-2 min-w-[160px] font-semibold">Logg ut</button>
                </div>
            </section>
            <section>
                <h2 class="text-lg md:text-2xl font-semibold">Mine annonser<h2/>
                ${listings.map(renderProfileListingCard).join("")}
            </section>
            <section class="mt-4">
                <h2 class="text-lg md:text-2xl font-semibold">Mine bud</h2>
                ${bids.map(renderBidListings).join("")}
            </section>
        </div>
        
    `;
}

export async function initProfilePage() {
  const name = getName();
  const profile = await getProfile(name);
  const listings = await getListingsByProfile(name);
  const bids = await getBidsByProfile(name);

  const container = document.getElementById("profile-page");
  container.innerHTML = renderProfile({ ...profile, listings, bids });

  document.getElementById("logout-button").addEventListener("click", logout());
  document
    .getElementById("edit-profile-button")
    .addEventListener(
      "click",
      window.location.href("/html-pages/editprofile.html"),
    );
}

initProfilePage();
