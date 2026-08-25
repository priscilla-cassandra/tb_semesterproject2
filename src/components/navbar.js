import "/styles/main.css";

//TO-DO: Import logout() function and add to logout nav link
//TO-DO: Replace hardcoded credits, logout (and profile image) with real API once login flow is done!
export function renderNavbar(isLoggedIn) {
  return `
    <nav class="md:shadow-md">

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

                <button id="logoutBtn" class="flex items-center gap-2">
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
        <div>

        </div>
    </nav>
    `;
}
