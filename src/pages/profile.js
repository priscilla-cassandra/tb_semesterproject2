import "/styles/main.css";
import { logout, isLoggedIn } from "../api/auth";
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

if (!isLoggedIn()) {
  window.location.href = "/html-pages/login.html";
}

export function renderProfile(profile) {
  const {
    name,
    email,
    banner,
    credits,
    bio,
    avatar,
    listings = [],
    bids = [],
  } = profile; //Object destructuring - pull out data needed for the profile

  return `
        <img src="${banner?.url || "/assets/images/profile_banner_placeholder.png"}" alt="Banner image for ${name}'s profile" class="w-full h-50 object-cover md:h-60 lg:h-65 xl:h-70">
        <div class="mx-2">
            <section aria-labelledby="Profile-info" class="flex flex-col items-center my-8 gap-6 mx-6">
                <article class="flex flex-row items-center gap-2">
                    <img src="${avatar?.url || "/public/assets/images/profile_placeholder.png"}" alt="${name}'s profile picture" class="rounded-full w-full h-40">
                    <div>
                        <p class="text-xl font-semibold">${name}</p>
                        <p class="mb-2 opacity-75">${email}</p>
                        <div class="text-lg">${renderCreditsMobile(credits)}</div>
                    </div>
                </article>
                <p>${bio}</p>
                <div class="flex gap-2 justify-center">
                    <button type="button" id="edit-profile-button"class=" hover:bg-primary-blue-hover bg-primary-blue text-white rounded-lg flex-1 py-2 min-w-[160px] font-semibold">Rediger profil</button>
                    <button type="button" id="logout-button" class="hover:bg-gray-200 flex-1 bg-white border border-primary-blue rounded-lg text-primary-blue py-2 min-w-[160px] font-semibold">Logg ut</button>
                </div>
            </section>
            <section class="flex flex-col gap-3 mb-6">
                <h2 class="font-semibold">Mine annonser</h2>
                ${listings.length ? listings.map(renderProfileListingCard).join("") : `<p>Du har ingen annonser</p>`}
            </section>
            <section class="flex flex-col gap-3 md:mb-15">
                <h2 class="font-semibold">Mine bud</h2>
                ${bids.length ? bids.map(renderBidListings).join("") : `<p>Du har ikke bydd på noen annonser</p>`}
            </section>
        </div>
        
    `;
}

export async function initProfilePage() {
  try {
    const name = getName();
    const profile = await getProfile(name);
    const listings = await getListingsByProfile(name);
    const bids = await getBidsByProfile(name);

    const container = document.getElementById("profile-page");
    container.innerHTML = renderProfile({ ...profile, listings, bids });

    document.getElementById("logout-button").addEventListener("click", () => {
      logout();
      window.location.href = "/html-pages/login.html";
    });
    document
      .getElementById("edit-profile-button")
      .addEventListener("click", () => {
        window.location.href = "/html-pages/editprofile.html";
      });
  } catch (error) {
    console.error(error);
  }
}

initProfilePage();
