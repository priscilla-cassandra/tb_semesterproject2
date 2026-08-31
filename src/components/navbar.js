import "/styles/main.css";
import { logout } from "../api/auth";

//TO-DO: Replace hardcoded credits, logout (and profile image) with real API once login flow is done!
export function renderNavbar(isLoggedIn) {
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
                <a href="/html-pages/createlisting.html" class="flex items-center gap-2">
                  <span class="text-primary-blue"><i class="fa-solid fa-circle-plus"></i></span>
                  Ny annonse
                </a>
                
                <span class="flex items-center gap-2">
                  <span class="text-primary-blue"><i class="fa-solid fa-coins"></i></span>
                  1000
                </span>

                <a href="/html-pages/profile.html" class="flex items-center gap-2">
                  <span class="text-primary-blue"><i class="fa-regular fa-circle-user"></i></span>
                  Profile
                </a>

                <button class="logoutBtn flex items-center gap-2">
                  <span class="text-primary-blue"><i class="fa-solid fa-arrow-right-from-bracket"></i></span>
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
        <div class="md:hidden fixed bottom-0 inset-x-0 z-50 justify-around items-center bg-background py-5 px-3 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.2)]">
            ${
              isLoggedIn
                ? `
              <a href="/index.html" class="flex flex-col items-center text-xs text-text-color">
                <span class="text-primary-blue"<i class="fa-solid fa-house-chimney"></i></span>
                Forside
              </a>

              <a href="/html-pages/createlisting.html" class="flex flex-col items-center text-xs text-text-color">
                <span class="text-primary-blue"><i class="fa-solid fa-circle-plus"></i></span>
                Ny annonse
              </a>

              <a href="/html-pages/profile.html" class="flex flex-col items-center text-xs text-text-color">
                <span class="text-primary-blue"><i class="fa-regular fa-circle-user"></i></span>
                Min profil
              </a>

              <button class="logoutBtn flex flex-col items-center text-xs text-text-color">
                <span class="text-primary-blue"><i class="fa-solid fa-arrow-right-from-bracket"></i></span>
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

export function initNavbar(isLoggedIn) {
  document.getElementById("navbar").innerHTML = renderNavbar(isLoggedIn);

  document.querySelectorAll(".logoutBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      logout();
      window.location.href = "/index.html";
    });
  });
}
