import { isLoggedIn } from "../api/auth";

export function renderFooter(isLoggedIn) {
  return `
    <footer class="bg-primary-blue text-white py-10 flex flex-col items-center mt-auto">
    
        <!---DESKTOP NAVBAR--->
        <div class="hidden md:flex flex-col items-center mt-auto gap-18">
            <div class="flex flex-col items-center mt-auto gap-3">
                <a href="/index.html" class="text-white">
                    <img src="/assets/logo/logo_large_white.png">
                </a>
                <p class="italic text-xl">"Der trønderske ting får ny verdi"</p> 
            </div>
            <div class="flex flex-row justify-center mt-auto gap-10">
                <a href="/index.html">Auksjoner</a>
                <span>&bull;</span>
                <a href="${isLoggedIn ? "/html-pages/profile.html" : "/html-pages/login.html"}">Min profil</a>
                <span>&bull;</span>
                <a href="${isLoggedIn ? "/html-pages/createlisting.html" : "/html-pages/login.html"}">Legg ut en vare</a>
                <span>&bull;</span>
                <a href="/html-pages/contact.html">Kontakt oss</a>
            </div>
            <p>© 2026 TrønderBørs</p>
        </div>

        <!---MOBILE NAVBAR--->
        <div class="md:hidden flex flex-col items-center mt-auto gap-11">
            <div class="flex flex-col items-center mt-auto gap-3">
                <a href="/index.html" class="text-white">
                    <img src="/assets/logo/logo_small_white.png">
                </a>
                <p class="italic">Der trønderske ting får ny verdi</p> 
            </div>
            <div class="flex flex-col items-center gap-3 border border-white px-10 py-5">
                <a href="/index.html">Auksjoner</a>
                <a href="${isLoggedIn ? "/html-pages/profile.html" : "/html-pages/login.html"}">Min profil</a>
                <a href="${isLoggedIn ? "/html-pages/createlisting.html" : "/html-pages/login.html"}">Legg ut en vare</a>
                <a href="/html-pages/contact.html">Kontakt oss</a>
            </div>
            <p>© 2026 TrønderBørs</p>
        </div>
    
    </footer>
    
    `;
}
