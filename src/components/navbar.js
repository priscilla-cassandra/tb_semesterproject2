import { logout } from "../api/auth";
import { renderCreditsDesktop } from "./credits";

//TO-DO: Replace hardcoded credits, logout (and profile image) with real API once login flow is done!
export function renderNavbar(isLoggedIn, credits) {
  return `
    <nav class="shadow-md">

        <!--DESKTOP NAVBAR -->
        <div class="hidden md:flex items-center justify-between px-10 py-7 2xl:max-w-3/4 mx-auto">
            <a href="/index.html">
              <img src="/assets/logo/logo_large.png">
            </a>
            ${
              isLoggedIn
                ? `
              <div class="flex items-center gap-6">
                <a href="/html-pages/createlisting.html" class="flex items-center gap-2 text-lg">
                  <span class="text-primary-blue"><i class="fa-solid fa-circle-plus fa-lg"></i></span>
                  Ny annonse
                </a>
                
               ${renderCreditsDesktop(credits)}

                <a href="/html-pages/profile.html" class="flex items-center gap-2 text-lg">
                  <span class="text-primary-blue"><i class="fa-regular fa-circle-user fa-lg"></i></span>
                  Profil
                </a>

                <button class="logoutBtn flex items-center gap-2 text-lg">
                  <span class="text-primary-blue"><i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i></span>
                  Logg ut
                </button>
              </div>
              `
                : `
              <div class="flex items-center gap-4">
                <a href="/html-pages/register.html" class="border border-primary-blue text-primary-blue px-4 py-2 rounded-lg hover:bg-gray-100 ">Registrer bruker</a>
                <a href="/html-pages/login.html" class="border bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue-hover">Logg inn</a>

              </div>  
                `
            }
        </div>
        
        <!-- MOBILE NAVBAR -->
        <div class="flex md:hidden fixed bottom-0 inset-x-0 z-50 justify-around items-center bg-background py-5 px-3 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.2)]">
            ${
              isLoggedIn
                ? `
              <a href="/index.html" class="flex flex-col items-center text-md text-text-color">
                <span class="text-primary-blue"><i class="fa-solid fa-house-chimney fa-xl"></i></span>
                Forside
              </a>

              <a href="/html-pages/createlisting.html" class="flex flex-col items-center text-md text-text-color">
                <span class="text-primary-blue"><i class="fa-solid fa-circle-plus fa-xl"></i></span>
                Ny annonse
              </a>

              <a href="/html-pages/profile.html" class="flex flex-col items-center text-md text-text-color">
                <span class="text-primary-blue"><i class="fa-regular fa-circle-user fa-xl"></i></span>
                Min profil
              </a>

              <button class="logoutBtn flex flex-col items-center text-md text-text-color">
                <span class="text-primary-blue"><i class="fa-solid fa-arrow-right-from-bracket fa-xl"></i></span>
                Logg ut
              </button>
              `
                : `
              <div class="flex items-center justify-center gap-4 w-full">
                <a href="/html-pages/login.html" class="border bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue-hover flex-1 text-center">Logg inn</a>
                <span class="text-text-color">eller</span>  
                <a href="/html-pages/register.html" class="border border-primary-blue text-primary-blue px-4 py-2 rounded-lg hover:bg-gray-100 flex-1 text-center">Registrer bruker</a>

              </div>  
              `
            }
        </div>
    </nav>
    `;
}

export function initNavbar(isLoggedIn, credits) {
  document.getElementById("navbar").innerHTML = renderNavbar(
    isLoggedIn,
    credits,
  );

  document.querySelectorAll(".logoutBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      logout();
      window.location.href = "/index.html";
    });
  });
}
