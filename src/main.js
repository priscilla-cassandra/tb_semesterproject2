import "/styles/main.css";
import { initNavbar } from "./components/navbar";
import { renderFooter } from "./components/footer";
import { isLoggedIn, getName } from "./api/auth";
import { getProfile } from "./api/profile";
import { renderCreditsMobile } from "./components/credits";

async function getCredits(loggedIn) {
  if (!loggedIn) return null;
  const profile = await getProfile(getName());
  return profile.credits;
}

const loggedIn = isLoggedIn();
const credits = await getCredits(loggedIn);

initNavbar(loggedIn, credits);
document.getElementById("footer").innerHTML = renderFooter(loggedIn);

const creditsMobile = document.getElementById("credits-mobile");
